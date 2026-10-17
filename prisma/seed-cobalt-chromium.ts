import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加钴铬合金材料数据...');

  // 获取金属材料类别
  const metalCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalCategory) {
    console.error('找不到金属材料类别，请先运行基础 seed');
    return;
  }

  // 创建钴铬合金子类别
  const cobaltChromiumCategory = await prisma.materialCategory.findFirst({
    where: { name: '钴铬合金', parentId: metalCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '钴铬合金',
      parentId: metalCategory.id,
    },
  });

  // 创建子类别
  const superalloyCategory = await prisma.materialCategory.findFirst({
    where: { name: '钴基高温合金', parentId: cobaltChromiumCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '钴基高温合金',
      parentId: cobaltChromiumCategory.id,
    },
  });

  const medicalCategory = await prisma.materialCategory.findFirst({
    where: { name: '医用钴铬合金', parentId: cobaltChromiumCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '医用钴铬合金',
      parentId: cobaltChromiumCategory.id,
    },
  });

  // 获取或创建性能类别
  const mechanicalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '机械性能' },
  }) || await prisma.propertyCategory.create({
    data: { name: '机械性能' },
  });

  const thermalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '热性能' },
  }) || await prisma.propertyCategory.create({
    data: { name: '热性能' },
  });

  const electricalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '电性能' },
  }) || await prisma.propertyCategory.create({
    data: { name: '电性能' },
  });

  const physicalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '物理性能' },
  }) || await prisma.propertyCategory.create({
    data: { name: '物理性能' },
  });

  // 创建数据来源
  const matwebSource = await prisma.dataSource.findFirst({
    where: { url: 'https://www.matweb.com' },
  }) || await prisma.dataSource.create({
    data: {
      type: 'WEBSITE',
      title: 'MatWeb - Material Property Data',
      url: 'https://www.matweb.com',
      authors: 'MatWeb Database',
    },
  });

  const isoSource = await prisma.dataSource.findFirst({
    where: { title: 'ISO 10993 - Biological Evaluation of Medical Devices' },
  }) || await prisma.dataSource.create({
    data: {
      type: 'LITERATURE',
      title: 'ISO 10993 - Biological Evaluation of Medical Devices',
      authors: 'International Organization for Standardization',
      year: 2021,
      publisher: 'ISO',
    },
  });

  // ===== 钴铬高温合金 =====

  // 1. L605
  const l605 = await prisma.material.create({
    data: {
      name: 'L605 钴铬高温合金',
      designation: 'L605 (AMS 5789, UNS R30155)',
      categoryId: superalloyCategory.id,
      description: '钴基高温合金，优异的高温强度、抗氧化性和耐腐蚀性，用于航空发动机、燃气轮机、PFA导管支撑结构、医疗植入物。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: l605.id, element: 'Co', value: 55, unit: 'wt%' },
      { materialId: l605.id, element: 'Cr', value: 20, unit: 'wt%' },
      { materialId: l605.id, element: 'W', value: 15, unit: 'wt%' },
      { materialId: l605.id, element: 'Ni', value: 10, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 室温
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（室温）', minValue: 900, maxValue: 1100, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（室温）', minValue: 500, maxValue: 700, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（室温）', minValue: 25, maxValue: 35, unit: '%' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '硬度（室温）', minValue: 280, maxValue: 320, unit: 'HBW' },
      // 机械性能 - 高温（540°C）
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（540°C）', minValue: 650, maxValue: 800, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（540°C）', minValue: 350, maxValue: 500, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（540°C）', minValue: 20, maxValue: 30, unit: '%' },
      // 高温性能
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '持久强度（540°C/100h）', minValue: 300, maxValue: 400, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '持久强度（650°C/100h）', minValue: 200, maxValue: 300, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '蠕变强度（650°C/0.1%/1000h）', minValue: 150, maxValue: 200, unit: 'MPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 225, unit: 'GPa' },
      { materialId: l605.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 85, unit: 'GPa' },
      // 热性能
      { materialId: l605.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1395, maxValue: 1425, unit: '°C' },
      { materialId: l605.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 10.2, unit: 'W/(m·K)' },
      { materialId: l605.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 12.3, unit: '×10⁻⁶/K' },
      { materialId: l605.id, categoryId: thermalCategory.id, propertyName: '抗氧化性', value: 1100, unit: '°C' },
      // 电性能
      { materialId: l605.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 118, unit: 'μΩ·cm' },
      // 物理性能
      { materialId: l605.id, categoryId: physicalCategory.id, propertyName: '密度', value: 9.13, unit: 'g/cm³' },
    ],
  });

  // 2. MP35N
  const mp35n = await prisma.material.create({
    data: {
      name: 'MP35N 钴镍铬钼合金',
      designation: 'MP35N (UNS R30035)',
      categoryId: superalloyCategory.id,
      description: '钴镍铬钼合金，超高强度、优异耐腐蚀性和生物相容性，用于医疗植入物、心血管支架、PFA导管编织网、骨科植入物、紧固件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: mp35n.id, element: 'Co', value: 35, unit: 'wt%' },
      { materialId: mp35n.id, element: 'Ni', value: 35, unit: 'wt%' },
      { materialId: mp35n.id, element: 'Cr', value: 20, unit: 'wt%' },
      { materialId: mp35n.id, element: 'Mo', value: 10, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 退火态
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（退火）', minValue: 900, maxValue: 1100, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（退火）', minValue: 400, maxValue: 600, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（退火）', minValue: 40, maxValue: 50, unit: '%' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '硬度（退火）', minValue: 250, maxValue: 300, unit: 'HBW' },
      // 机械性能 - 冷加工+时效态
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（冷加工+时效）', minValue: 1800, maxValue: 2200, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（冷加工+时效）', minValue: 1600, maxValue: 2000, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（冷加工+时效）', minValue: 8, maxValue: 12, unit: '%' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '硬度（冷加工+时效）', minValue: 45, maxValue: 50, unit: 'HRC' },
      // 机械性能 - 时效硬化态
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（时效）', minValue: 1500, maxValue: 1900, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（时效）', minValue: 1300, maxValue: 1700, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（时效）', minValue: 12, maxValue: 18, unit: '%' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '疲劳强度（时效）', minValue: 600, maxValue: 800, unit: 'MPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 230, unit: 'GPa' },
      { materialId: mp35n.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 88, unit: 'GPa' },
      // 热性能
      { materialId: mp35n.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1330, maxValue: 1360, unit: '°C' },
      { materialId: mp35n.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 12.5, unit: 'W/(m·K)' },
      { materialId: mp35n.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 12.5, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: mp35n.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 105, unit: 'μΩ·cm' },
      // 物理性能
      { materialId: mp35n.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.44, unit: 'g/cm³' },
    ],
  });

  // ===== 医用钴铬合金 =====

  // 3. F75
  const f75 = await prisma.material.create({
    data: {
      name: 'F75 铸造钴铬钼合金',
      designation: 'F75 (ASTM F75, ISO 5832-4)',
      categoryId: medicalCategory.id,
      description: '医用级铸造钴铬钼合金，优异的生物相容性和耐磨性，用于人工关节、骨科植入物、牙科修复、医疗植入物。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: f75.id, element: 'Co', value: 66, unit: 'wt%' },
      { materialId: f75.id, element: 'Cr', value: 28, unit: 'wt%' },
      { materialId: f75.id, element: 'Mo', value: 6, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 铸造态
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（铸造）', minValue: 650, maxValue: 850, unit: 'MPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（铸造）', minValue: 450, maxValue: 600, unit: 'MPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（铸造）', minValue: 10, maxValue: 15, unit: '%' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '硬度（铸造）', minValue: 280, maxValue: 320, unit: 'HBW' },
      // 机械性能 - 时效态
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（时效）', minValue: 750, maxValue: 950, unit: 'MPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（时效）', minValue: 550, maxValue: 700, unit: 'MPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（时效）', minValue: 8, maxValue: 12, unit: '%' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '硬度（时效）', minValue: 300, maxValue: 350, unit: 'HBW' },
      // 其他机械性能
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', minValue: 1000, maxValue: 1300, unit: 'MPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '疲劳强度（10⁷次）', minValue: 250, maxValue: 350, unit: 'MPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 220, unit: 'GPa' },
      { materialId: f75.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 84, unit: 'GPa' },
      // 热性能
      { materialId: f75.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1380, maxValue: 1410, unit: '°C' },
      { materialId: f75.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 15.0, unit: 'W/(m·K)' },
      { materialId: f75.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 13.5, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: f75.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 95, unit: 'μΩ·cm' },
      // 物理性能
      { materialId: f75.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.30, unit: 'g/cm³' },
    ],
  });

  // 4. F799
  const f799 = await prisma.material.create({
    data: {
      name: 'F799 锻造钴铬钼合金',
      designation: 'F799 (ASTM F799, ISO 5832-12)',
      categoryId: medicalCategory.id,
      description: '医用级锻造钴铬钼合金，更高的强度和疲劳性能，用于人工关节、骨科植入物、膝关节、髋关节、脊柱植入物。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: f799.id, element: 'Co', value: 66, unit: 'wt%' },
      { materialId: f799.id, element: 'Cr', value: 28, unit: 'wt%' },
      { materialId: f799.id, element: 'Mo', value: 6, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 锻造态
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（锻造）', minValue: 1000, maxValue: 1300, unit: 'MPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（锻造）', minValue: 800, maxValue: 1100, unit: 'MPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（锻造）', minValue: 15, maxValue: 25, unit: '%' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '硬度（锻造）', minValue: 35, maxValue: 45, unit: 'HRC' },
      // 机械性能 - 时效态
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（时效）', minValue: 1200, maxValue: 1500, unit: 'MPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（时效）', minValue: 1000, maxValue: 1300, unit: 'MPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（时效）', minValue: 12, maxValue: 20, unit: '%' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '硬度（时效）', minValue: 40, maxValue: 50, unit: 'HRC' },
      // 其他机械性能
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', minValue: 1500, maxValue: 2000, unit: 'MPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '疲劳强度（10⁷次）', minValue: 400, maxValue: 600, unit: 'MPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '断裂韧性', minValue: 80, maxValue: 120, unit: 'MPa·m½' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 230, unit: 'GPa' },
      { materialId: f799.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 88, unit: 'GPa' },
      // 热性能
      { materialId: f799.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1380, maxValue: 1410, unit: '°C' },
      { materialId: f799.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 15.5, unit: 'W/(m·K)' },
      { materialId: f799.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 13.2, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: f799.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 92, unit: 'μΩ·cm' },
      // 物理性能
      { materialId: f799.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.35, unit: 'g/cm³' },
    ],
  });

  // 5. F1537
  const f1537 = await prisma.material.create({
    data: {
      name: 'F1537 锻造钴铬镍钼铁合金',
      designation: 'F1537 (ASTM F1537, ISO 5832-9)',
      categoryId: medicalCategory.id,
      description: '医用级锻造钴铬镍钼铁合金，良好的强度和加工性能，用于骨科植入物、创伤固定、脊柱内固定、医疗植入物。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: f1537.id, element: 'Co', value: 63, unit: 'wt%' },
      { materialId: f1537.id, element: 'Cr', value: 27, unit: 'wt%' },
      { materialId: f1537.id, element: 'Mo', value: 6, unit: 'wt%' },
      { materialId: f1537.id, element: 'Ni', value: 3, unit: 'wt%' },
      { materialId: f1537.id, element: 'Fe', value: 1, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 锻造态
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（锻造）', minValue: 900, maxValue: 1200, unit: 'MPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（锻造）', minValue: 700, maxValue: 1000, unit: 'MPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（锻造）', minValue: 15, maxValue: 25, unit: '%' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '硬度（锻造）', minValue: 30, maxValue: 40, unit: 'HRC' },
      // 机械性能 - 时效态
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（时效）', minValue: 1100, maxValue: 1400, unit: 'MPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（时效）', minValue: 900, maxValue: 1200, unit: 'MPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（时效）', minValue: 12, maxValue: 20, unit: '%' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '硬度（时效）', minValue: 35, maxValue: 45, unit: 'HRC' },
      // 其他机械性能
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', minValue: 1200, maxValue: 1600, unit: 'MPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '疲劳强度（10⁷次）', minValue: 350, maxValue: 500, unit: 'MPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '断裂韧性', minValue: 90, maxValue: 130, unit: 'MPa·m½' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 225, unit: 'GPa' },
      { materialId: f1537.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 86, unit: 'GPa' },
      // 热性能
      { materialId: f1537.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1370, maxValue: 1400, unit: '°C' },
      { materialId: f1537.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 15.2, unit: 'W/(m·K)' },
      { materialId: f1537.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 13.0, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: f1537.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 98, unit: 'μΩ·cm' },
      // 物理性能
      { materialId: f1537.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.25, unit: 'g/cm³' },
    ],
  });

  console.log('钴铬合金材料数据添加完成！');
  console.log('已添加 5 种钴铬合金材料：');
  console.log('  - L605 (钴基高温合金)');
  console.log('  - MP35N (钴镍铬钼合金)');
  console.log('  - F75 (铸造钴铬钼合金)');
  console.log('  - F799 (锻造钴铬钼合金)');
  console.log('  - F1537 (锻造钴铬镍钼铁合金)');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
