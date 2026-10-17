import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加氟橡胶和氟硅橡胶材料数据...');

  // 获取聚合物材料类别
  const polymerCategory = await prisma.materialCategory.findFirst({
    where: { name: '聚合物材料' },
  });

  if (!polymerCategory) {
    console.error('找不到聚合物材料类别，请先运行基础 seed');
    return;
  }

  // 创建橡胶子类别
  const elastomerCategory = await prisma.materialCategory.findFirst({
    where: { name: '橡胶材料', parentId: polymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '橡胶材料',
      parentId: polymerCategory.id,
    },
  });

  const fluorocarbonCategory = await prisma.materialCategory.findFirst({
    where: { name: '氟碳弹性体', parentId: elastomerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '氟碳弹性体',
      parentId: elastomerCategory.id,
    },
  });

  const fkmCategory = await prisma.materialCategory.findFirst({
    where: { name: '氟橡胶 FKM', parentId: fluorocarbonCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '氟橡胶 FKM',
      parentId: fluorocarbonCategory.id,
    },
  });

  const fvmqCategory = await prisma.materialCategory.findFirst({
    where: { name: '氟硅橡胶 FVMQ', parentId: fluorocarbonCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '氟硅橡胶 FVMQ',
      parentId: fluorocarbonCategory.id,
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

  // ===== 氟橡胶 (FKM) =====

  // FKM A 通用型氟橡胶
  const fkma = await prisma.material.create({
    data: {
      name: 'FKM A 通用型氟橡胶',
      designation: 'Viton A',
      categoryId: fkmCategory.id,
      description: '通用型氟橡胶，平衡的耐热、耐化学品和耐油性能，广泛用于密封件、O型圈。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkma.id, element: '偏氟乙烯 VDF', value: 66, unit: 'mol%' },
      { materialId: fkma.id, element: '六氟丙烯 HFP', value: 34, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkma.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 75, unit: 'Shore A' },
      { materialId: fkma.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 14, unit: 'MPa' },
      { materialId: fkma.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 200, unit: '%' },
      { materialId: fkma.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 30, unit: '%' },
      { materialId: fkma.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -20, maxValue: 200, unit: '°C' },
      { materialId: fkma.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.82, unit: 'g/cm³' },
    ],
  });

  // FKM B 耐燃油型氟橡胶
  const fkmb = await prisma.material.create({
    data: {
      name: 'FKM B 耐燃油型氟橡胶',
      designation: 'Viton B',
      categoryId: fkmCategory.id,
      description: '耐燃油型氟橡胶，优异的耐燃油和耐溶剂性能，用于燃油系统密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmb.id, element: '偏氟乙烯 VDF', value: 68, unit: 'mol%' },
      { materialId: fkmb.id, element: '六氟丙烯 HFP', value: 32, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmb.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 75, unit: 'Shore A' },
      { materialId: fkmb.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 16, unit: 'MPa' },
      { materialId: fkmb.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 250, unit: '%' },
      { materialId: fkmb.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 25, unit: '%' },
      { materialId: fkmb.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -20, maxValue: 200, unit: '°C' },
      { materialId: fkmb.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.85, unit: 'g/cm³' },
    ],
  });

  // FKM F 耐化学型氟橡胶
  const fkmf = await prisma.material.create({
    data: {
      name: 'FKM F 耐化学型氟橡胶',
      designation: 'Viton F',
      categoryId: fkmCategory.id,
      description: '耐化学型氟橡胶，优异的耐强酸、强碱性能，用于化工密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmf.id, element: '偏氟乙烯 VDF', value: 70, unit: 'mol%' },
      { materialId: fkmf.id, element: '六氟丙烯 HFP', value: 30, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmf.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 75, unit: 'Shore A' },
      { materialId: fkmf.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 15, unit: 'MPa' },
      { materialId: fkmf.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 220, unit: '%' },
      { materialId: fkmf.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 35, unit: '%' },
      { materialId: fkmf.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -20, maxValue: 200, unit: '°C' },
      { materialId: fkmf.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.88, unit: 'g/cm³' },
    ],
  });

  // FKM GF 高温型氟橡胶
  const fkmgf = await prisma.material.create({
    data: {
      name: 'FKM GF 高温型氟橡胶',
      designation: 'Viton GF',
      categoryId: fkmCategory.id,
      description: '高温型氟橡胶，可在230°C长期使用，用于高温密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmgf.id, element: '偏氟乙烯 VDF', value: 65, unit: 'mol%' },
      { materialId: fkmgf.id, element: '六氟丙烯 HFP', value: 28, unit: 'mol%' },
      { materialId: fkmgf.id, element: '四氟乙烯 TFE', value: 7, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmgf.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 75, unit: 'Shore A' },
      { materialId: fkmgf.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 13, unit: 'MPa' },
      { materialId: fkmgf.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 180, unit: '%' },
      { materialId: fkmgf.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 40, unit: '%' },
      { materialId: fkmgf.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -20, maxValue: 230, unit: '°C' },
      { materialId: fkmgf.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.86, unit: 'g/cm³' },
    ],
  });

  // FKM G 耐低温型氟橡胶
  const fkmg = await prisma.material.create({
    data: {
      name: 'FKM G 耐低温型氟橡胶',
      designation: 'Viton G',
      categoryId: fkmCategory.id,
      description: '耐低温型氟橡胶，可在-40°C使用，用于低温密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmg.id, element: '偏氟乙烯 VDF', value: 60, unit: 'mol%' },
      { materialId: fkmg.id, element: '六氟丙烯 HFP', value: 40, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmg.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 70, unit: 'Shore A' },
      { materialId: fkmg.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 12, unit: 'MPa' },
      { materialId: fkmg.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 250, unit: '%' },
      { materialId: fkmg.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 35, unit: '%' },
      { materialId: fkmg.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -40, maxValue: 200, unit: '°C' },
      { materialId: fkmg.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.80, unit: 'g/cm³' },
    ],
  });

  // FKM ECO 三元共聚氟橡胶
  const fkmeco = await prisma.material.create({
    data: {
      name: 'FKM ECO 三元共聚氟橡胶',
      designation: 'Viton ECO',
      categoryId: fkmCategory.id,
      description: '三元共聚氟橡胶，改善低温性能和加工性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmeco.id, element: '偏氟乙烯 VDF', value: 50, unit: 'mol%' },
      { materialId: fkmeco.id, element: '六氟丙烯 HFP', value: 35, unit: 'mol%' },
      { materialId: fkmeco.id, element: '四氟乙烯 TFE', value: 15, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmeco.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 75, unit: 'Shore A' },
      { materialId: fkmeco.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 15, unit: 'MPa' },
      { materialId: fkmeco.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 280, unit: '%' },
      { materialId: fkmeco.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 30, unit: '%' },
      { materialId: fkmeco.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -30, maxValue: 200, unit: '°C' },
      { materialId: fkmeco.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.83, unit: 'g/cm³' },
    ],
  });

  // FKM Extreme 高性能氟橡胶
  const fkmextreme = await prisma.material.create({
    data: {
      name: 'FKM Extreme 高性能氟橡胶',
      designation: 'Viton Extreme',
      categoryId: fkmCategory.id,
      description: '高性能氟橡胶，超高温性能，可在250°C短期使用。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmextreme.id, element: '偏氟乙烯 VDF', value: 62, unit: 'mol%' },
      { materialId: fkmextreme.id, element: '六氟丙烯 HFP', value: 30, unit: 'mol%' },
      { materialId: fkmextreme.id, element: '四氟乙烯 TFE', value: 8, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmextreme.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 80, unit: 'Shore A' },
      { materialId: fkmextreme.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 18, unit: 'MPa' },
      { materialId: fkmextreme.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 150, unit: '%' },
      { materialId: fkmextreme.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 45, unit: '%' },
      { materialId: fkmextreme.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -25, maxValue: 250, unit: '°C' },
      { materialId: fkmextreme.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.90, unit: 'g/cm³' },
    ],
  });

  // FKM GLT 超低温型氟橡胶
  const fkmgl = await prisma.material.create({
    data: {
      name: 'FKM GLT 超低温型氟橡胶',
      designation: 'Viton GLT',
      categoryId: fkmCategory.id,
      description: '超低温型氟橡胶，可在-50°C使用，保持良好弹性。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fkmgl.id, element: '偏氟乙烯 VDF', value: 55, unit: 'mol%' },
      { materialId: fkmgl.id, element: '六氟丙烯 HFP', value: 45, unit: 'mol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fkmgl.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 65, unit: 'Shore A' },
      { materialId: fkmgl.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 10, unit: 'MPa' },
      { materialId: fkmgl.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 300, unit: '%' },
      { materialId: fkmgl.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 40, unit: '%' },
      { materialId: fkmgl.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -50, maxValue: 200, unit: '°C' },
      { materialId: fkmgl.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.78, unit: 'g/cm³' },
    ],
  });

  // ===== 氟硅橡胶 (FVMQ) =====

  // FVMQ-60 通用型氟硅橡胶
  const fvmq60 = await prisma.material.create({
    data: {
      name: 'FVMQ 通用型氟硅橡胶',
      designation: 'FVMQ-60',
      categoryId: fvmqCategory.id,
      description: '通用型氟硅橡胶，良好的耐燃油、耐溶剂性能和低温性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmq60.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmq60.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 60, unit: 'Shore A' },
      { materialId: fvmq60.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 8, unit: 'MPa' },
      { materialId: fvmq60.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 400, unit: '%' },
      { materialId: fvmq60.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 25, unit: 'kN/m' },
      { materialId: fvmq60.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: fvmq60.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.35, unit: 'g/cm³' },
    ],
  });

  // FVMQ-70H 高强度型氟硅橡胶
  const fvmq70h = await prisma.material.create({
    data: {
      name: 'FVMQ 高强度型氟硅橡胶',
      designation: 'FVMQ-70H',
      categoryId: fvmqCategory.id,
      description: '高强度型氟硅橡胶，优异的机械性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmq70h.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmq70h.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 70, unit: 'Shore A' },
      { materialId: fvmq70h.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 10, unit: 'MPa' },
      { materialId: fvmq70h.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 350, unit: '%' },
      { materialId: fvmq70h.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 35, unit: 'kN/m' },
      { materialId: fvmq70h.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: fvmq70h.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.40, unit: 'g/cm³' },
    ],
  });

  // FVMQ-50L 超低温型氟硅橡胶
  const fvmq50l = await prisma.material.create({
    data: {
      name: 'FVMQ 超低温型氟硅橡胶',
      designation: 'FVMQ-50L',
      categoryId: fvmqCategory.id,
      description: '超低温型氟硅橡胶，优异的低温性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmq50l.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmq50l.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 50, unit: 'Shore A' },
      { materialId: fvmq50l.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 6, unit: 'MPa' },
      { materialId: fvmq50l.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 500, unit: '%' },
      { materialId: fvmq50l.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 20, unit: 'kN/m' },
      { materialId: fvmq50l.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -75, maxValue: 200, unit: '°C' },
      { materialId: fvmq50l.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.32, unit: 'g/cm³' },
    ],
  });

  // FVMQ-80 高硬度型氟硅橡胶
  const fvmq80 = await prisma.material.create({
    data: {
      name: 'FVMQ 高硬度型氟硅橡胶',
      designation: 'FVMQ-80',
      categoryId: fvmqCategory.id,
      description: '高硬度型氟硅橡胶，用于高负荷密封。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmq80.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmq80.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 80, unit: 'Shore A' },
      { materialId: fvmq80.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 12, unit: 'MPa' },
      { materialId: fvmq80.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 200, unit: '%' },
      { materialId: fvmq80.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 40, unit: 'kN/m' },
      { materialId: fvmq80.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: fvmq80.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.45, unit: 'g/cm³' },
    ],
  });

  // FVMQ-LCD 低压缩永久变形型
  const fvmqlcd = await prisma.material.create({
    data: {
      name: 'FVMQ 低压缩永久变形型',
      designation: 'FVMQ-LCD',
      categoryId: fvmqCategory.id,
      description: '低压缩永久变形型氟硅橡胶，优异的密封性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmqlcd.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmqlcd.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 65, unit: 'Shore A' },
      { materialId: fvmqlcd.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 9, unit: 'MPa' },
      { materialId: fvmqlcd.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 380, unit: '%' },
      { materialId: fvmqlcd.id, categoryId: mechanicalCategory.id, propertyName: '压缩永久变形', value: 20, unit: '%' },
      { materialId: fvmqlcd.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: fvmqlcd.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.38, unit: 'g/cm³' },
    ],
  });

  // FVMQ-FS 快速硫化型
  const fvmqfs = await prisma.material.create({
    data: {
      name: 'FVMQ 快速硫化型',
      designation: 'FVMQ-FS',
      categoryId: fvmqCategory.id,
      description: '快速硫化型氟硅橡胶，提高生产效率。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmqfs.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 100, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmqfs.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 60, unit: 'Shore A' },
      { materialId: fvmqfs.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 8.5, unit: 'MPa' },
      { materialId: fvmqfs.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 420, unit: '%' },
      { materialId: fvmqfs.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', value: 28, unit: 'kN/m' },
      { materialId: fvmqfs.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: fvmqfs.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.36, unit: 'g/cm³' },
    ],
  });

  // FVMQ-EC 导电型氟硅橡胶
  const fvmqec = await prisma.material.create({
    data: {
      name: 'FVMQ 导电型氟硅橡胶',
      designation: 'FVMQ-EC',
      categoryId: fvmqCategory.id,
      description: '导电型氟硅橡胶，用于电磁屏蔽。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fvmqec.id, element: '三氟丙基甲基乙烯基硅氧烷', value: 95, unit: 'wt%' },
      { materialId: fvmqec.id, element: '导电炭黑', value: 5, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fvmqec.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 65, unit: 'Shore A' },
      { materialId: fvmqec.id, categoryId: mechanicalCategory.id, propertyName: '拉伸强度', value: 7, unit: 'MPa' },
      { materialId: fvmqec.id, categoryId: mechanicalCategory.id, propertyName: '拉断伸长率', value: 300, unit: '%' },
      { materialId: fvmqec.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: -60, maxValue: 200, unit: '°C' },
      { materialId: fvmqec.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.42, unit: 'g/cm³' },
      { materialId: fvmqec.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1000, unit: 'Ω·cm' },
    ],
  });

  console.log('氟橡胶和氟硅橡胶材料数据添加完成！');
  console.log('统计:');
  console.log('- 氟橡胶 (FKM): 8 种');
  console.log('- 氟硅橡胶 (FVMQ): 7 种');
  console.log('- 总计: 15 种弹性体材料');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
