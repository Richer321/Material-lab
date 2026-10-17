import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展金属材料类别...');

  // 获取现有金属材料类别
  const metalCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalCategory) {
    console.error('找不到金属材料类别，请先运行基础 seed');
    return;
  }

  // 创建子类别
  const carbonSteelCategory = await prisma.materialCategory.create({
    data: {
      name: '碳钢',
      parentId: metalCategory.id,
    },
  });

  const toolSteelCategory = await prisma.materialCategory.create({
    data: {
      name: '工具钢',
      parentId: metalCategory.id,
    },
  });

  const dieSteelCategory = await prisma.materialCategory.create({
    data: {
      name: '模具钢',
      parentId: metalCategory.id,
    },
  });

  const stainlessSteelCategory = await prisma.materialCategory.create({
    data: {
      name: '不锈钢',
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

  const physicalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '物理性能' },
  }) || await prisma.propertyCategory.create({
    data: { name: '物理性能' },
  });

  // 获取或创建数据来源
  const matwebSource = await prisma.dataSource.findFirst({
    where: { title: 'MatWeb - Material Property Data' },
  }) || await prisma.dataSource.create({
    data: {
      type: 'WEBSITE',
      title: 'MatWeb - Material Property Data',
      url: 'https://www.matweb.com',
      authors: 'MatWeb Database',
    },
  });

  const gbSource = await prisma.dataSource.create({
    data: {
      type: 'LITERATURE',
      title: 'GB/T 国家标准 - 钢铁材料标准',
      authors: '中国国家标准化管理委员会',
      year: 2020,
      publisher: '中国标准出版社',
    },
  });

  // ===== 碳钢材料 =====

  // Q235 普通碳素结构钢
  const q235 = await prisma.material.create({
    data: {
      name: 'Q235 普通碳素结构钢',
      designation: 'Q235A/Q235B',
      categoryId: carbonSteelCategory.id,
      description: 'Q235是一种碳素结构钢，具有良好的塑性和韧性，焊接性能好，广泛用于建筑、桥梁、船舶等结构件。',
    },
  });

  // Q235 成分
  await prisma.materialComposition.createMany({
    data: [
      { materialId: q235.id, element: 'C', maxValue: 0.22, unit: 'wt%' },
      { materialId: q235.id, element: 'Mn', maxValue: 1.4, unit: 'wt%' },
      { materialId: q235.id, element: 'Si', maxValue: 0.35, unit: 'wt%' },
      { materialId: q235.id, element: 'S', maxValue: 0.05, unit: 'wt%' },
      { materialId: q235.id, element: 'P', maxValue: 0.045, unit: 'wt%' },
      { materialId: q235.id, element: 'Fe', minValue: 97, unit: 'wt%' },
    ],
  });

  // Q235 性能
  await prisma.materialProperty.createMany({
    data: [
      { materialId: q235.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 375, maxValue: 500, unit: 'MPa' },
      { materialId: q235.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 235, unit: 'MPa' },
      { materialId: q235.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 26, unit: '%' },
      { materialId: q235.id, categoryId: mechanicalCategory.id, propertyName: '硬度', maxValue: 156, unit: 'HBW' },
      { materialId: q235.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
      { materialId: q235.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 50, unit: 'W/(m·K)' },
      { materialId: q235.id, categoryId: thermalCategory.id, propertyName: '熔点', value: 1500, unit: '°C' },
    ],
  });

  // 45号优质碳素结构钢
  const steel45 = await prisma.material.create({
    data: {
      name: '45号优质碳素结构钢',
      designation: '45#',
      categoryId: carbonSteelCategory.id,
      description: '45号钢是中碳结构钢，硬度低易切削加工，模具制作中常用于做模板、梢子、导柱等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: steel45.id, element: 'C', minValue: 0.42, maxValue: 0.50, unit: 'wt%' },
      { materialId: steel45.id, element: 'Mn', minValue: 0.50, maxValue: 0.80, unit: 'wt%' },
      { materialId: steel45.id, element: 'Si', minValue: 0.17, maxValue: 0.37, unit: 'wt%' },
      { materialId: steel45.id, element: 'Cr', maxValue: 0.25, unit: 'wt%' },
      { materialId: steel45.id, element: 'Fe', minValue: 97, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: steel45.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 600, unit: 'MPa' },
      { materialId: steel45.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 355, unit: 'MPa' },
      { materialId: steel45.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', value: 16, unit: '%' },
      { materialId: steel45.id, categoryId: mechanicalCategory.id, propertyName: '硬度', maxValue: 229, unit: 'HBW' },
      { materialId: steel45.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
      { materialId: steel45.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 48, unit: 'W/(m·K)' },
    ],
  });

  // 65Mn弹簧钢
  const spring65Mn = await prisma.material.create({
    data: {
      name: '65Mn弹簧钢',
      designation: '65Mn',
      categoryId: carbonSteelCategory.id,
      description: '65Mn是高碳锰钢，具有高强度和良好的弹性，广泛用于制造弹簧、弹簧垫圈等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: spring65Mn.id, element: 'C', minValue: 0.62, maxValue: 0.70, unit: 'wt%' },
      { materialId: spring65Mn.id, element: 'Mn', minValue: 0.90, maxValue: 1.20, unit: 'wt%' },
      { materialId: spring65Mn.id, element: 'Si', minValue: 0.17, maxValue: 0.37, unit: 'wt%' },
      { materialId: spring65Mn.id, element: 'Fe', minValue: 97, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: spring65Mn.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 980, unit: 'MPa' },
      { materialId: spring65Mn.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 785, unit: 'MPa' },
      { materialId: spring65Mn.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', value: 8, unit: '%' },
      { materialId: spring65Mn.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 285, unit: 'HBW' },
      { materialId: spring65Mn.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
      { materialId: spring65Mn.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 45, unit: 'W/(m·K)' },
    ],
  });

  // ===== 工具钢材料 =====

  // T10碳素工具钢
  const t10 = await prisma.material.create({
    data: {
      name: 'T10碳素工具钢',
      designation: 'T10A/T10',
      categoryId: toolSteelCategory.id,
      description: 'T10钢是最常用的碳素工具钢，具有较好的耐磨性和韧性，适合制造切削速度不高、刃口受热较低的刀具和量具。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: t10.id, element: 'C', minValue: 0.95, maxValue: 1.04, unit: 'wt%' },
      { materialId: t10.id, element: 'Mn', minValue: 0.15, maxValue: 0.40, unit: 'wt%' },
      { materialId: t10.id, element: 'Si', minValue: 0.15, maxValue: 0.35, unit: 'wt%' },
      { materialId: t10.id, element: 'Fe', minValue: 98, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: t10.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 950, unit: 'MPa' },
      { materialId: t10.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 62, unit: 'HRC', notes: '淬火后硬度' },
      { materialId: t10.id, categoryId: mechanicalCategory.id, propertyName: '冲击韧性', value: 15, unit: 'J/cm²' },
      { materialId: t10.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
      { materialId: t10.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 40, unit: 'W/(m·K)' },
    ],
  });

  // CrWMn合金工具钢
  const crwmn = await prisma.material.create({
    data: {
      name: 'CrWMn合金工具钢',
      designation: 'CrWMn',
      categoryId: toolSteelCategory.id,
      description: 'CrWMn是典型的低合金工具钢，具有高硬度、高耐磨性和良好的尺寸稳定性，用于制造精密量具和刀具。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: crwmn.id, element: 'C', minValue: 0.90, maxValue: 1.05, unit: 'wt%' },
      { materialId: crwmn.id, element: 'Cr', minValue: 0.90, maxValue: 1.20, unit: 'wt%' },
      { materialId: crwmn.id, element: 'W', minValue: 1.20, maxValue: 1.60, unit: 'wt%' },
      { materialId: crwmn.id, element: 'Mn', minValue: 0.80, maxValue: 1.10, unit: 'wt%' },
      { materialId: crwmn.id, element: 'Fe', minValue: 95, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: crwmn.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 1030, unit: 'MPa' },
      { materialId: crwmn.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 64, unit: 'HRC', notes: '淬火后硬度' },
      { materialId: crwmn.id, categoryId: mechanicalCategory.id, propertyName: '冲击韧性', value: 12, unit: 'J/cm²' },
      { materialId: crwmn.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
    ],
  });

  // W18Cr4V高速工具钢
  const w18cr4v = await prisma.material.create({
    data: {
      name: 'W18Cr4V高速工具钢',
      designation: 'W18Cr4V (T1)',
      categoryId: toolSteelCategory.id,
      description: 'W18Cr4V是最常用的高速工具钢（俗称锋钢），具有优良的红硬性和耐磨性，用于制造高速切削刀具。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: w18cr4v.id, element: 'C', minValue: 0.70, maxValue: 0.80, unit: 'wt%' },
      { materialId: w18cr4v.id, element: 'W', minValue: 17.5, maxValue: 19.0, unit: 'wt%' },
      { materialId: w18cr4v.id, element: 'Cr', minValue: 3.80, maxValue: 4.40, unit: 'wt%' },
      { materialId: w18cr4v.id, element: 'V', minValue: 1.00, maxValue: 1.40, unit: 'wt%' },
      { materialId: w18cr4v.id, element: 'Mo', maxValue: 0.30, unit: 'wt%' },
      { materialId: w18cr4v.id, element: 'Fe', minValue: 73, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: w18cr4v.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 2100, unit: 'MPa' },
      { materialId: w18cr4v.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 63, unit: 'HRC', notes: '热处理后' },
      { materialId: w18cr4v.id, categoryId: mechanicalCategory.id, propertyName: '红硬性', value: 620, unit: '°C', notes: '在600°C时仍保持高硬度' },
      { materialId: w18cr4v.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.30, unit: 'g/cm³' },
    ],
  });

  // ===== 模具钢材料 =====

  // Cr12冷作模具钢
  const cr12 = await prisma.material.create({
    data: {
      name: 'Cr12冷作模具钢',
      designation: 'Cr12',
      categoryId: dieSteelCategory.id,
      description: 'Cr12是应用最广泛的冷作模具钢，具有高硬度、高耐磨性和良好的淬透性，用于制造冲模、切边模等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cr12.id, element: 'C', minValue: 2.0, maxValue: 2.3, unit: 'wt%' },
      { materialId: cr12.id, element: 'Cr', minValue: 11.5, maxValue: 13.0, unit: 'wt%' },
      { materialId: cr12.id, element: 'Mn', maxValue: 0.40, unit: 'wt%' },
      { materialId: cr12.id, element: 'Fe', minValue: 84, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cr12.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 950, unit: 'MPa' },
      { materialId: cr12.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 60, unit: 'HRC' },
      { materialId: cr12.id, categoryId: mechanicalCategory.id, propertyName: '冲击韧性', value: 8, unit: 'J/cm²' },
      { materialId: cr12.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
      { materialId: cr12.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 11.5, unit: '10^-6/K' },
    ],
  });

  // Cr12MoV冷作模具钢
  const cr12mov = await prisma.material.create({
    data: {
      name: 'Cr12MoV冷作模具钢',
      designation: 'Cr12MoV',
      categoryId: dieSteelCategory.id,
      description: 'Cr12MoV是Cr12的改进型，添加了钼和钒元素，具有更好的韧性和耐磨性，是应用最广的冷作模具钢。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cr12mov.id, element: 'C', minValue: 1.45, maxValue: 1.70, unit: 'wt%' },
      { materialId: cr12mov.id, element: 'Cr', minValue: 11.0, maxValue: 12.5, unit: 'wt%' },
      { materialId: cr12mov.id, element: 'Mo', minValue: 0.40, maxValue: 0.60, unit: 'wt%' },
      { materialId: cr12mov.id, element: 'V', minValue: 0.15, maxValue: 0.30, unit: 'wt%' },
      { materialId: cr12mov.id, element: 'Fe', minValue: 84, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cr12mov.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 1050, unit: 'MPa' },
      { materialId: cr12mov.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 62, unit: 'HRC' },
      { materialId: cr12mov.id, categoryId: mechanicalCategory.id, propertyName: '冲击韧性', value: 12, unit: 'J/cm²' },
      { materialId: cr12mov.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
    ],
  });

  // H13热作模具钢
  const h13 = await prisma.material.create({
    data: {
      name: 'H13热作模具钢',
      designation: '4Cr5MoSiV1 (H13)',
      categoryId: dieSteelCategory.id,
      description: 'H13是最常用的热作模具钢，具有优良的红硬性、韧性和抗热疲劳性，用于制造压铸模、热锻模等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: h13.id, element: 'C', minValue: 0.32, maxValue: 0.45, unit: 'wt%' },
      { materialId: h13.id, element: 'Cr', minValue: 4.75, maxValue: 5.50, unit: 'wt%' },
      { materialId: h13.id, element: 'Mo', minValue: 1.10, maxValue: 1.75, unit: 'wt%' },
      { materialId: h13.id, element: 'V', minValue: 0.80, maxValue: 1.20, unit: 'wt%' },
      { materialId: h13.id, element: 'Si', minValue: 0.80, maxValue: 1.20, unit: 'wt%' },
      { materialId: h13.id, element: 'Fe', minValue: 90, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: h13.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 1510, unit: 'MPa' },
      { materialId: h13.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 1350, unit: 'MPa' },
      { materialId: h13.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 45, unit: 'HRC' },
      { materialId: h13.id, categoryId: mechanicalCategory.id, propertyName: '工作温度', maxValue: 600, unit: '°C' },
      { materialId: h13.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.80, unit: 'g/cm³' },
      { materialId: h13.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 28, unit: 'W/(m·K)' },
    ],
  });

  // P20塑料模具钢
  const p20 = await prisma.material.create({
    data: {
      name: 'P20塑料模具钢',
      designation: '3Cr2Mo (P20)',
      categoryId: dieSteelCategory.id,
      description: 'P20是预硬塑料模具钢，出厂时已预硬至28-32HRC，可直接加工使用，适合制造中大型塑料模具。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: p20.id, element: 'C', minValue: 0.28, maxValue: 0.40, unit: 'wt%' },
      { materialId: p20.id, element: 'Cr', minValue: 1.40, maxValue: 2.0, unit: 'wt%' },
      { materialId: p20.id, element: 'Mo', minValue: 0.30, maxValue: 0.55, unit: 'wt%' },
      { materialId: p20.id, element: 'Fe', minValue: 97, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: p20.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 965, unit: 'MPa' },
      { materialId: p20.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 830, unit: 'MPa' },
      { materialId: p20.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 28, maxValue: 32, unit: 'HRC', notes: '预硬状态' },
      { materialId: p20.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.85, unit: 'g/cm³' },
    ],
  });

  // ===== 不锈钢材料 =====

  // 410马氏体不锈钢
  const ss410 = await prisma.material.create({
    data: {
      name: '410马氏体不锈钢',
      designation: '1Cr12 (410)',
      categoryId: stainlessSteelCategory.id,
      description: '410是马氏体不锈钢，具有良好的耐腐蚀性和机械性能，通过热处理可获得高硬度，用于制造刀具、阀门等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss410.id, element: 'C', maxValue: 0.15, unit: 'wt%' },
      { materialId: ss410.id, element: 'Cr', minValue: 11.5, maxValue: 13.5, unit: 'wt%' },
      { materialId: ss410.id, element: 'Mn', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss410.id, element: 'Fe', minValue: 84, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss410.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 540, maxValue: 750, unit: 'MPa' },
      { materialId: ss410.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 345, unit: 'MPa' },
      { materialId: ss410.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 18, unit: '%' },
      { materialId: ss410.id, categoryId: mechanicalCategory.id, propertyName: '硬度', maxValue: 235, unit: 'HBW' },
      { materialId: ss410.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.75, unit: 'g/cm³' },
    ],
  });

  // 430铁素体不锈钢
  const ss430 = await prisma.material.create({
    data: {
      name: '430铁素体不锈钢',
      designation: '1Cr17 (430)',
      categoryId: stainlessSteelCategory.id,
      description: '430是铁素体不锈钢，具有良好的耐腐蚀性和成形性，广泛用于厨具、家电装饰等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss430.id, element: 'C', maxValue: 0.12, unit: 'wt%' },
      { materialId: ss430.id, element: 'Cr', minValue: 16.0, maxValue: 18.0, unit: 'wt%' },
      { materialId: ss430.id, element: 'Fe', minValue: 81, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss430.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 450, maxValue: 600, unit: 'MPa' },
      { materialId: ss430.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 205, unit: 'MPa' },
      { materialId: ss430.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 22, unit: '%' },
      { materialId: ss430.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.70, unit: 'g/cm³' },
      { materialId: ss430.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 26, unit: 'W/(m·K)' },
    ],
  });

  // 316奥氏体不锈钢
  const ss316 = await prisma.material.create({
    data: {
      name: '316奥氏体不锈钢',
      designation: '0Cr17Ni12Mo2 (316)',
      categoryId: stainlessSteelCategory.id,
      description: '316是含钼奥氏体不锈钢，具有优异的耐腐蚀性，特别是对氯化物和海水的耐蚀性，用于化工、医疗等领域。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss316.id, element: 'C', maxValue: 0.08, unit: 'wt%' },
      { materialId: ss316.id, element: 'Cr', minValue: 16.0, maxValue: 18.0, unit: 'wt%' },
      { materialId: ss316.id, element: 'Ni', minValue: 10.0, maxValue: 14.0, unit: 'wt%' },
      { materialId: ss316.id, element: 'Mo', minValue: 2.0, maxValue: 3.0, unit: 'wt%' },
      { materialId: ss316.id, element: 'Mn', maxValue: 2.0, unit: 'wt%' },
      { materialId: ss316.id, element: 'Fe', minValue: 67, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss316.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 515, maxValue: 690, unit: 'MPa' },
      { materialId: ss316.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 205, unit: 'MPa' },
      { materialId: ss316.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 40, maxValue: 60, unit: '%' },
      { materialId: ss316.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.00, unit: 'g/cm³' },
      { materialId: ss316.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 16.2, unit: 'W/(m·K)' },
    ],
  });

  // 2205双相不锈钢
  const ss2205 = await prisma.material.create({
    data: {
      name: '2205双相不锈钢',
      designation: '022Cr22Ni5Mo3N (2205)',
      categoryId: stainlessSteelCategory.id,
      description: '2205是双相不锈钢，具有奥氏体和铁素体双相组织，兼具高强度和优良的耐腐蚀性，特别是抗应力腐蚀开裂性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss2205.id, element: 'C', maxValue: 0.030, unit: 'wt%' },
      { materialId: ss2205.id, element: 'Cr', minValue: 21.0, maxValue: 23.0, unit: 'wt%' },
      { materialId: ss2205.id, element: 'Ni', minValue: 4.5, maxValue: 6.5, unit: 'wt%' },
      { materialId: ss2205.id, element: 'Mo', minValue: 2.5, maxValue: 3.5, unit: 'wt%' },
      { materialId: ss2205.id, element: 'N', minValue: 0.08, maxValue: 0.20, unit: 'wt%' },
      { materialId: ss2205.id, element: 'Fe', minValue: 67, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss2205.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 655, maxValue: 855, unit: 'MPa' },
      { materialId: ss2205.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 450, unit: 'MPa' },
      { materialId: ss2205.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 25, unit: '%' },
      { materialId: ss2205.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.80, unit: 'g/cm³' },
      { materialId: ss2205.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 19, unit: 'W/(m·K)' },
    ],
  });

  // 为所有材料添加数据来源关联
  const allMaterials = await prisma.material.findMany({
    where: {
      categoryId: {
        in: [
          carbonSteelCategory.id,
          toolSteelCategory.id,
          dieSteelCategory.id,
          stainlessSteelCategory.id,
        ],
      },
    },
  });

  for (const material of allMaterials) {
    await prisma.materialDataSource.create({
      data: {
        materialId: material.id,
        sourceId: matwebSource.id,
      },
    });
  }

  console.log('✅ 金属材料扩展完成！');
  console.log(`新增材料总数: ${allMaterials.length}`);
  console.log(`- 碳钢: 3种`);
  console.log(`- 工具钢: 3种`);
  console.log(`- 模具钢: 4种`);
  console.log(`- 不锈钢: 4种`);
}

main()
  .catch((e) => {
    console.error('❌ 扩展失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
