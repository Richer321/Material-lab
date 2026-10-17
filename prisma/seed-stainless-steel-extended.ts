import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展不锈钢材料...');

  // 获取不锈钢类别
  const stainlessSteelCategory = await prisma.materialCategory.findFirst({
    where: { name: '不锈钢' },
  });

  if (!stainlessSteelCategory) {
    console.error('找不到不锈钢类别，请先运行基础 seed');
    return;
  }

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

  // 获取数据来源
  const matwebSource = await prisma.dataSource.findFirst({
    where: { title: 'MatWeb - Material Property Data' },
  });

  const astmSource = await prisma.dataSource.create({
    data: {
      type: 'LITERATURE',
      title: 'ASTM Standards - Stainless Steel',
      authors: 'ASTM International',
      year: 2021,
      publisher: 'ASTM International',
    },
  });

  // ===== 奥氏体不锈钢 =====

  // 304L奥氏体不锈钢
  const ss304l = await prisma.material.create({
    data: {
      name: '304L超低碳奥氏体不锈钢',
      designation: '00Cr19Ni11 (304L)',
      categoryId: stainlessSteelCategory.id,
      description: '304L是304的超低碳版本，具有优异的耐晶间腐蚀性能，广泛用于化工、石油、纺织等行业。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss304l.id, element: 'C', maxValue: 0.030, unit: 'wt%' },
      { materialId: ss304l.id, element: 'Cr', minValue: 18.0, maxValue: 20.0, unit: 'wt%' },
      { materialId: ss304l.id, element: 'Ni', minValue: 8.0, maxValue: 12.0, unit: 'wt%' },
      { materialId: ss304l.id, element: 'Mn', maxValue: 2.0, unit: 'wt%' },
      { materialId: ss304l.id, element: 'Si', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss304l.id, element: 'Fe', minValue: 67, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss304l.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 485, maxValue: 620, unit: 'MPa' },
      { materialId: ss304l.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 170, unit: 'MPa' },
      { materialId: ss304l.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 40, unit: '%' },
      { materialId: ss304l.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.00, unit: 'g/cm³' },
      { materialId: ss304l.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 16.2, unit: 'W/(m·K)' },
    ],
  });

  // 321奥氏体不锈钢
  const ss321 = await prisma.material.create({
    data: {
      name: '321钛稳定奥氏体不锈钢',
      designation: '1Cr18Ni9Ti (321)',
      categoryId: stainlessSteelCategory.id,
      description: '321是钛稳定化奥氏体不锈钢，具有良好的抗晶间腐蚀能力和高温性能，用于航空、石化等高温环境。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss321.id, element: 'C', maxValue: 0.08, unit: 'wt%' },
      { materialId: ss321.id, element: 'Cr', minValue: 17.0, maxValue: 19.0, unit: 'wt%' },
      { materialId: ss321.id, element: 'Ni', minValue: 9.0, maxValue: 12.0, unit: 'wt%' },
      { materialId: ss321.id, element: 'Ti', minValue: 0.4, maxValue: 0.7, unit: 'wt%' },
      { materialId: ss321.id, element: 'Mn', maxValue: 2.0, unit: 'wt%' },
      { materialId: ss321.id, element: 'Fe', minValue: 67, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss321.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 520, maxValue: 720, unit: 'MPa' },
      { materialId: ss321.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 205, unit: 'MPa' },
      { materialId: ss321.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 40, unit: '%' },
      { materialId: ss321.id, categoryId: mechanicalCategory.id, propertyName: '工作温度', maxValue: 870, unit: '°C' },
      { materialId: ss321.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.93, unit: 'g/cm³' },
      { materialId: ss321.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 16, unit: 'W/(m·K)' },
    ],
  });

  // 347铌稳定奥氏体不锈钢
  const ss347 = await prisma.material.create({
    data: {
      name: '347铌稳定奥氏体不锈钢',
      designation: '0Cr18Ni11Nb (347)',
      categoryId: stainlessSteelCategory.id,
      description: '347是铌稳定化奥氏体不锈钢，具有优异的抗晶间腐蚀性能和高温强度，用于锅炉、石化设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss347.id, element: 'C', maxValue: 0.08, unit: 'wt%' },
      { materialId: ss347.id, element: 'Cr', minValue: 17.0, maxValue: 20.0, unit: 'wt%' },
      { materialId: ss347.id, element: 'Ni', minValue: 9.0, maxValue: 13.0, unit: 'wt%' },
      { materialId: ss347.id, element: 'Nb', minValue: 0.8, maxValue: 1.0, unit: 'wt%' },
      { materialId: ss347.id, element: 'Mn', maxValue: 2.0, unit: 'wt%' },
      { materialId: ss347.id, element: 'Fe', minValue: 67, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss347.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 515, maxValue: 730, unit: 'MPa' },
      { materialId: ss347.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 205, unit: 'MPa' },
      { materialId: ss347.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 40, unit: '%' },
      { materialId: ss347.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.00, unit: 'g/cm³' },
      { materialId: ss347.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 16, unit: 'W/(m·K)' },
    ],
  });

  // 904L超级奥氏体不锈钢
  const ss904l = await prisma.material.create({
    data: {
      name: '904L超级奥氏体不锈钢',
      designation: '00Cr20Ni25Mo4.5Cu (904L)',
      categoryId: stainlessSteelCategory.id,
      description: '904L是超级奥氏体不锈钢，具有优异的耐酸和耐氯化物腐蚀性能，用于化工、造纸、制药等强腐蚀环境。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss904l.id, element: 'C', maxValue: 0.020, unit: 'wt%' },
      { materialId: ss904l.id, element: 'Cr', minValue: 19.0, maxValue: 23.0, unit: 'wt%' },
      { materialId: ss904l.id, element: 'Ni', minValue: 23.0, maxValue: 28.0, unit: 'wt%' },
      { materialId: ss904l.id, element: 'Mo', minValue: 4.0, maxValue: 5.0, unit: 'wt%' },
      { materialId: ss904l.id, element: 'Cu', minValue: 1.0, maxValue: 2.0, unit: 'wt%' },
      { materialId: ss904l.id, element: 'Fe', minValue: 42, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss904l.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 490, unit: 'MPa' },
      { materialId: ss904l.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 220, unit: 'MPa' },
      { materialId: ss904l.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 35, unit: '%' },
      { materialId: ss904l.id, categoryId: physicalCategory.id, propertyName: '密度', value: 8.00, unit: 'g/cm³' },
      { materialId: ss904l.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 12, unit: 'W/(m·K)' },
    ],
  });

  // ===== 铁素体不锈钢 =====

  // 409铁素体不锈钢
  const ss409 = await prisma.material.create({
    data: {
      name: '409铁素体不锈钢',
      designation: '0Cr11Ti (409)',
      categoryId: stainlessSteelCategory.id,
      description: '409是低成本铁素体不锈钢，具有良好的耐腐蚀性和成形性，广泛用于汽车排气系统、家电等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss409.id, element: 'C', maxValue: 0.08, unit: 'wt%' },
      { materialId: ss409.id, element: 'Cr', minValue: 10.5, maxValue: 11.75, unit: 'wt%' },
      { materialId: ss409.id, element: 'Ti', minValue: 0.3, maxValue: 0.6, unit: 'wt%' },
      { materialId: ss409.id, element: 'Mn', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss409.id, element: 'Fe', minValue: 87, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss409.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 360, maxValue: 480, unit: 'MPa' },
      { materialId: ss409.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 170, unit: 'MPa' },
      { materialId: ss409.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 25, unit: '%' },
      { materialId: ss409.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.70, unit: 'g/cm³' },
      { materialId: ss409.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 25, unit: 'W/(m·K)' },
    ],
  });

  // 439铁素体不锈钢
  const ss439 = await prisma.material.create({
    data: {
      name: '439稳定化铁素体不锈钢',
      designation: '0Cr17Ti (439)',
      categoryId: stainlessSteelCategory.id,
      description: '439是钛稳定化铁素体不锈钢，具有优异的耐腐蚀性和成形性，用于汽车消声器、热水箱等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss439.id, element: 'C', maxValue: 0.07, unit: 'wt%' },
      { materialId: ss439.id, element: 'Cr', minValue: 17.0, maxValue: 19.0, unit: 'wt%' },
      { materialId: ss439.id, element: 'Ti', minValue: 0.2, maxValue: 0.6, unit: 'wt%' },
      { materialId: ss439.id, element: 'Mn', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss439.id, element: 'Fe', minValue: 79, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss439.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 415, maxValue: 585, unit: 'MPa' },
      { materialId: ss439.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 205, unit: 'MPa' },
      { materialId: ss439.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 22, unit: '%' },
      { materialId: ss439.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.70, unit: 'g/cm³' },
      { materialId: ss439.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 26, unit: 'W/(m·K)' },
    ],
  });

  // 444铁素体不锈钢
  const ss444 = await prisma.material.create({
    data: {
      name: '444高性能铁素体不锈钢',
      designation: '00Cr18Mo2Ti (444)',
      categoryId: stainlessSteelCategory.id,
      description: '444是含钼钛稳定铁素体不锈钢，具有优异的耐氯离子应力腐蚀和点蚀性能，用于热水箱、热交换器。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss444.id, element: 'C', maxValue: 0.025, unit: 'wt%' },
      { materialId: ss444.id, element: 'Cr', minValue: 17.5, maxValue: 19.5, unit: 'wt%' },
      { materialId: ss444.id, element: 'Mo', minValue: 1.75, maxValue: 2.50, unit: 'wt%' },
      { materialId: ss444.id, element: 'Ti', minValue: 0.2, maxValue: 0.6, unit: 'wt%' },
      { materialId: ss444.id, element: 'Fe', minValue: 77, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss444.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 415, maxValue: 585, unit: 'MPa' },
      { materialId: ss444.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 310, unit: 'MPa' },
      { materialId: ss444.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 20, unit: '%' },
      { materialId: ss444.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.75, unit: 'g/cm³' },
      { materialId: ss444.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 26, unit: 'W/(m·K)' },
    ],
  });

  // ===== 马氏体不锈钢 =====

  // 420马氏体不锈钢
  const ss420 = await prisma.material.create({
    data: {
      name: '420马氏体不锈钢',
      designation: '2Cr13 (420)',
      categoryId: stainlessSteelCategory.id,
      description: '420是马氏体不锈钢，通过热处理可获得高强度和硬度，用于制造刀具、外科手术器械、轴承等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss420.id, element: 'C', minValue: 0.15, maxValue: 0.25, unit: 'wt%' },
      { materialId: ss420.id, element: 'Cr', minValue: 12.0, maxValue: 14.0, unit: 'wt%' },
      { materialId: ss420.id, element: 'Mn', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss420.id, element: 'Fe', minValue: 84, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss420.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 655, maxValue: 930, unit: 'MPa' },
      { materialId: ss420.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 345, unit: 'MPa' },
      { materialId: ss420.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 48, unit: 'HRC', notes: '热处理后' },
      { materialId: ss420.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.75, unit: 'g/cm³' },
    ],
  });

  // 440C高碳马氏体不锈钢
  const ss440c = await prisma.material.create({
    data: {
      name: '440C高碳马氏体不锈钢',
      designation: '7Cr17Mo (440C)',
      categoryId: stainlessSteelCategory.id,
      description: '440C是高碳高铬马氏体不锈钢，具有最高的硬度、耐磨性和耐腐蚀性，用于高端刀具、轴承、泵部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss440c.id, element: 'C', minValue: 0.95, maxValue: 1.20, unit: 'wt%' },
      { materialId: ss440c.id, element: 'Cr', minValue: 16.0, maxValue: 18.0, unit: 'wt%' },
      { materialId: ss440c.id, element: 'Mo', maxValue: 0.75, unit: 'wt%' },
      { materialId: ss440c.id, element: 'Mn', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss440c.id, element: 'Fe', minValue: 80, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss440c.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 760, maxValue: 2000, unit: 'MPa' },
      { materialId: ss440c.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 58, unit: 'HRC', notes: '退火态；热处理后可达60HRC' },
      { materialId: ss440c.id, categoryId: mechanicalCategory.id, propertyName: '冲击韧性', value: 15, unit: 'J/cm²' },
      { materialId: ss440c.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.65, unit: 'g/cm³' },
    ],
  });

  // 431马氏体不锈钢
  const ss431 = await prisma.material.create({
    data: {
      name: '431高强度马氏体不锈钢',
      designation: '1Cr17Ni2 (431)',
      categoryId: stainlessSteelCategory.id,
      description: '431是高强度马氏体不锈钢，具有优良的机械性能和耐腐蚀性，用于航空发动机部件、泵轴、螺栓等高强度零件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss431.id, element: 'C', minValue: 0.12, maxValue: 0.22, unit: 'wt%' },
      { materialId: ss431.id, element: 'Cr', minValue: 15.0, maxValue: 17.0, unit: 'wt%' },
      { materialId: ss431.id, element: 'Ni', minValue: 2.0, maxValue: 3.0, unit: 'wt%' },
      { materialId: ss431.id, element: 'Mn', maxValue: 1.0, unit: 'wt%' },
      { materialId: ss431.id, element: 'Fe', minValue: 78, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss431.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 1030, maxValue: 1310, unit: 'MPa' },
      { materialId: ss431.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 655, unit: 'MPa' },
      { materialId: ss431.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 12, unit: '%' },
      { materialId: ss431.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 285, unit: 'HBW' },
      { materialId: ss431.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.75, unit: 'g/cm³' },
    ],
  });

  // ===== 双相不锈钢 =====

  // 2507超级双相不锈钢
  const ss2507 = await prisma.material.create({
    data: {
      name: '2507超级双相不锈钢',
      designation: '00Cr25Ni7Mo4N (2507)',
      categoryId: stainlessSteelCategory.id,
      description: '2507是超级双相不锈钢，具有极高的强度和优异的耐蚀性，特别是耐海水腐蚀和应力腐蚀，用于海洋工程、化工设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss2507.id, element: 'C', maxValue: 0.030, unit: 'wt%' },
      { materialId: ss2507.id, element: 'Cr', minValue: 24.0, maxValue: 26.0, unit: 'wt%' },
      { materialId: ss2507.id, element: 'Ni', minValue: 6.0, maxValue: 8.0, unit: 'wt%' },
      { materialId: ss2507.id, element: 'Mo', minValue: 3.0, maxValue: 5.0, unit: 'wt%' },
      { materialId: ss2507.id, element: 'N', minValue: 0.24, maxValue: 0.32, unit: 'wt%' },
      { materialId: ss2507.id, element: 'Fe', minValue: 60, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss2507.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 800, maxValue: 1000, unit: 'MPa' },
      { materialId: ss2507.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 550, unit: 'MPa' },
      { materialId: ss2507.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 25, unit: '%' },
      { materialId: ss2507.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 290, unit: 'HBW' },
      { materialId: ss2507.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.80, unit: 'g/cm³' },
      { materialId: ss2507.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 15, unit: 'W/(m·K)' },
    ],
  });

  // ===== 沉淀硬化不锈钢 =====

  // 17-4PH沉淀硬化不锈钢
  const ss17_4ph = await prisma.material.create({
    data: {
      name: '17-4PH沉淀硬化不锈钢',
      designation: '0Cr17Ni4Cu4Nb (17-4PH)',
      categoryId: stainlessSteelCategory.id,
      description: '17-4PH是最常用的沉淀硬化不锈钢，具有高强度、高硬度和良好的耐腐蚀性，用于航空、化工、核工业的高强度部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss17_4ph.id, element: 'C', maxValue: 0.07, unit: 'wt%' },
      { materialId: ss17_4ph.id, element: 'Cr', minValue: 15.0, maxValue: 17.5, unit: 'wt%' },
      { materialId: ss17_4ph.id, element: 'Ni', minValue: 3.0, maxValue: 5.0, unit: 'wt%' },
      { materialId: ss17_4ph.id, element: 'Cu', minValue: 3.0, maxValue: 5.0, unit: 'wt%' },
      { materialId: ss17_4ph.id, element: 'Nb', minValue: 0.15, maxValue: 0.45, unit: 'wt%' },
      { materialId: ss17_4ph.id, element: 'Fe', minValue: 72, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss17_4ph.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 1310, unit: 'MPa', notes: 'H900时效状态' },
      { materialId: ss17_4ph.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 1170, unit: 'MPa', notes: 'H900时效状态' },
      { materialId: ss17_4ph.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 10, unit: '%' },
      { materialId: ss17_4ph.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 40, unit: 'HRC', notes: 'H900时效状态' },
      { materialId: ss17_4ph.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.80, unit: 'g/cm³' },
      { materialId: ss17_4ph.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 18, unit: 'W/(m·K)' },
    ],
  });

  // 15-5PH沉淀硬化不锈钢
  const ss15_5ph = await prisma.material.create({
    data: {
      name: '15-5PH沉淀硬化不锈钢',
      designation: '0Cr15Ni5Cu4Nb (15-5PH)',
      categoryId: stainlessSteelCategory.id,
      description: '15-5PH是改良的沉淀硬化不锈钢，具有更均匀的性能和更好的横向韧性，用于飞机部件、化工设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ss15_5ph.id, element: 'C', maxValue: 0.07, unit: 'wt%' },
      { materialId: ss15_5ph.id, element: 'Cr', minValue: 14.0, maxValue: 15.5, unit: 'wt%' },
      { materialId: ss15_5ph.id, element: 'Ni', minValue: 3.5, maxValue: 5.5, unit: 'wt%' },
      { materialId: ss15_5ph.id, element: 'Cu', minValue: 2.5, maxValue: 4.5, unit: 'wt%' },
      { materialId: ss15_5ph.id, element: 'Nb', minValue: 0.15, maxValue: 0.45, unit: 'wt%' },
      { materialId: ss15_5ph.id, element: 'Fe', minValue: 74, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ss15_5ph.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 1310, unit: 'MPa', notes: 'H900时效状态' },
      { materialId: ss15_5ph.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 1170, unit: 'MPa', notes: 'H900时效状态' },
      { materialId: ss15_5ph.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', minValue: 10, unit: '%' },
      { materialId: ss15_5ph.id, categoryId: mechanicalCategory.id, propertyName: '硬度', minValue: 40, unit: 'HRC', notes: 'H900时效状态' },
      { materialId: ss15_5ph.id, categoryId: physicalCategory.id, propertyName: '密度', value: 7.80, unit: 'g/cm³' },
    ],
  });

  // 为所有材料添加数据来源
  const allNewMaterials = await prisma.material.findMany({
    where: {
      categoryId: stainlessSteelCategory.id,
    },
  });

  const existingMaterialIds = new Set();
  const sources = await prisma.materialDataSource.findMany({
    where: {
      materialId: { in: allNewMaterials.map(m => m.id) },
    },
  });
  sources.forEach(s => existingMaterialIds.add(s.materialId));

  for (const material of allNewMaterials) {
    if (!existingMaterialIds.has(material.id)) {
      await prisma.materialDataSource.create({
        data: {
          materialId: material.id,
          sourceId: matwebSource?.id || astmSource.id,
        },
      });
    }
  }

  const finalCount = await prisma.material.count({
    where: { categoryId: stainlessSteelCategory.id },
  });

  console.log('✅ 不锈钢材料扩展完成！');
  console.log(`不锈钢总数: ${finalCount} 种`);
  console.log(`新增材料: ${finalCount - 4} 种`);
}

main()
  .catch((e) => {
    console.error('❌ 扩展失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
