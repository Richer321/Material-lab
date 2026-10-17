import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  console.log('=== 数据库统计 ===\n');

  // 统计各类别
  const categories = await prisma.materialCategory.findMany({
    include: {
      _count: {
        select: { materials: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  console.log('材料类别:');
  categories.forEach(cat => {
    const parent = cat.parentId ? ' (子类别)' : '';
    console.log(`  - ${cat.name}${parent}: ${cat._count.materials} 种材料`);
  });

  // 统计总材料数
  const totalMaterials = await prisma.material.count();
  console.log(`\n总材料数: ${totalMaterials}`);

  // 统计性能数据
  const totalProperties = await prisma.materialProperty.count();
  const totalCompositions = await prisma.materialComposition.count();
  console.log(`性能数据: ${totalProperties} 条`);
  console.log(`成分数据: ${totalCompositions} 条`);

  // 按类别列出材料
  console.log('\n=== 金属材料列表 ===');
  const metalCategory = categories.find(c => c.name === '金属材料');
  if (metalCategory) {
    const subCategories = await prisma.materialCategory.findMany({
      where: { parentId: metalCategory.id },
      include: {
        materials: {
          select: {
            name: true,
            designation: true,
          },
          orderBy: { name: 'asc' },
        },
      },
    });

    subCategories.forEach(subCat => {
      console.log(`\n【${subCat.name}】(${subCat.materials.length}种)`);
      subCat.materials.forEach(mat => {
        console.log(`  - ${mat.name} ${mat.designation ? `(${mat.designation})` : ''}`);
      });
    });
  }

  await prisma.$disconnect();
}

checkData();
