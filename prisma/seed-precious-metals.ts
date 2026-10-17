import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加贵金属材料数据...');

  // 获取金属材料类别
  const metalCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalCategory) {
    console.error('找不到金属材料类别，请先运行基础 seed');
    return;
  }

  // 创建贵金属子类别
  const preciousCategory = await prisma.materialCategory.findFirst({
    where: { name: '贵金属', parentId: metalCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '贵金属',
      parentId: metalCategory.id,
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

  // ===== 纯贵金属 =====

  // 1. 铂
  const platinum = await prisma.material.create({
    data: {
      name: '铂',
      designation: 'Pt-99.95',
      categoryId: preciousCategory.id,
      description: '纯度99.95%的铂，优异的生物相容性、耐腐蚀性和导电性，用于医疗电极、心脏起搏器电极、电脉冲消融电极、神经刺激电极。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: platinum.id, element: 'Pt', value: 99.95, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 退火态
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（退火）', minValue: 125, maxValue: 150, unit: 'MPa' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（退火）', minValue: 30, maxValue: 50, unit: 'MPa' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（退火）', minValue: 30, maxValue: 40, unit: '%' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '硬度（退火）', minValue: 35, maxValue: 45, unit: 'HV' },
      // 机械性能 - 冷加工态
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（冷加工）', minValue: 250, maxValue: 350, unit: 'MPa' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（冷加工）', minValue: 200, maxValue: 280, unit: 'MPa' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（冷加工）', minValue: 2, maxValue: 5, unit: '%' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '硬度（冷加工）', minValue: 90, maxValue: 120, unit: 'HV' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 170, unit: 'GPa' },
      { materialId: platinum.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 60, unit: 'GPa' },
      // 热性能
      { materialId: platinum.id, categoryId: thermalCategory.id, propertyName: '熔点', value: 1768, unit: '°C' },
      { materialId: platinum.id, categoryId: thermalCategory.id, propertyName: '沸点', value: 3825, unit: '°C' },
      { materialId: platinum.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 71.6, unit: 'W/(m·K)' },
      { materialId: platinum.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 9, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: platinum.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 10.6, unit: 'μΩ·cm' },
      { materialId: platinum.id, categoryId: electricalCategory.id, propertyName: '电阻温度系数', value: 0.00392, unit: '/°C' },
      // 物理性能
      { materialId: platinum.id, categoryId: physicalCategory.id, propertyName: '密度', value: 21.45, unit: 'g/cm³' },
    ],
  });

  await prisma.materialDataSource.create({
    data: {
      materialId: platinum.id,
      sourceId: matwebSource.id,
      notes: '医疗电极材料，生物相容性符合ISO 10993标准',
    },
  });

  // 2. 铱
  const iridium = await prisma.material.create({
    data: {
      name: '铱',
      designation: 'Ir-99.9',
      categoryId: preciousCategory.id,
      description: '纯度99.9%的铱，极高的硬度、优异的耐腐蚀性和生物相容性，用于医疗电极、电脉冲消融电极、放射治疗源、高温电极。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: iridium.id, element: 'Ir', value: 99.9, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 退火态
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（退火）', minValue: 240, maxValue: 620, unit: 'MPa' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（退火）', minValue: 80, maxValue: 210, unit: 'MPa' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（退火）', minValue: 15, maxValue: 25, unit: '%' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '硬度（退火）', minValue: 150, maxValue: 200, unit: 'HV' },
      // 机械性能 - 冷加工态
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（冷加工）', minValue: 1100, maxValue: 1800, unit: 'MPa' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（冷加工）', minValue: 1050, maxValue: 1700, unit: 'MPa' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（冷加工）', minValue: 5, maxValue: 10, unit: '%' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '硬度（冷加工）', minValue: 350, maxValue: 450, unit: 'HV' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 528, unit: 'GPa' },
      { materialId: iridium.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 210, unit: 'GPa' },
      // 热性能
      { materialId: iridium.id, categoryId: thermalCategory.id, propertyName: '熔点', value: 2446, unit: '°C' },
      { materialId: iridium.id, categoryId: thermalCategory.id, propertyName: '沸点', value: 4150, unit: '°C' },
      { materialId: iridium.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 150, unit: 'W/(m·K)' },
      { materialId: iridium.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 6.4, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: iridium.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 5.3, unit: 'μΩ·cm' },
      { materialId: iridium.id, categoryId: electricalCategory.id, propertyName: '电阻温度系数', value: 0.0042, unit: '/°C' },
      // 物理性能
      { materialId: iridium.id, categoryId: physicalCategory.id, propertyName: '密度', value: 22.56, unit: 'g/cm³' },
    ],
  });

  await prisma.materialDataSource.create({
    data: {
      materialId: iridium.id,
      sourceId: matwebSource.id,
      notes: '高强度医疗电极材料，生物相容性符合ISO 10993标准',
    },
  });

  // ===== 铂-铱合金 =====

  // 3. 铂-铱合金 (Pt-Ir 90/10)
  const ptIr9010 = await prisma.material.create({
    data: {
      name: '铂-铱合金 (Pt-Ir 90/10)',
      designation: 'PtIr-90/10',
      categoryId: preciousCategory.id,
      description: '含90%铂和10%铱的合金，平衡了铂的柔软性和铱的硬度，优异的生物相容性和耐腐蚀性，广泛用于医疗电极、电脉冲消融电极、心脏起搏器电极、神经刺激器、脑深部刺激电极。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ptIr9010.id, element: 'Pt', value: 90, unit: 'wt%' },
      { materialId: ptIr9010.id, element: 'Ir', value: 10, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 退火态
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（退火）', minValue: 280, maxValue: 350, unit: 'MPa' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（退火）', minValue: 110, maxValue: 170, unit: 'MPa' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（退火）', minValue: 20, maxValue: 30, unit: '%' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '硬度（退火）', minValue: 90, maxValue: 120, unit: 'HV' },
      // 机械性能 - 时效硬化态
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（时效）', minValue: 650, maxValue: 850, unit: 'MPa' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（时效）', minValue: 550, maxValue: 700, unit: 'MPa' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（时效）', minValue: 10, maxValue: 15, unit: '%' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '硬度（时效）', minValue: 200, maxValue: 250, unit: 'HV' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '疲劳强度', minValue: 200, maxValue: 250, unit: 'MPa' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 210, unit: 'GPa' },
      { materialId: ptIr9010.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 75, unit: 'GPa' },
      // 热性能
      { materialId: ptIr9010.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1780, maxValue: 1820, unit: '°C' },
      { materialId: ptIr9010.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 42, unit: 'W/(m·K)' },
      { materialId: ptIr9010.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 8.7, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: ptIr9010.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 24.5, unit: 'μΩ·cm' },
      { materialId: ptIr9010.id, categoryId: electricalCategory.id, propertyName: '电阻温度系数', value: 0.0013, unit: '/°C' },
      // 物理性能
      { materialId: ptIr9010.id, categoryId: physicalCategory.id, propertyName: '密度', value: 21.6, unit: 'g/cm³' },
    ],
  });

  await prisma.materialDataSource.create({
    data: {
      materialId: ptIr9010.id,
      sourceId: matwebSource.id,
      notes: 'PFA电极材料，生物相容性符合ISO 10993标准',
    },
  });

  // 4. 铂-铱合金 (Pt-Ir 95/5)
  const ptIr9505 = await prisma.material.create({
    data: {
      name: '铂-铱合金 (Pt-Ir 95/5)',
      designation: 'PtIr-95/5',
      categoryId: preciousCategory.id,
      description: '含95%铂和5%铱的合金，比PtIr-90/10更柔软，加工性能更好，保持优异的生物相容性和耐腐蚀性，用于柔性医疗电极、导线电极、可植入电极。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ptIr9505.id, element: 'Pt', value: 95, unit: 'wt%' },
      { materialId: ptIr9505.id, element: 'Ir', value: 5, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 退火态
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（退火）', minValue: 220, maxValue: 280, unit: 'MPa' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（退火）', minValue: 90, maxValue: 140, unit: 'MPa' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（退火）', minValue: 25, maxValue: 35, unit: '%' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '硬度（退火）', minValue: 70, maxValue: 100, unit: 'HV' },
      // 机械性能 - 冷加工态
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（冷加工）', minValue: 550, maxValue: 700, unit: 'MPa' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（冷加工）', minValue: 450, maxValue: 600, unit: 'MPa' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（冷加工）', minValue: 8, maxValue: 12, unit: '%' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '硬度（冷加工）', minValue: 160, maxValue: 200, unit: 'HV' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '疲劳强度', minValue: 180, maxValue: 220, unit: 'MPa' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 190, unit: 'GPa' },
      { materialId: ptIr9505.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 68, unit: 'GPa' },
      // 热性能
      { materialId: ptIr9505.id, categoryId: thermalCategory.id, propertyName: '熔点', minValue: 1775, maxValue: 1800, unit: '°C' },
      { materialId: ptIr9505.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 55, unit: 'W/(m·K)' },
      { materialId: ptIr9505.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 8.9, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: ptIr9505.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 18.5, unit: 'μΩ·cm' },
      { materialId: ptIr9505.id, categoryId: electricalCategory.id, propertyName: '电阻温度系数', value: 0.0022, unit: '/°C' },
      // 物理性能
      { materialId: ptIr9505.id, categoryId: physicalCategory.id, propertyName: '密度', value: 21.5, unit: 'g/cm³' },
    ],
  });

  await prisma.materialDataSource.create({
    data: {
      materialId: ptIr9505.id,
      sourceId: matwebSource.id,
      notes: '柔性电极材料，生物相容性符合ISO 10993标准',
    },
  });

  // ===== 金基合金 =====

  // 5. 金
  const gold = await prisma.material.create({
    data: {
      name: '金',
      designation: 'Au-99.99',
      categoryId: preciousCategory.id,
      description: '纯度99.99%的金，优异的导电性、生物相容性和耐腐蚀性，用于医疗电极、电刺激电极、牙科修复、医疗植入物表面涂层。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: gold.id, element: 'Au', value: 99.99, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      // 机械性能 - 退火态
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（退火）', minValue: 120, maxValue: 150, unit: 'MPa' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（退火）', minValue: 30, maxValue: 50, unit: 'MPa' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（退火）', minValue: 30, maxValue: 45, unit: '%' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '硬度（退火）', minValue: 25, maxValue: 30, unit: 'HV' },
      // 机械性能 - 冷加工态
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度（冷加工）', minValue: 220, maxValue: 280, unit: 'MPa' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度（冷加工）', minValue: 180, maxValue: 230, unit: 'MPa' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '延伸率（冷加工）', minValue: 3, maxValue: 8, unit: '%' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '硬度（冷加工）', minValue: 60, maxValue: 80, unit: 'HV' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 78, unit: 'GPa' },
      { materialId: gold.id, categoryId: mechanicalCategory.id, propertyName: '剪切模量', value: 27, unit: 'GPa' },
      // 热性能
      { materialId: gold.id, categoryId: thermalCategory.id, propertyName: '熔点', value: 1064, unit: '°C' },
      { materialId: gold.id, categoryId: thermalCategory.id, propertyName: '沸点', value: 2856, unit: '°C' },
      { materialId: gold.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 317, unit: 'W/(m·K)' },
      { materialId: gold.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 14.2, unit: '×10⁻⁶/K' },
      // 电性能
      { materialId: gold.id, categoryId: electricalCategory.id, propertyName: '电阻率', value: 2.2, unit: 'μΩ·cm' },
      { materialId: gold.id, categoryId: electricalCategory.id, propertyName: '电阻温度系数', value: 0.0034, unit: '/°C' },
      // 物理性能
      { materialId: gold.id, categoryId: physicalCategory.id, propertyName: '密度', value: 19.32, unit: 'g/cm³' },
    ],
  });

  await prisma.materialDataSource.create({
    data: {
      materialId: gold.id,
      sourceId: matwebSource.id,
      notes: '高导电电极材料，生物相容性符合ISO 10993标准',
    },
  });

  console.log('贵金属材料数据添加完成！');
  console.log('已添加 5 种贵金属材料：');
  console.log('  - 铂 (Pt-99.95)');
  console.log('  - 铱 (Ir-99.9)');
  console.log('  - 铂-铱合金 (PtIr-90/10)');
  console.log('  - 铂-铱合金 (PtIr-95/5)');
  console.log('  - 金 (Au-99.99)');
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
