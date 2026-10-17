import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加硅胶材料数据...');

  // 获取橡胶材料类别
  const elastomerCategory = await prisma.materialCategory.findFirst({
    where: { name: '橡胶材料' },
  });

  if (!elastomerCategory) {
    console.error('找不到橡胶材料类别，请先运行基础 seed');
    return;
  }

  // 创建硅胶子类别
  const siliconeCategory = await prisma.materialCategory.findFirst({
    where: { name: '硅胶', parentId: elastomerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '硅胶',
      parentId: elastomerCategory.id,
    },
  });

  // 创建厂家子类别
  const nusilCategory = await prisma.materialCategory.findFirst({
    where: { name: 'Nusil Technology', parentId: siliconeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: 'Nusil Technology',
      parentId: siliconeCategory.id,
    },
  });

  const elkemCategory = await prisma.materialCategory.findFirst({
    where: { name: 'Elkem BlueStar', parentId: siliconeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: 'Elkem BlueStar',
      parentId: siliconeCategory.id,
    },
  });

  const momentiveCategory = await prisma.materialCategory.findFirst({
    where: { name: 'Momentive', parentId: siliconeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: 'Momentive',
      parentId: siliconeCategory.id,
    },
  });

  const wackerCategory = await prisma.materialCategory.findFirst({
    where: { name: 'Wacker', parentId: siliconeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: 'Wacker',
      parentId: siliconeCategory.id,
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

  const electricalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '电学性能' },
  }) || await prisma.propertyCategory.create({
    data: { name: '电学性能' },
  });

  // ===== Nusil Technology 产品 =====

  // Nusil R-2180 通用型RTV硅胶
  const nusil2180 = await prisma.material.create({
    data: {
      name: 'Nusil R-2180 通用型RTV硅胶',
      designation: 'R-2180',
      categoryId: nusilCategory.id,
      description: '通用型单组分室温硫化硅胶，良好的密封性能，用于电子密封、建筑密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: nusil2180.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: nusil2180.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 30, unit: 'Shore A' },
      { materialId: nusil2180.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 2.5, unit: 'MPa' },
      { materialId: nusil2180.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 400, unit: '%' },
      { materialId: nusil2180.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 15, unit: 'kN/m' },
      { materialId: nusil2180.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: nusil2180.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.12, unit: 'g/cm³' },
      { materialId: nusil2180.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 18, unit: 'kV/mm' },
    ],
  });

  // Nusil MED-6215 医疗级硅胶
  const nusilmed = await prisma.material.create({
    data: {
      name: 'Nusil MED-6215 医疗级硅胶',
      designation: 'MED-6215',
      categoryId: nusilCategory.id,
      description: '双组分医疗级硅胶，生物相容性符合ISO 10993，用于医疗器械。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: nusilmed.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: nusilmed.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 15, unit: 'Shore A' },
      { materialId: nusilmed.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 5.5, unit: 'MPa' },
      { materialId: nusilmed.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 900, unit: '%' },
      { materialId: nusilmed.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 12, unit: 'kN/m' },
      { materialId: nusilmed.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -50, maxValue: 200, unit: '°C' },
      { materialId: nusilmed.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.08, unit: 'g/cm³' },
    ],
  });

  // Nusil R-2620 导热硅胶
  const nusil2620 = await prisma.material.create({
    data: {
      name: 'Nusil R-2620 导热硅胶',
      designation: 'R-2620',
      categoryId: nusilCategory.id,
      description: '双组分高导热硅胶，用于电子散热、LED照明。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: nusil2620.id, element: '聚二甲基硅氧烷', value: 85, unit: 'wt%' },
      { materialId: nusil2620.id, element: '氧化铝填料', value: 15, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: nusil2620.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 60, unit: 'Shore A' },
      { materialId: nusil2620.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 4.0, unit: 'MPa' },
      { materialId: nusil2620.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 150, unit: '%' },
      { materialId: nusil2620.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 2.5, unit: 'W/(m·K)' },
      { materialId: nusil2620.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: nusil2620.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.65, unit: 'g/cm³' },
      { materialId: nusil2620.id, categoryId: electricalCategory.id, propertyName: '介电常数', value: 5.5, unit: '1MHz' },
    ],
  });

  // Nusil R-2185 高透明硅胶
  const nusil2185 = await prisma.material.create({
    data: {
      name: 'Nusil R-2185 高透明硅胶',
      designation: 'R-2185',
      categoryId: nusilCategory.id,
      description: '单组分高透明RTV硅胶，超高透光率，用于光学器件、LED封装。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: nusil2185.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: nusil2185.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 25, unit: 'Shore A' },
      { materialId: nusil2185.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 3.0, unit: 'MPa' },
      { materialId: nusil2185.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: nusil2185.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.10, unit: 'g/cm³' },
      { materialId: nusil2185.id, categoryId: physicalCategory.id, propertyName: '透光率', value: 95, unit: '%' },
      { materialId: nusil2185.id, categoryId: physicalCategory.id, propertyName: '折射率', value: 1.41, unit: '' },
    ],
  });

  // Nusil MED-1132 超软医疗硅胶
  const nusil1132 = await prisma.material.create({
    data: {
      name: 'Nusil MED-1132 超软医疗硅胶',
      designation: 'MED-1132',
      categoryId: nusilCategory.id,
      description: '双组分超软医疗级硅胶，用于医疗导管、伤口接触。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: nusil1132.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: nusil1132.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 5, unit: 'Shore A' },
      { materialId: nusil1132.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 1.5, unit: 'MPa' },
      { materialId: nusil1132.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 1200, unit: '%' },
      { materialId: nusil1132.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -40, maxValue: 150, unit: '°C' },
      { materialId: nusil1132.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.05, unit: 'g/cm³' },
    ],
  });

  // Nusil R-2182 高强度硅胶
  const nusil2182 = await prisma.material.create({
    data: {
      name: 'Nusil R-2182 高强度硅胶',
      designation: 'R-2182',
      categoryId: nusilCategory.id,
      description: '双组分高强度RTV硅胶，超高拉伸强度，用于结构粘接。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: nusil2182.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: nusil2182.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: nusil2182.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 12, unit: 'MPa' },
      { materialId: nusil2182.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 450, unit: '%' },
      { materialId: nusil2182.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 55, unit: 'kN/m' },
      { materialId: nusil2182.id, categoryId: mechanicalCategory.id, propertyName: '剪切强度', value: 8.5, unit: 'MPa' },
      { materialId: nusil2182.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: nusil2182.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.20, unit: 'g/cm³' },
    ],
  });

  // ===== Elkem BlueStar 产品 =====

  // Elkem Bluesil RTV 4420 通用型硅胶
  const elkem4420 = await prisma.material.create({
    data: {
      name: 'Elkem Bluesil RTV 4420 通用型硅胶',
      designation: 'RTV 4420',
      categoryId: elkemCategory.id,
      description: '单组分通用型酸性固化硅胶，用于建筑密封、汽车密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: elkem4420.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: elkem4420.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 25, unit: 'Shore A' },
      { materialId: elkem4420.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 2.2, unit: 'MPa' },
      { materialId: elkem4420.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 500, unit: '%' },
      { materialId: elkem4420.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 12, unit: 'kN/m' },
      { materialId: elkem4420.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -50, maxValue: 180, unit: '°C' },
      { materialId: elkem4420.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.08, unit: 'g/cm³' },
    ],
  });

  // Elkem Bluesil LSR 4305 液体硅胶
  const elkem4305 = await prisma.material.create({
    data: {
      name: 'Elkem Bluesil LSR 4305 液体硅胶',
      designation: 'LSR 4305',
      categoryId: elkemCategory.id,
      description: '双组分快速硫化液体硅胶，用于精密零件、医疗用品。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: elkem4305.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: elkem4305.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: elkem4305.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 9, unit: 'MPa' },
      { materialId: elkem4305.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 500, unit: '%' },
      { materialId: elkem4305.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 35, unit: 'kN/m' },
      { materialId: elkem4305.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: elkem4305.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.15, unit: 'g/cm³' },
    ],
  });

  // Elkem Bluesil HTV 4550 高温硫化硅胶
  const elkem4550 = await prisma.material.create({
    data: {
      name: 'Elkem Bluesil HTV 4550 高温硫化硅胶',
      designation: 'HTV 4550',
      categoryId: elkemCategory.id,
      description: '高温硫化硅胶(HCR)，高强度，用于汽车、建筑型材。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: elkem4550.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: elkem4550.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: elkem4550.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 10, unit: 'MPa' },
      { materialId: elkem4550.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 450, unit: '%' },
      { materialId: elkem4550.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 45, unit: 'kN/m' },
      { materialId: elkem4550.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 220, unit: '°C' },
      { materialId: elkem4550.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.20, unit: 'g/cm³' },
    ],
  });

  // Elkem Bluesil TSE 384 导热硅胶
  const elkem384 = await prisma.material.create({
    data: {
      name: 'Elkem Bluesil TSE 384 导热硅胶',
      designation: 'TSE 384',
      categoryId: elkemCategory.id,
      description: '双组分高导热硅胶，用于电子散热、电源模块。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: elkem384.id, element: '聚二甲基硅氧烷', value: 70, unit: 'wt%' },
      { materialId: elkem384.id, element: '氧化铝填料', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: elkem384.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 70, unit: 'Shore A' },
      { materialId: elkem384.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 5.5, unit: 'MPa' },
      { materialId: elkem384.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 3.2, unit: 'W/(m·K)' },
      { materialId: elkem384.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: elkem384.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.10, unit: 'g/cm³' },
      { materialId: elkem384.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1e15, unit: 'Ω·cm' },
    ],
  });

  // Elkem Bluesil OR 1375 导电硅胶
  const elkem1375 = await prisma.material.create({
    data: {
      name: 'Elkem Bluesil OR 1375 导电硅胶',
      designation: 'OR 1375',
      categoryId: elkemCategory.id,
      description: '单组分导电RTV硅胶，高导电率，用于EMI屏蔽、接地。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: elkem1375.id, element: '聚二甲基硅氧烷', value: 90, unit: 'wt%' },
      { materialId: elkem1375.id, element: '银粉导电填料', value: 10, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: elkem1375.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: elkem1375.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 3.5, unit: 'MPa' },
      { materialId: elkem1375.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 200, unit: '%' },
      { materialId: elkem1375.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -50, maxValue: 180, unit: '°C' },
      { materialId: elkem1375.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.45, unit: 'g/cm³' },
      { materialId: elkem1375.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 10, unit: 'Ω·cm' },
    ],
  });

  // ===== Momentive 产品 =====

  // Momentive RTV 6307 密封硅胶
  const momentive6307 = await prisma.material.create({
    data: {
      name: 'Momentive RTV 6307 密封硅胶',
      designation: 'RTV 6307',
      categoryId: momentiveCategory.id,
      description: '单组分RTV硅胶，通用型密封硅胶，优异的耐候性。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: momentive6307.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: momentive6307.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 28, unit: 'Shore A' },
      { materialId: momentive6307.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 2.8, unit: 'MPa' },
      { materialId: momentive6307.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 450, unit: '%' },
      { materialId: momentive6307.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 18, unit: 'kN/m' },
      { materialId: momentive6307.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -55, maxValue: 200, unit: '°C' },
      { materialId: momentive6307.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.15, unit: 'g/cm³' },
    ],
  });

  // Momentive LSR 10-6325 液体硅胶
  const momentive6325 = await prisma.material.create({
    data: {
      name: 'Momentive LSR 10-6325 液体硅胶',
      designation: 'LSR 10-6325',
      categoryId: momentiveCategory.id,
      description: '双组分超快速硫化液体硅胶，适合注射成型。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: momentive6325.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: momentive6325.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 25, unit: 'Shore A' },
      { materialId: momentive6325.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 8.5, unit: 'MPa' },
      { materialId: momentive6325.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 700, unit: '%' },
      { materialId: momentive6325.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 30, unit: 'kN/m' },
      { materialId: momentive6325.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: momentive6325.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.10, unit: 'g/cm³' },
    ],
  });

  // Momentive TC-5056 导热硅胶
  const momentive5056 = await prisma.material.create({
    data: {
      name: 'Momentive TC-5056 导热硅胶',
      designation: 'TC-5056',
      categoryId: momentiveCategory.id,
      description: '双组分中高导热硅胶，用于功率器件散热。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: momentive5056.id, element: '聚二甲基硅氧烷', value: 65, unit: 'wt%' },
      { materialId: momentive5056.id, element: '氧化锌填料', value: 35, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: momentive5056.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 55, unit: 'Shore A' },
      { materialId: momentive5056.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 4.5, unit: 'MPa' },
      { materialId: momentive5056.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 5.0, unit: 'W/(m·K)' },
      { materialId: momentive5056.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: momentive5056.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.80, unit: 'g/cm³' },
      { materialId: momentive5056.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 15, unit: 'kV/mm' },
    ],
  });

  // Momentive SE 9187 L 自粘LSR
  const momentive9187 = await prisma.material.create({
    data: {
      name: 'Momentive SE 9187 L 自粘LSR',
      designation: 'SE 9187 L',
      categoryId: momentiveCategory.id,
      description: '自粘性液体硅胶，对多种基材有良好粘附性，无需底涂剂。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: momentive9187.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: momentive9187.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 40, unit: 'Shore A' },
      { materialId: momentive9187.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 7, unit: 'MPa' },
      { materialId: momentive9187.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 550, unit: '%' },
      { materialId: momentive9187.id, categoryId: mechanicalCategory.id, propertyName: '剥离强度', value: 6, unit: 'kN/m' },
      { materialId: momentive9187.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: momentive9187.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.12, unit: 'g/cm³' },
    ],
  });

  // Momentive EC-5050 导电硅胶
  const momentive5050 = await prisma.material.create({
    data: {
      name: 'Momentive EC-5050 导电硅胶',
      designation: 'EC-5050',
      categoryId: momentiveCategory.id,
      description: '双组分导电硅胶，中等导电率，用于电磁屏蔽。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: momentive5050.id, element: '聚二甲基硅氧烷', value: 92, unit: 'wt%' },
      { materialId: momentive5050.id, element: '银粉导电填料', value: 8, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: momentive5050.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 55, unit: 'Shore A' },
      { materialId: momentive5050.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 5, unit: 'MPa' },
      { materialId: momentive5050.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 250, unit: '%' },
      { materialId: momentive5050.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: momentive5050.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.35, unit: 'g/cm³' },
      { materialId: momentive5050.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 50, unit: 'Ω·cm' },
    ],
  });

  // Momentive MSE 201 高回弹硅胶
  const momentive201 = await prisma.material.create({
    data: {
      name: 'Momentive MSE 201 高回弹硅胶',
      designation: 'MSE 201',
      categoryId: momentiveCategory.id,
      description: '双组分高回弹LSR，用于运动器材、减震器。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: momentive201.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: momentive201.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 45, unit: 'Shore A' },
      { materialId: momentive201.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 9.5, unit: 'MPa' },
      { materialId: momentive201.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 600, unit: '%' },
      { materialId: momentive201.id, categoryId: mechanicalCategory.id, propertyName: '回弹率', value: 75, unit: '%' },
      { materialId: momentive201.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: momentive201.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.15, unit: 'g/cm³' },
    ],
  });

  // ===== Wacker 产品 =====

  // Wacker ELASTOSIL RT 601 密封硅胶
  const wacker601 = await prisma.material.create({
    data: {
      name: 'Wacker ELASTOSIL RT 601 密封硅胶',
      designation: 'ELASTOSIL RT 601',
      categoryId: wackerCategory.id,
      description: '单组分高品质酸性硅胶，优异的密封性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: wacker601.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: wacker601.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 22, unit: 'Shore A' },
      { materialId: wacker601.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 2.5, unit: 'MPa' },
      { materialId: wacker601.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 500, unit: '%' },
      { materialId: wacker601.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 20, unit: 'kN/m' },
      { materialId: wacker601.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -50, maxValue: 180, unit: '°C' },
      { materialId: wacker601.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.10, unit: 'g/cm³' },
    ],
  });

  // Wacker ELASTOSIL LR 3003 液体硅胶
  const wacker3003 = await prisma.material.create({
    data: {
      name: 'Wacker ELASTOSIL LR 3003 液体硅胶',
      designation: 'ELASTOSIL LR 3003',
      categoryId: wackerCategory.id,
      description: '双组分通用型LSR，优异的加工性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: wacker3003.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: wacker3003.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 30, unit: 'Shore A' },
      { materialId: wacker3003.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 8, unit: 'MPa' },
      { materialId: wacker3003.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 650, unit: '%' },
      { materialId: wacker3003.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 32, unit: 'kN/m' },
      { materialId: wacker3003.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: wacker3003.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.12, unit: 'g/cm³' },
    ],
  });

  // Wacker ELASTOSIL R 401/70 高温硫化硅胶
  const wacker401 = await prisma.material.create({
    data: {
      name: 'Wacker ELASTOSIL R 401/70 高温硫化硅胶',
      designation: 'ELASTOSIL R 401/70',
      categoryId: wackerCategory.id,
      description: '高硬度高温硫化硅胶(HCR)，用于工业密封件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: wacker401.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: wacker401.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 70, unit: 'Shore A' },
      { materialId: wacker401.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 12, unit: 'MPa' },
      { materialId: wacker401.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 250, unit: '%' },
      { materialId: wacker401.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 50, unit: 'kN/m' },
      { materialId: wacker401.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 230, unit: '°C' },
      { materialId: wacker401.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.25, unit: 'g/cm³' },
    ],
  });

  // Wacker SILGEL 612 A/B 导热凝胶
  const wacker612 = await prisma.material.create({
    data: {
      name: 'Wacker SILGEL 612 A/B 导热凝胶',
      designation: 'SILGEL 612 A/B',
      categoryId: wackerCategory.id,
      description: '双组分导热硅胶凝胶，软质，用于电池散热。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: wacker612.id, element: '聚二甲基硅氧烷', value: 90, unit: 'wt%' },
      { materialId: wacker612.id, element: '氧化铝填料', value: 10, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: wacker612.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 10, unit: 'Shore A' },
      { materialId: wacker612.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 0.8, unit: 'W/(m·K)' },
      { materialId: wacker612.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -50, maxValue: 180, unit: '°C' },
      { materialId: wacker612.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.20, unit: 'g/cm³' },
      { materialId: wacker612.id, categoryId: electricalCategory.id, propertyName: '介电常数', value: 3.0, unit: '1MHz' },
    ],
  });

  // Wacker ELASTOSIL LR 5030 低粘度LSR
  const wacker5030 = await prisma.material.create({
    data: {
      name: 'Wacker ELASTOSIL LR 5030 低粘度LSR',
      designation: 'ELASTOSIL LR 5030',
      categoryId: wackerCategory.id,
      description: '双组分超低粘度液体硅胶，适合复杂模具填充。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: wacker5030.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: wacker5030.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: wacker5030.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 9, unit: 'MPa' },
      { materialId: wacker5030.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 500, unit: '%' },
      { materialId: wacker5030.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: wacker5030.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.15, unit: 'g/cm³' },
      { materialId: wacker5030.id, categoryId: physicalCategory.id, propertyName: '粘度', value: 800000, unit: 'mPa·s' },
    ],
  });

  // Wacker SILPURAN 6000 医疗级硅胶
  const wacker6000 = await prisma.material.create({
    data: {
      name: 'Wacker SILPURAN 6000 医疗级硅胶',
      designation: 'SILPURAN 6000',
      categoryId: wackerCategory.id,
      description: '双组分医疗级LSR，符合USP Class VI和ISO 10993标准。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: wacker6000.id, element: '聚二甲基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: wacker6000.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: wacker6000.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 10, unit: 'MPa' },
      { materialId: wacker6000.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 600, unit: '%' },
      { materialId: wacker6000.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: wacker6000.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.18, unit: 'g/cm³' },
    ],
  });

  console.log('硅胶材料数据添加完成！');
  console.log('统计:');
  console.log('- Nusil Technology: 6 种');
  console.log('- Elkem BlueStar: 5 种');
  console.log('- Momentive: 6 种');
  console.log('- Wacker: 5 种');
  console.log('- 总计: 22 种硅胶材料');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
