import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始 Seed 数据库...');

  // 创建材料类别
  const metalCategory = await prisma.materialCategory.create({
    data: {
      name: '金属材料',
    },
  });

  const ceramicCategory = await prisma.materialCategory.create({
    data: {
      name: '陶瓷材料',
    },
  });

  const polymerCategory = await prisma.materialCategory.create({
    data: {
      name: '聚合物材料',
    },
  });

  const compositeCategory = await prisma.materialCategory.create({
    data: {
      name: '复合材料',
    },
  });

  // 创建性能类别
  const mechanicalCategory = await prisma.propertyCategory.create({
    data: { name: '机械性能' },
  });

  const thermalCategory = await prisma.propertyCategory.create({
    data: { name: '热性能' },
  });

  const electricalCategory = await prisma.propertyCategory.create({
    data: { name: '电性能' },
  });

  const opticalCategory = await prisma.propertyCategory.create({
    data: { name: '光学性能' },
  });

  // 创建数据来源
  const asmHandbook = await prisma.dataSource.create({
    data: {
      type: 'HANDBOOK',
      title: 'ASM Handbook Volume 1: Properties and Selection: Irons and Steels',
      authors: 'ASM International',
      year: 1990,
      publisher: 'ASM International',
    },
  });

  const matwebSource = await prisma.dataSource.create({
    data: {
      type: 'WEBSITE',
      title: 'MatWeb - Material Property Data',
      url: 'https://www.matweb.com',
      authors: 'MatWeb Database',
    },
  });

  const textBookSource = await prisma.dataSource.create({
    data: {
      type: 'LITERATURE',
      title: 'Materials Science and Engineering: An Introduction',
      authors: 'William D. Callister, David G. Rethwisch',
      year: 2020,
      publisher: 'John Wiley & Sons',
    },
  });

  // 材料数据
  const materials = [
    // 6061-T6 铝合金
    {
      name: '6061-T6 铝合金',
      designation: '6061-T6',
      categoryId: metalCategory.id,
      description: '6061铝合金是热处理可强化的铝合金，具有优良的机械性能和良好的耐腐蚀性。',
      compositions: [
        { element: 'Mg', value: 1.0, unit: 'wt%' },
        { element: 'Si', value: 0.6, unit: 'wt%' },
        { element: 'Cu', value: 0.25, unit: 'wt%' },
        { element: 'Cr', value: 0.2, unit: 'wt%' },
        { element: 'Fe', maxValue: 0.7, unit: 'wt%' },
        { element: 'Al', minValue: 96, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', value: 310, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '屈服强度', value: 276, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '弹性模量', value: 68.9, unit: 'GPa' },
        { categoryName: '机械性能', propertyName: '硬度', value: 95, unit: 'HB' },
        { categoryName: '机械性能', propertyName: '延伸率', value: 12, unit: '%' },
        { categoryName: '热性能', propertyName: '热导率', value: 167, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '熔点', value: 582, unit: '°C' },
        { categoryName: '热性能', propertyName: '热膨胀系数', value: 23.6, unit: '10^-6/K' },
      ],
    },

    // 304 不锈钢
    {
      name: '304 不锈钢',
      designation: 'SUS304',
      categoryId: metalCategory.id,
      description: '304不锈钢是最常用的不锈钢型号，具有良好的耐腐蚀性和成型性。',
      compositions: [
        { element: 'Cr', value: 18, unit: 'wt%' },
        { element: 'Ni', value: 8, unit: 'wt%' },
        { element: 'Mn', maxValue: 2, unit: 'wt%' },
        { element: 'C', maxValue: 0.08, unit: 'wt%' },
        { element: 'Fe', minValue: 70, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', minValue: 515, maxValue: 690, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '屈服强度', value: 205, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '弹性模量', value: 200, unit: 'GPa' },
        { categoryName: '机械性能', propertyName: '硬度', maxValue: 201, unit: 'HB' },
        { categoryName: '机械性能', propertyName: '延伸率', minValue: 40, maxValue: 60, unit: '%' },
        { categoryName: '热性能', propertyName: '热导率', value: 16.2, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '熔点', value: 1400, unit: '°C' },
      ],
    },

    // 纯钛 TA2
    {
      name: '纯钛 TA2',
      designation: 'TA2',
      categoryId: metalCategory.id,
      description: '工业纯钛TA2具有良好的耐腐蚀性和焊接性能，常用于化工设备制造。',
      compositions: [
        { element: 'Ti', minValue: 99.5, unit: 'wt%' },
        { element: 'Fe', maxValue: 0.3, unit: 'wt%' },
        { element: 'O', maxValue: 0.25, unit: 'wt%' },
        { element: 'N', maxValue: 0.05, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', value: 440, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '屈服强度', value: 320, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '弹性模量', value: 105, unit: 'GPa' },
        { categoryName: '机械性能', propertyName: '延伸率', value: 25, unit: '%' },
        { categoryName: '热性能', propertyName: '热导率', value: 21.9, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '熔点', value: 1668, unit: '°C' },
        { categoryName: '热性能', propertyName: '密度', value: 4.51, unit: 'g/cm³' },
      ],
    },

    // TC4 钛合金
    {
      name: 'TC4 钛合金',
      designation: 'Ti-6Al-4V',
      categoryId: metalCategory.id,
      description: 'TC4是最常用的钛合金，具有高强度和良好的耐腐蚀性。',
      compositions: [
        { element: 'Al', value: 6, unit: 'wt%' },
        { element: 'V', value: 4, unit: 'wt%' },
        { element: 'Ti', minValue: 88, unit: 'wt%' },
        { element: 'Fe', maxValue: 0.3, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', minValue: 895, maxValue: 950, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '屈服强度', value: 825, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '弹性模量', value: 114, unit: 'GPa' },
        { categoryName: '机械性能', propertyName: '延伸率', value: 14, unit: '%' },
        { categoryName: '热性能', propertyName: '热导率', value: 7.02, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '熔点', value: 1660, unit: '°C' },
      ],
    },

    // 氧化铝陶瓷
    {
      name: '氧化铝陶瓷',
      designation: 'Al₂O₃',
      categoryId: ceramicCategory.id,
      description: '氧化铝陶瓷具有优异的绝缘性能、耐磨性和高温稳定性。',
      compositions: [
        { element: 'Al₂O₃', minValue: 96, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '密度', value: 3.85, unit: 'g/cm³' },
        { categoryName: '机械性能', propertyName: '维氏硬度', value: 1500, unit: 'HV' },
        { categoryName: '机械性能', propertyName: '抗弯强度', value: 350, unit: 'MPa' },
        { categoryName: '热性能', propertyName: '热导率', value: 25, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '熔点', value: 2050, unit: '°C' },
        { categoryName: '电性能', propertyName: '介电常数', value: 9.8, unit: '' },
        { categoryName: '电性能', propertyName: '体积电阻率', value: 1e14, unit: 'Ω·cm' },
      ],
    },

    // 碳化硅陶瓷
    {
      name: '碳化硅陶瓷',
      designation: 'SiC',
      categoryId: ceramicCategory.id,
      description: '碳化硅陶瓷具有极高的硬度、优异的导热性和化学稳定性。',
      compositions: [
        { element: 'SiC', minValue: 99, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '密度', value: 3.1, unit: 'g/cm³' },
        { categoryName: '机械性能', propertyName: '维氏硬度', value: 2800, unit: 'HV' },
        { categoryName: '机械性能', propertyName: '抗弯强度', value: 450, unit: 'MPa' },
        { categoryName: '热性能', propertyName: '热导率', value: 120, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '熔点', value: 2700, unit: '°C' },
      ],
    },

    // 氮化硅陶瓷
    {
      name: '氮化硅陶瓷',
      designation: 'Si₃N₄',
      categoryId: ceramicCategory.id,
      description: '氮化硅陶瓷具有高强度、高韧性和优异的热冲击性能。',
      compositions: [
        { element: 'Si₃N₄', minValue: 98, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '密度', value: 3.2, unit: 'g/cm³' },
        { categoryName: '机械性能', propertyName: '维氏硬度', value: 1700, unit: 'HV' },
        { categoryName: '机械性能', propertyName: '抗弯强度', value: 850, unit: 'MPa' },
        { categoryName: '热性能', propertyName: '热导率', value: 30, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '热膨胀系数', value: 3.2, unit: '10^-6/K' },
      ],
    },

    // 环氧树脂
    {
      name: '环氧树脂',
      designation: 'EP',
      categoryId: polymerCategory.id,
      description: '环氧树脂具有良好的电绝缘性、耐化学腐蚀性和粘接性能。',
      compositions: [
        { element: '环氧树脂', value: 100, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', value: 55, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '弹性模量', value: 3, unit: 'GPa' },
        { categoryName: '热性能', propertyName: '玻璃化转变温度', minValue: 80, maxValue: 120, unit: '°C' },
        { categoryName: '热性能', propertyName: '热导率', value: 0.2, unit: 'W/(m·K)' },
        { categoryName: '电性能', propertyName: '介电常数', value: 4.5, unit: '' },
      ],
    },

    // 聚乙烯 HDPE
    {
      name: '高密度聚乙烯',
      designation: 'HDPE',
      categoryId: polymerCategory.id,
      description: '高密度聚乙烯具有优良的耐化学性和成型加工性能。',
      compositions: [
        { element: 'C₂H₄', value: 100, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', value: 30, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '弹性模量', value: 1, unit: 'GPa' },
        { categoryName: '机械性能', propertyName: '延伸率', minValue: 100, maxValue: 600, unit: '%' },
        { categoryName: '热性能', propertyName: '熔点', value: 135, unit: '°C' },
        { categoryName: '热性能', propertyName: '热导率', value: 0.5, unit: 'W/(m·K)' },
      ],
    },

    // 碳纤维增强环氧树脂
    {
      name: '碳纤维/环氧树脂复合材料',
      designation: 'CF/EP',
      categoryId: compositeCategory.id,
      description: '碳纤维增强环氧树脂复合材料具有高比强度和高比模量。',
      compositions: [
        { element: '碳纤维', value: 60, unit: 'wt%' },
        { element: '环氧树脂', value: 40, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', minValue: 1500, maxValue: 2000, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '拉伸模量', value: 140, unit: 'GPa' },
        { categoryName: '热性能', propertyName: '热导率', value: 5, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '热膨胀系数', value: -0.5, unit: '10^-6/K' },
      ],
    },

    // 玻璃纤维增强复合材料
    {
      name: '玻璃纤维/聚酯复合材料',
      designation: 'GFRP',
      categoryId: compositeCategory.id,
      description: '玻璃纤维增强复合材料具有良好的机械性能和成本效益。',
      compositions: [
        { element: '玻璃纤维', value: 50, unit: 'wt%' },
        { element: '聚酯树脂', value: 50, unit: 'wt%' },
      ],
      properties: [
        { categoryName: '机械性能', propertyName: '抗拉强度', value: 300, unit: 'MPa' },
        { categoryName: '机械性能', propertyName: '拉伸模量', value: 20, unit: 'GPa' },
        { categoryName: '热性能', propertyName: '热导率', value: 0.3, unit: 'W/(m·K)' },
        { categoryName: '热性能', propertyName: '热膨胀系数', value: 15, unit: '10^-6/K' },
      ],
    },
  ];

  // 插入材料数据
  const propertyCategoryMap: Record<string, string> = {
    '机械性能': mechanicalCategory.id,
    '热性能': thermalCategory.id,
    '电性能': electricalCategory.id,
    '光学性能': opticalCategory.id,
  };

  for (const mat of materials) {
    console.log(`插入材料: ${mat.name}`);

    const material = await prisma.material.create({
      data: {
        name: mat.name,
        designation: mat.designation,
        categoryId: mat.categoryId,
        description: mat.description,
      },
    });

    // 插入成分数据
    for (const comp of mat.compositions) {
      await prisma.materialComposition.create({
        data: {
          materialId: material.id,
          element: comp.element,
          minValue: comp.minValue,
          maxValue: comp.maxValue,
          unit: comp.unit,
        },
      });
    }

    // 插入性能数据
    for (const prop of mat.properties) {
      const categoryId = propertyCategoryMap[prop.categoryName];

      await prisma.materialProperty.create({
        data: {
          materialId: material.id,
          categoryId,
          propertyName: prop.propertyName,
          value: prop.value,
          minValue: prop.minValue,
          maxValue: prop.maxValue,
          unit: prop.unit,
        },
      });
    }

    // 关联数据来源
    await prisma.materialDataSource.create({
      data: {
        materialId: material.id,
        sourceId: matwebSource.id,
      },
    });
  }

  console.log('Seed 完成！共插入', materials.length, '种材料');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
