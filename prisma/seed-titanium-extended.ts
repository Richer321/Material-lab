import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展钛合金材料...');

  // 获取金属材料类别
  const metalsCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalsCategory) {
    throw new Error('找不到金属材料类别');
  }

  // 创建钛合金子类别
  let titaniumCategory = await prisma.materialCategory.findFirst({
    where: { name: '钛合金' },
  });

  if (!titaniumCategory) {
    titaniumCategory = await prisma.materialCategory.create({
      data: {
        name: '钛合金',
        parentId: metalsCategory.id,
      },
    });
    console.log('✅ 创建钛合金类别');
  }

  // 钛合金数据
  const titaniumAlloys = [
    {
      name: 'TA1 工业纯钛',
      grade: 'TA1',
      description: '工业纯钛，具有良好的耐腐蚀性和可焊性，用于化工、造船等行业',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 370, maxValue: 530, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 250, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 20, maxValue: 30, unit: '%' },
        { category: '机械', name: '硬度', maxValue: 145, unit: 'HBW' },
        { category: '机械', name: '断面收缩率', minValue: 45, unit: '%' },
        { category: '物理', name: '密度', value: 4.51, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 16, unit: 'W/(m·K)' },
        { category: '热', name: '热膨胀系数', value: 8.6, unit: '×10⁻⁶/K' },
        { category: '热', name: '熔点', minValue: 1660, maxValue: 1670, unit: '°C' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 99.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.15, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
        { name: 'N (氮)', maxValue: 0.03, unit: '%' },
        { name: 'H (氢)', maxValue: 0.015, unit: '%' },
      ],
    },
    {
      name: 'TA3 工业纯钛',
      grade: 'TA3',
      description: '工业纯钛，强度高于TA1，仍具有良好的耐腐蚀性和可焊性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 540, maxValue: 740, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 390, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 15, maxValue: 25, unit: '%' },
        { category: '机械', name: '硬度', maxValue: 200, unit: 'HBW' },
        { category: '机械', name: '断面收缩率', minValue: 35, unit: '%' },
        { category: '物理', name: '密度', value: 4.51, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 16, unit: 'W/(m·K)' },
        { category: '热', name: '热膨胀系数', value: 8.6, unit: '×10⁻⁶/K' },
        { category: '热', name: '熔点', minValue: 1660, maxValue: 1670, unit: '°C' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 98.9, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { name: 'O (氧)', minValue: 0.2, maxValue: 0.35, unit: '%' },
        { name: 'N (氮)', maxValue: 0.05, unit: '%' },
        { name: 'H (氢)', maxValue: 0.015, unit: '%' },
      ],
    },
    {
      name: 'TA4 工业纯钛',
      grade: 'TA4',
      description: '工业纯钛，强度最高的纯钛等级，用于要求更高强度的耐腐蚀应用',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 620, maxValue: 820, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 480, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, maxValue: 20, unit: '%' },
        { category: '机械', name: '硬度', maxValue: 235, unit: 'HBW' },
        { category: '机械', name: '断面收缩率', minValue: 25, unit: '%' },
        { category: '物理', name: '密度', value: 4.51, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 16, unit: 'W/(m·K)' },
        { category: '热', name: '热膨胀系数', value: 8.6, unit: '×10⁻⁶/K' },
        { category: '热', name: '熔点', minValue: 1660, maxValue: 1670, unit: '°C' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 98.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.4, unit: '%' },
        { name: 'O (氧)', minValue: 0.3, maxValue: 0.5, unit: '%' },
        { name: 'N (氮)', maxValue: 0.05, unit: '%' },
        { name: 'H (氢)', maxValue: 0.015, unit: '%' },
      ],
    },
    {
      name: 'TC10 (Ti-6Al-6V-2Sn)',
      grade: 'TC10',
      description: 'α+β型钛合金，具有更高的强度和良好的塑性，用于航空结构件',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 1050, maxValue: 1200, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 1000, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, unit: '%' },
        { category: '机械', name: '硬度', minValue: 320, maxValue: 360, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.45, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 7.5, unit: 'W/(m·K)' },
        { category: '热', name: '热膨胀系数', value: 8.9, unit: '×10⁻⁶/K' },
        { category: '热', name: '弹性模量', minValue: 110, maxValue: 120, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 83.7, unit: '%' },
        { name: 'Al (铝)', minValue: 5.5, maxValue: 6.5, unit: '%' },
        { name: 'V (钒)', minValue: 5.5, maxValue: 6.5, unit: '%' },
        { name: 'Sn (锡)', minValue: 1.5, maxValue: 2.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.4, unit: '%' },
        { name: 'O (氧)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: 'TC11 (Ti-6.5Al-3.5Mo-1.5Zr-0.3Si)',
      grade: 'TC11',
      description: 'α+β型热强钛合金，具有优异的热强性和热稳定性，用于航空发动机压气机叶片',
      properties: [
        { category: '机械', name: '抗拉强度 (室温)', minValue: 1030, maxValue: 1180, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (室温)', minValue: 880, unit: 'MPa' },
        { category: '机械', name: '延伸率 (室温)', minValue: 10, unit: '%' },
        { category: '机械', name: '抗拉强度 (500°C)', minValue: 735, maxValue: 885, unit: 'MPa' },
        { category: '机械', name: '持久强度 (500°C/100h)', value: 640, unit: 'MPa' },
        { category: '机械', name: '硬度', minValue: 300, maxValue: 360, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.48, unit: 'g/cm³' },
        { category: '热', name: '工作温度', maxValue: 500, unit: '°C' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 87.5, unit: '%' },
        { name: 'Al (铝)', minValue: 6.0, maxValue: 7.0, unit: '%' },
        { name: 'Mo (钼)', minValue: 3.0, maxValue: 4.0, unit: '%' },
        { name: 'Zr (锆)', minValue: 1.0, maxValue: 2.0, unit: '%' },
        { name: 'Si (硅)', minValue: 0.2, maxValue: 0.4, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: 'TB2 (Ti-3Al-8Mo-11V)',
      grade: 'TB2',
      description: '亚稳定β型钛合金，可通过热处理获得高强度，用于航空紧固件和弹簧',
      properties: [
        { category: '机械', name: '抗拉强度 (固溶)', minValue: 880, maxValue: 980, unit: 'MPa' },
        { category: '机械', name: '抗拉强度 (时效)', minValue: 1280, maxValue: 1380, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', minValue: 1180, unit: 'MPa' },
        { category: '机械', name: '延伸率 (时效)', minValue: 7, unit: '%' },
        { category: '机械', name: '硬度 (时效)', minValue: 390, maxValue: 420, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.78, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 100, maxValue: 110, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 77.2, unit: '%' },
        { name: 'Al (铝)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Mo (钼)', minValue: 7.5, maxValue: 8.5, unit: '%' },
        { name: 'V (钒)', minValue: 10.5, maxValue: 11.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: 'TB6 (Ti-10V-2Fe-3Al)',
      grade: 'TB6',
      description: '近β型高强高韧钛合金，具有优异的断裂韧性和疲劳性能，用于大型航空锻件',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 1100, maxValue: 1200, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 1030, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, unit: '%' },
        { category: '机械', name: '断面收缩率', minValue: 25, unit: '%' },
        { category: '机械', name: '断裂韧度 KIC', minValue: 55, maxValue: 70, unit: 'MPa·m¹/²' },
        { category: '机械', name: '硬度', minValue: 340, maxValue: 380, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.65, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 100, maxValue: 110, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 84.5, unit: '%' },
        { name: 'V (钒)', minValue: 9.5, maxValue: 10.5, unit: '%' },
        { name: 'Fe (铁)', minValue: 1.5, maxValue: 2.5, unit: '%' },
        { name: 'Al (铝)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
        { name: 'N (氮)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'Ti-6Al-7Nb 生物医用钛合金',
      grade: 'Ti-6Al-7Nb',
      description: '生物医用α+β型钛合金，用Nb替代V，具有更好的生物相容性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 900, maxValue: 1050, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 800, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, maxValue: 15, unit: '%' },
        { category: '机械', name: '弹性模量', minValue: 105, maxValue: 115, unit: 'GPa' },
        { category: '机械', name: '疲劳强度 (10⁷周次)', minValue: 400, unit: 'MPa' },
        { category: '物理', name: '密度', value: 4.52, unit: 'g/cm³' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 86.5, unit: '%' },
        { name: 'Al (铝)', minValue: 5.5, maxValue: 6.5, unit: '%' },
        { name: 'Nb (铌)', minValue: 6.5, maxValue: 7.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.25, unit: '%' },
        { name: 'O (氧)', maxValue: 0.2, unit: '%' },
        { name: 'N (氮)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'Ti-13Nb-13Zr 生物医用钛合金',
      grade: 'Ti-13Nb-13Zr',
      description: '生物医用β型钛合金，具有更低的弹性模量，更好的生物相容性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 830, maxValue: 970, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 720, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, maxValue: 16, unit: '%' },
        { category: '机械', name: '弹性模量', minValue: 75, maxValue: 85, unit: 'GPa' },
        { category: '机械', name: '疲劳强度 (10⁷周次)', minValue: 350, unit: 'MPa' },
        { category: '物理', name: '密度', value: 4.85, unit: 'g/cm³' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 73.5, unit: '%' },
        { name: 'Nb (铌)', minValue: 12.5, maxValue: 14.5, unit: '%' },
        { name: 'Zr (锆)', minValue: 12.5, maxValue: 14.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.1, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
        { name: 'N (氮)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'Ti-15V-3Cr-3Sn-3Al (Ti-153)',
      grade: 'Ti-153',
      description: '亚稳定β型钛合金，具有优异的冷成形性能和较高强度，用于航空钣金件',
      properties: [
        { category: '机械', name: '抗拉强度 (固溶)', minValue: 780, maxValue: 830, unit: 'MPa' },
        { category: '机械', name: '抗拉强度 (时效)', minValue: 1180, maxValue: 1280, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', minValue: 1100, unit: 'MPa' },
        { category: '机械', name: '延伸率 (时效)', minValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (时效)', minValue: 370, maxValue: 410, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.76, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 100, maxValue: 110, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 75.5, unit: '%' },
        { name: 'V (钒)', minValue: 14.5, maxValue: 15.5, unit: '%' },
        { name: 'Cr (铬)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Sn (锡)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Al (铝)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.25, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: 'Ti-5Al-5V-5Mo-3Cr (Ti-5553)',
      grade: 'Ti-5553',
      description: '近β型高强高韧钛合金，专为大型航空锻件开发，具有优异的淬透性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 1180, maxValue: 1280, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 1100, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 8, unit: '%' },
        { category: '机械', name: '断面收缩率', minValue: 15, unit: '%' },
        { category: '机械', name: '断裂韧度 KIC', minValue: 50, maxValue: 70, unit: 'MPa·m¹/²' },
        { category: '机械', name: '硬度', minValue: 380, maxValue: 420, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.68, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 110, maxValue: 120, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 81.5, unit: '%' },
        { name: 'Al (铝)', minValue: 4.5, maxValue: 5.5, unit: '%' },
        { name: 'V (钒)', minValue: 4.5, maxValue: 5.5, unit: '%' },
        { name: 'Mo (钼)', minValue: 4.5, maxValue: 5.5, unit: '%' },
        { name: 'Cr (铬)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.25, unit: '%' },
        { name: 'O (氧)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: 'Ti-3Al-2.5V 工业钛合金',
      grade: 'Ti-3Al-2.5V',
      description: '低合金α型钛合金，具有优异的焊接性能和耐腐蚀性，用于管道和换热器',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 620, maxValue: 740, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 480, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 15, unit: '%' },
        { category: '机械', name: '硬度', maxValue: 250, unit: 'HBW' },
        { category: '物理', name: '密度', value: 4.48, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 8.8, unit: 'W/(m·K)' },
        { category: '热', name: '热膨胀系数', value: 9.1, unit: '×10⁻⁶/K' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 94.2, unit: '%' },
        { name: 'Al (铝)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'V (钒)', minValue: 2.0, maxValue: 3.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: 'Ti-8Al-1Mo-1V 高温钛合金',
      grade: 'Ti-811',
      description: '近α型高温钛合金，具有良好的蠕变抗力和热稳定性，用于航空发动机',
      properties: [
        { category: '机械', name: '抗拉强度 (室温)', minValue: 950, maxValue: 1050, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (室温)', minValue: 880, unit: 'MPa' },
        { category: '机械', name: '延伸率 (室温)', minValue: 12, unit: '%' },
        { category: '机械', name: '抗拉强度 (450°C)', minValue: 750, maxValue: 850, unit: 'MPa' },
        { category: '机械', name: '持久强度 (450°C/100h)', value: 650, unit: 'MPa' },
        { category: '物理', name: '密度', value: 4.37, unit: 'g/cm³' },
        { category: '热', name: '工作温度', maxValue: 450, unit: '°C' },
      ],
      compositions: [
        { name: 'Ti (钛)', minValue: 89.5, unit: '%' },
        { name: 'Al (铝)', minValue: 7.5, maxValue: 8.5, unit: '%' },
        { name: 'Mo (钼)', minValue: 0.8, maxValue: 1.2, unit: '%' },
        { name: 'V (钒)', minValue: 0.8, maxValue: 1.2, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { name: 'O (氧)', maxValue: 0.15, unit: '%' },
      ],
    },
  ];

  let addedCount = 0;

  for (const alloy of titaniumAlloys) {
    // 检查是否已存在
    const existing = await prisma.material.findFirst({
      where: {
        name: alloy.name,
        categoryId: titaniumCategory!.id,
      },
    });

    if (existing) {
      console.log(`⏭️  跳过已存在: ${alloy.name}`);
      continue;
    }

    // 创建材料
    const material = await prisma.material.create({
      data: {
        name: alloy.name,
        designation: alloy.grade,
        categoryId: titaniumCategory!.id,
        description: alloy.description,
      },
    });

    // 获取或创建属性类别
    const categoryNames = [...new Set(alloy.properties.map(p => p.category))];
    const categoryMap = new Map<string, string>();

    for (const catName of categoryNames) {
      let propCategory = await prisma.propertyCategory.findFirst({
        where: { name: catName },
      });

      if (!propCategory) {
        propCategory = await prisma.propertyCategory.create({
          data: { name: catName },
        });
      }
      categoryMap.set(catName, propCategory.id);
    }

    // 创建性能数据
    for (const prop of alloy.properties) {
      const categoryId = categoryMap.get(prop.category)!;
      await prisma.materialProperty.create({
        data: {
          materialId: material.id,
          categoryId: categoryId,
          propertyName: prop.name,
          minValue: prop.minValue ?? null,
          maxValue: prop.maxValue ?? null,
          value: prop.value ?? null,
          unit: prop.unit,
        },
      });
    }

    // 创建成分数据
    for (const comp of alloy.compositions) {
      await prisma.materialComposition.create({
        data: {
          materialId: material.id,
          element: comp.name,
          minValue: comp.minValue ?? null,
          maxValue: comp.maxValue ?? null,
          unit: comp.unit,
        },
      });
    }

    // 创建数据来源
    let source = await prisma.dataSource.findFirst({
      where: { title: 'MatWeb Database' },
    });

    if (!source) {
      source = await prisma.dataSource.create({
        data: {
          title: 'MatWeb Database',
          type: 'WEBSITE',
          url: 'https://www.matweb.com',
        },
      });
    }

    await prisma.materialDataSource.create({
      data: {
        materialId: material.id,
        sourceId: source.id,
      },
    });

    addedCount++;
    console.log(`✅ 添加: ${alloy.name}`);
  }

  const totalTitanium = await prisma.material.count({
    where: { categoryId: titaniumCategory!.id },
  });

  console.log('\n✅ 钛合金材料扩展完成！');
  console.log(`钛合金总数: ${totalTitanium} 种`);
  console.log(`新增材料: ${addedCount} 种`);
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
