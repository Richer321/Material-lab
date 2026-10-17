import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展氮化硅陶瓷材料...');

  // 获取陶瓷材料类别
  let ceramicsCategory = await prisma.materialCategory.findFirst({
    where: { name: '陶瓷材料' },
  });

  if (!ceramicsCategory) {
    throw new Error('找不到陶瓷材料类别');
  }

  // 获取MatWeb数据源
  let matwebSource = await prisma.dataSource.findFirst({
    where: { title: 'MatWeb Database' },
  });

  if (!matwebSource) {
    matwebSource = await prisma.dataSource.create({
      data: {
        title: 'MatWeb Database',
        type: '网站',
        url: 'https://www.matweb.com',
      },
    });
    console.log('✅ 创建MatWeb数据源');
  }

  // 氮化硅陶瓷数据
  const siliconNitrideCeramics = [
    {
      name: '热压氮化硅陶瓷',
      designation: 'Si3N4-HotPressed',
      description: '热压烧结氮化硅陶瓷，具有高强度、高韧性和优异的耐磨性，用于轴承、切削刀具、发动机部件、高温结构件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 700, maxValue: 900, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1000°C)', minValue: 600, maxValue: 750, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2500, maxValue: 3500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 5, maxValue: 7, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 310, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', minValue: 1500, maxValue: 1800, unit: 'HV' },
        { categoryName: '机械', propertyName: '泊松比', value: 0.27, unit: '' },
        { categoryName: '热', propertyName: '热导率 (RT)', minValue: 25, maxValue: 35, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数 (RT)', value: 3.2, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1200, unit: '°C' },
        { categoryName: '热', propertyName: '抗热震性', value: 600, unit: 'ΔT(°C)' },
        { categoryName: '物理', propertyName: '密度', value: 3.20, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数', value: 8.5, unit: '' },
        { categoryName: '其他', propertyName: '摩擦系数', value: 0.6, unit: '' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 98, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 4, maxValue: 8, unit: '%' },
        { element: 'Al2O3 (氧化铝)', maxValue: 2, unit: '%' },
      ],
    },
    {
      name: '反应烧结氮化硅陶瓷',
      designation: 'Si3N4-RBSN',
      description: '反应烧结氮化硅陶瓷，具有较低成本、良好尺寸精度和复杂形状成型能力，用于绝缘体、耐磨件、热交换器',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 250, maxValue: 350, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (800°C)', minValue: 200, maxValue: 300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 800, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 2.5, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 180, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', value: 900, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 3, maxValue: 8, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 2.9, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 2.60, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '气孔率', minValue: 15, maxValue: 20, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E12, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 95, maxValue: 98, unit: '%' },
        { element: 'Si (硅)', maxValue: 5, unit: '%' },
      ],
    },
    {
      name: '气压烧结氮化硅陶瓷',
      designation: 'Si3N4-GPS',
      description: '气压烧结氮化硅陶瓷，具有高强度、高韧性和优异的可靠性，用于轴承滚珠、轴承座、高温结构部件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 800, maxValue: 1000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1000°C)', minValue: 650, maxValue: 800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 3000, maxValue: 4000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 7, maxValue: 9, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 320, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', minValue: 1600, maxValue: 1900, unit: 'HV' },
        { categoryName: '机械', propertyName: '韦氏硬度', value: 1500, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 28, maxValue: 38, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 3.3, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1300, unit: '°C' },
        { categoryName: '热', propertyName: '抗热震性', value: 700, unit: 'ΔT(°C)' },
        { categoryName: '物理', propertyName: '密度', value: 3.25, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 92, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 5, maxValue: 8, unit: '%' },
        { element: 'MgO (氧化镁)', minValue: 1, maxValue: 3, unit: '%' },
      ],
    },
    {
      name: '自增韧氮化硅陶瓷',
      designation: 'Si3N4-SN',
      description: '自增韧氮化硅陶瓷，通过原位生长长柱状β-Si3N4晶粒实现增韧，用于轴承、切削刀具、喷嘴、耐磨件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 850, maxValue: 1100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1200°C)', minValue: 600, maxValue: 800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2800, maxValue: 3800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 8, maxValue: 11, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 300, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', minValue: 1450, maxValue: 1750, unit: 'HV' },
        { categoryName: '机械', propertyName: '疲劳强度 (10⁷次)', value: 400, unit: 'MPa' },
        { categoryName: '热', propertyName: '热导率', minValue: 22, maxValue: 32, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 3.1, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1400, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.22, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '介电常数', value: 8.3, unit: '' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 93, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 4, maxValue: 6, unit: '%' },
        { element: 'SiO2 (二氧化硅)', maxValue: 2, unit: '%' },
      ],
    },
    {
      name: 'Sialon陶瓷',
      designation: 'SiAlON-β',
      description: 'β-Sialon陶瓷（Si-Al-O-N系），具有优异的高温性能和化学稳定性，用于高温窑具、金属冶炼坩埚、热电偶保护管',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 450, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1000°C)', minValue: 400, maxValue: 550, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2000, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 4, maxValue: 6, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 280, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', value: 1500, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 15, maxValue: 25, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 3.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1200, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.15, unit: 'g/cm³' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 55, maxValue: 65, unit: '%' },
        { element: 'Al2O3 (氧化铝)', minValue: 15, maxValue: 25, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 5, maxValue: 10, unit: '%' },
      ],
    },
    {
      name: '无压烧结氮化硅陶瓷',
      designation: 'Si3N4-PLS',
      description: '无压烧结氮化硅陶瓷，具有良好性能和成本优势，用于一般工业结构件、耐磨件、绝缘体',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 600, maxValue: 800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (800°C)', minValue: 450, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2000, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 5, maxValue: 7, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 290, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', minValue: 1400, maxValue: 1700, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 20, maxValue: 30, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 3.0, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1100, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.18, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E13, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 93, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 4, maxValue: 6, unit: '%' },
        { element: 'MgO (氧化镁)', maxValue: 2, unit: '%' },
      ],
    },
    {
      name: '氮化硅轴承球陶瓷',
      designation: 'Si3N4-Bearing',
      description: '精密氮化硅陶瓷轴承球，具有高硬度、低密度和优异的疲劳寿命，用于高速轴承、精密机床、航空航天轴承',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 750, maxValue: 950, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2800, maxValue: 3600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 6, maxValue: 8, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 305, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', minValue: 1550, maxValue: 1800, unit: 'HV' },
        { categoryName: '机械', propertyName: '韦氏硬度', value: 1600, unit: 'HV' },
        { categoryName: '机械', propertyName: '疲劳寿命 (滚动接触)', value: 1E8, unit: '次' },
        { categoryName: '机械', propertyName: '球度', minValue: 0, maxValue: 0.5, unit: 'μm' },
        { categoryName: '热', propertyName: '热导率', minValue: 30, maxValue: 40, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 3.2, unit: '×10⁻⁶/K' },
        { categoryName: '物理', propertyName: '密度', value: 3.23, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '表面粗糙度 (Ra)', value: 0.02, unit: 'μm' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 96, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 3, maxValue: 5, unit: '%' },
        { element: 'Al2O3 (氧化铝)', maxValue: 1, unit: '%' },
      ],
    },
    {
      name: '高热导氮化硅陶瓷',
      designation: 'Si3N4-HighThermal',
      description: '高热导氮化硅陶瓷，具有极高的热导率和优异的电绝缘性，用于功率电子基板、LED散热基板、IGBT基板',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 550, maxValue: 700, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 290, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HV)', value: 1400, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 80, maxValue: 100, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 2.8, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 800, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.25, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数', value: 8.0, unit: '' },
        { categoryName: '电', propertyName: '介电强度', value: 30, unit: 'kV/mm' },
      ],
      compositions: [
        { element: 'Si3N4 (氮化硅)', minValue: 94, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 3, maxValue: 5, unit: '%' },
        { element: 'MgO (氧化镁)', minValue: 1, maxValue: 2, unit: '%' },
      ],
    },
  ];

  let createdCount = 0;

  for (const ceramic of siliconNitrideCeramics) {
    console.log(`处理材料: ${ceramic.name}`);

    // 检查材料是否已存在
    const existingMaterial = await prisma.material.findFirst({
      where: {
        name: ceramic.name,
        designation: ceramic.designation,
      },
    });

    if (existingMaterial) {
      console.log(`  ⚠️  材料已存在，跳过: ${ceramic.name}`);
      continue;
    }

    // 创建材料
    const material = await prisma.material.create({
      data: {
        name: ceramic.name,
        designation: ceramic.designation,
        description: ceramic.description,
        categoryId: ceramicsCategory.id,
      },
    });

    // 创建性能数据
    for (const prop of ceramic.properties) {
      let propertyCategory = await prisma.propertyCategory.findFirst({
        where: { name: prop.categoryName },
      });

      if (!propertyCategory) {
        propertyCategory = await prisma.propertyCategory.create({
          data: { name: prop.categoryName },
        });
      }

      await prisma.materialProperty.create({
        data: {
          materialId: material.id,
          categoryId: propertyCategory.id,
          propertyName: prop.propertyName,
          minValue: prop.minValue ?? null,
          maxValue: prop.maxValue ?? null,
          value: prop.value ?? null,
          unit: prop.unit,
        },
      });
    }

    // 创建成分数据
    for (const comp of ceramic.compositions) {
      await prisma.materialComposition.create({
        data: {
          materialId: material.id,
          element: comp.element,
          minValue: comp.minValue ?? null,
          maxValue: comp.maxValue ?? null,
          unit: comp.unit,
        },
      });
    }

    // 关联数据源
    await prisma.materialDataSource.create({
      data: {
        materialId: material.id,
        sourceId: matwebSource.id,
      },
    });

    createdCount++;
    console.log(`  ✅ 创建成功: ${ceramic.name}`);
  }

  console.log(`\n氮化硅陶瓷扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种氮化硅陶瓷材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展氮化硅陶瓷失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
