import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加工业制造领域常用复合材料数据...');

  // 获取复合材料主类别
  const compositeCategory = await prisma.materialCategory.findFirst({
    where: { name: '复合材料' },
  });

  if (!compositeCategory) {
    console.error('找不到复合材料类别，请先运行基础 seed');
    return;
  }

  // 获取或创建子类别
  const polymerMatrixCategory = await prisma.materialCategory.findFirst({
    where: { name: '聚合物基复合材料', parentId: compositeCategory.id },
  }) || await prisma.materialCategory.create({
    data: { name: '聚合物基复合材料', parentId: compositeCategory.id },
  });

  const metalMatrixCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属基复合材料', parentId: compositeCategory.id },
  }) || await prisma.materialCategory.create({
    data: { name: '金属基复合材料', parentId: compositeCategory.id },
  });

  const ceramicMatrixCategory = await prisma.materialCategory.findFirst({
    where: { name: '陶瓷基复合材料', parentId: compositeCategory.id },
  }) || await prisma.materialCategory.create({
    data: { name: '陶瓷基复合材料', parentId: compositeCategory.id },
  });

  // 获取或创建性能类别
  const mechanicalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '机械性能' },
  }) || await prisma.propertyCategory.create({ data: { name: '机械性能' }});

  const thermalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '热性能' },
  }) || await prisma.propertyCategory.create({ data: { name: '热性能' }});

  const physicalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '物理性能' },
  }) || await prisma.propertyCategory.create({ data: { name: '物理性能' }});

  const electricalCategory = await prisma.propertyCategory.findFirst({
    where: { name: '电学性能' },
  }) || await prisma.propertyCategory.create({ data: { name: '电学性能' }});

  // ===== 玻纤增强聚合物基复合材料 =====

  // PA6+GF30 尼龙6+30%玻纤
  const pa6gf30 = await prisma.material.create({
    data: {
      name: '玻纤增强尼龙6',
      designation: 'PA6+GF30',
      categoryId: polymerMatrixCategory.id,
      description: '30%玻璃纤维增强尼龙6，高强度、高刚性、耐热，广泛用于汽车零件、电动工具外壳。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pa6gf30.id, element: 'PA6 尼龙6', value: 70, unit: 'wt%' },
      { materialId: pa6gf30.id, element: 'E-玻璃纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pa6gf30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 180, unit: 'MPa' },
      { materialId: pa6gf30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 8500, unit: 'MPa' },
      { materialId: pa6gf30.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 260, unit: 'MPa' },
      { materialId: pa6gf30.id, categoryId: mechanicalCategory.id, propertyName: '弯曲模量', value: 7500, unit: 'MPa' },
      { materialId: pa6gf30.id, categoryId: mechanicalCategory.id, propertyName: '冲击强度', value: 12, unit: 'kJ/m²' },
      { materialId: pa6gf30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.36, unit: 'g/cm³' },
      { materialId: pa6gf30.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 215, unit: '°C' },
      { materialId: pa6gf30.id, categoryId: thermalCategory.id, propertyName: '熔融温度', value: 260, unit: '°C' },
    ],
  });

  // PA66+GF35 尼龙66+35%玻纤
  const pa66gf35 = await prisma.material.create({
    data: {
      name: '玻纤增强尼龙66',
      designation: 'PA66+GF35',
      categoryId: polymerMatrixCategory.id,
      description: '35%玻璃纤维增强尼龙66，优异的机械性能和耐热性，用于齿轮、轴承、汽车零部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pa66gf35.id, element: 'PA66 尼龙66', value: 65, unit: 'wt%' },
      { materialId: pa66gf35.id, element: 'E-玻璃纤维', value: 35, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pa66gf35.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 200, unit: 'MPa' },
      { materialId: pa66gf35.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 10000, unit: 'MPa' },
      { materialId: pa66gf35.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 290, unit: 'MPa' },
      { materialId: pa66gf35.id, categoryId: mechanicalCategory.id, propertyName: '弯曲模量', value: 9000, unit: 'MPa' },
      { materialId: pa66gf35.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.38, unit: 'g/cm³' },
      { materialId: pa66gf35.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 250, unit: '°C' },
      { materialId: pa66gf35.id, categoryId: thermalCategory.id, propertyName: '熔融温度', value: 280, unit: '°C' },
    ],
  });

  // PBT+GF30 聚对苯二甲酸丁二醇酯+30%玻纤
  const pbtgf30 = await prisma.material.create({
    data: {
      name: '玻纤增强PBT',
      designation: 'PBT+GF30',
      categoryId: polymerMatrixCategory.id,
      description: '30%玻璃纤维增强PBT，优异的电性能和耐化学性，用于电子连接器、线圈骨架。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pbtgf30.id, element: 'PBT树脂', value: 70, unit: 'wt%' },
      { materialId: pbtgf30.id, element: 'E-玻璃纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pbtgf30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 140, unit: 'MPa' },
      { materialId: pbtgf30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 9000, unit: 'MPa' },
      { materialId: pbtgf30.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 200, unit: 'MPa' },
      { materialId: pbtgf30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.52, unit: 'g/cm³' },
      { materialId: pbtgf30.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 220, unit: '°C' },
      { materialId: pbtgf30.id, categoryId: electricalCategory.id, propertyName: '介电常数', value: 4.2, unit: '1MHz' },
      { materialId: pbtgf30.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1e16, unit: 'Ω·cm' },
    ],
  });

  // PP+GF40 聚丙烯+40%玻纤
  const ppgf40 = await prisma.material.create({
    data: {
      name: '玻纤增强聚丙烯',
      designation: 'PP+GF40',
      categoryId: polymerMatrixCategory.id,
      description: '40%玻璃纤维增强聚丙烯，低成本、轻量化，用于汽车保险杠、仪表板、家电外壳。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ppgf40.id, element: '聚丙烯', value: 60, unit: 'wt%' },
      { materialId: ppgf40.id, element: 'E-玻璃纤维', value: 40, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ppgf40.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 90, unit: 'MPa' },
      { materialId: ppgf40.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 7500, unit: 'MPa' },
      { materialId: ppgf40.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 140, unit: 'MPa' },
      { materialId: ppgf40.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.22, unit: 'g/cm³' },
      { materialId: ppgf40.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 155, unit: '°C' },
    ],
  });

  // PC+GF30 聚碳酸酯+30%玻纤
  const pcgf30 = await prisma.material.create({
    data: {
      name: '玻纤增强聚碳酸酯',
      designation: 'PC+GF30',
      categoryId: polymerMatrixCategory.id,
      description: '30%玻璃纤维增强聚碳酸酯，高强度、透明性降低但刚性大幅提升，用于汽车灯壳、电子外壳。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pcgf30.id, element: '聚碳酸酯', value: 70, unit: 'wt%' },
      { materialId: pcgf30.id, element: 'E-玻璃纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pcgf30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 130, unit: 'MPa' },
      { materialId: pcgf30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 8000, unit: 'MPa' },
      { materialId: pcgf30.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 190, unit: 'MPa' },
      { materialId: pcgf30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.42, unit: 'g/cm³' },
      { materialId: pcgf30.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 145, unit: '°C' },
    ],
  });

  // ABS+GF20 ABS+20%玻纤
  const absgf20 = await prisma.material.create({
    data: {
      name: '玻纤增强ABS',
      designation: 'ABS+GF20',
      categoryId: polymerMatrixCategory.id,
      description: '20%玻璃纤维增强ABS，提高刚性和耐热性，用于电脑外壳、办公设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: absgf20.id, element: 'ABS树脂', value: 80, unit: 'wt%' },
      { materialId: absgf20.id, element: 'E-玻璃纤维', value: 20, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: absgf20.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 100, unit: 'MPa' },
      { materialId: absgf20.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 6500, unit: 'MPa' },
      { materialId: absgf20.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.20, unit: 'g/cm³' },
      { materialId: absgf20.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 105, unit: '°C' },
    ],
  });

  // POM+GF25 聚甲醛+25%玻纤
  const pomgf25 = await prisma.material.create({
    data: {
      name: '玻纤增强聚甲醛',
      designation: 'POM+GF25',
      categoryId: polymerMatrixCategory.id,
      description: '25%玻璃纤维增强聚甲醛，高强度、高刚性、低摩擦，用于齿轮、轴承、滑动部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pomgf25.id, element: 'POM聚甲醛', value: 75, unit: 'wt%' },
      { materialId: pomgf25.id, element: 'E-玻璃纤维', value: 25, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pomgf25.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 140, unit: 'MPa' },
      { materialId: pomgf25.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 7500, unit: 'MPa' },
      { materialId: pomgf25.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.58, unit: 'g/cm³' },
      { materialId: pomgf25.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 160, unit: '°C' },
    ],
  });

  // FR4 玻纤/环氧层压板
  const fr4 = await prisma.material.create({
    data: {
      name: 'FR4 玻纤环氧层压板',
      designation: 'FR4',
      categoryId: polymerMatrixCategory.id,
      description: '环氧树脂玻纤布层压板，优异的电绝缘性能，是PCB电路板的主要基材。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: fr4.id, element: '环氧树脂', value: 45, unit: 'wt%' },
      { materialId: fr4.id, element: 'E-玻璃纤维布', value: 55, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fr4.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 310, unit: 'MPa' },
      { materialId: fr4.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 420, unit: 'MPa' },
      { materialId: fr4.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.85, unit: 'g/cm³' },
      { materialId: fr4.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 0.35, unit: 'W/(m·K)' },
      { materialId: fr4.id, categoryId: electricalCategory.id, propertyName: '介电常数', value: 4.5, unit: '1MHz' },
      { materialId: fr4.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 20, unit: 'kV/mm' },
      { materialId: fr4.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1e14, unit: 'Ω·cm' },
    ],
  });

  // SMA 玻纤/乙烯基复合材料
  const sma = await prisma.material.create({
    data: {
      name: '玻纤/乙烯基复合材料',
      designation: 'SMA',
      categoryId: polymerMatrixCategory.id,
      description: '乙烯基树脂玻纤复合材料，耐腐蚀、高强度，用于化工储罐、管道、防腐设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: sma.id, element: '乙烯基树脂', value: 35, unit: 'wt%' },
      { materialId: sma.id, element: 'E-玻璃纤维', value: 65, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: sma.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 280, unit: 'MPa' },
      { materialId: sma.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 380, unit: 'MPa' },
      { materialId: sma.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.75, unit: 'g/cm³' },
      { materialId: sma.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 110, unit: '°C' },
    ],
  });

  // ===== 碳纤维增强聚合物基复合材料 =====

  // PA6+CF30 尼龙6+30%碳纤
  const pa6cf30 = await prisma.material.create({
    data: {
      name: '碳纤增强尼龙6',
      designation: 'PA6+CF30',
      categoryId: polymerMatrixCategory.id,
      description: '30%碳纤维增强尼龙6，高强度、高刚性、导电，用于汽车零部件、电子散热器。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pa6cf30.id, element: 'PA6 尼龙6', value: 70, unit: 'wt%' },
      { materialId: pa6cf30.id, element: '碳纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pa6cf30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 220, unit: 'MPa' },
      { materialId: pa6cf30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 18000, unit: 'MPa' },
      { materialId: pa6cf30.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 340, unit: 'MPa' },
      { materialId: pa6cf30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.32, unit: 'g/cm³' },
      { materialId: pa6cf30.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 1.2, unit: 'W/(m·K)' },
      { materialId: pa6cf30.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1e3, unit: 'Ω·cm' },
    ],
  });

  // PEEK+CF30 聚醚醚酮+30%碳纤
  const peekcf30 = await prisma.material.create({
    data: {
      name: '碳纤增强PEEK',
      designation: 'PEEK+CF30',
      categoryId: polymerMatrixCategory.id,
      description: '30%碳纤维增强PEEK，超高性能、耐高温、耐化学，用于航空航天、医疗植入物、半导体设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: peekcf30.id, element: 'PEEK聚醚醚酮', value: 70, unit: 'wt%' },
      { materialId: peekcf30.id, element: '碳纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: peekcf30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 210, unit: 'MPa' },
      { materialId: peekcf30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 25000, unit: 'MPa' },
      { materialId: peekcf30.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 310, unit: 'MPa' },
      { materialId: peekcf30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.45, unit: 'g/cm³' },
      { materialId: peekcf30.id, categoryId: thermalCategory.id, propertyName: '熔融温度', value: 343, unit: '°C' },
      { materialId: peekcf30.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 315, unit: '°C' },
      { materialId: peekcf30.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 1.5, unit: 'W/(m·K)' },
    ],
  });

  // PPS+CF40 聚苯硫醚+40%碳纤
  const ppscf40 = await prisma.material.create({
    data: {
      name: '碳纤增强PPS',
      designation: 'PPS+CF40',
      categoryId: polymerMatrixCategory.id,
      description: '40%碳纤维增强PPS，高温性能优异、耐化学、导电，用于汽车传感器、连接器。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ppscf40.id, element: 'PPS聚苯硫醚', value: 60, unit: 'wt%' },
      { materialId: ppscf40.id, element: '碳纤维', value: 40, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ppscf40.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 200, unit: 'MPa' },
      { materialId: ppscf40.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 22000, unit: 'MPa' },
      { materialId: ppscf40.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.48, unit: 'g/cm³' },
      { materialId: ppscf40.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 260, unit: '°C' },
      { materialId: ppscf40.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 2.8, unit: 'W/(m·K)' },
    ],
  });

  // PET+CF30 聚对苯二甲酸乙二醇酯+30%碳纤
  const petcf30 = await prisma.material.create({
    data: {
      name: '碳纤增强PET',
      designation: 'PET+CF30',
      categoryId: polymerMatrixCategory.id,
      description: '30%碳纤维增强PET，高强度、耐热、导电，用于电子元件、汽车零部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: petcf30.id, element: 'PET树脂', value: 70, unit: 'wt%' },
      { materialId: petcf30.id, element: '碳纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: petcf30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 160, unit: 'MPa' },
      { materialId: petcf30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 16000, unit: 'MPa' },
      { materialId: petcf30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.38, unit: 'g/cm³' },
      { materialId: petcf30.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 225, unit: '°C' },
    ],
  });

  // PSU+CF20 聚砜+20%碳纤
  const psucf20 = await prisma.material.create({
    data: {
      name: '碳纤增强聚砜',
      designation: 'PSU+CF20',
      categoryId: polymerMatrixCategory.id,
      description: '20%碳纤维增强聚砜，高温性能优异、透明、耐化学，用于医疗设备、食品加工设备。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: psucf20.id, element: 'PSU聚砜', value: 80, unit: 'wt%' },
      { materialId: psucf20.id, element: '碳纤维', value: 20, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: psucf20.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 140, unit: 'MPa' },
      { materialId: psucf20.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 13000, unit: 'MPa' },
      { materialId: psucf20.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.38, unit: 'g/cm³' },
      { materialId: psucf20.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 185, unit: '°C' },
    ],
  });

  // ===== 芳纶纤维增强聚合物基复合材料 =====

  // PA6+KM30 尼龙6+30%芳纶
  const pa6km30 = await prisma.material.create({
    data: {
      name: '芳纶增强尼龙6',
      designation: 'PA6+KM30',
      categoryId: polymerMatrixCategory.id,
      description: '30%芳纶纤维增强尼龙6，高韧性、耐磨、抗冲击，用于齿轮、轴承、工业零件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: pa6km30.id, element: 'PA6 尼龙6', value: 70, unit: 'wt%' },
      { materialId: pa6km30.id, element: '芳纶纤维', value: 30, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pa6km30.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 150, unit: 'MPa' },
      { materialId: pa6km30.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 7500, unit: 'MPa' },
      { materialId: pa6km30.id, categoryId: mechanicalCategory.id, propertyName: '冲击强度', value: 25, unit: 'kJ/m²' },
      { materialId: pa6km30.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.20, unit: 'g/cm³' },
      { materialId: pa6km30.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 205, unit: '°C' },
    ],
  });

  // PPO+KM20 聚苯醚+20%芳纶
  const ppokm20 = await prisma.material.create({
    data: {
      name: '芳纶增强PPO',
      designation: 'PPO+KM20',
      categoryId: polymerMatrixCategory.id,
      description: '20%芳纶纤维增强PPO，高韧性、耐高温、阻燃，用于电子外壳、电器零件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ppokm20.id, element: 'PPO聚苯醚', value: 80, unit: 'wt%' },
      { materialId: ppokm20.id, element: '芳纶纤维', value: 20, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ppokm20.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 110, unit: 'MPa' },
      { materialId: ppokm20.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 6000, unit: 'MPa' },
      { materialId: ppokm20.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.18, unit: 'g/cm³' },
      { materialId: ppokm20.id, categoryId: thermalCategory.id, propertyName: '热变形温度', value: 160, unit: '°C' },
    ],
  });

  // ===== 金属基复合材料 =====

  // Cf/Mg 碳纤维增强镁基复合材料
  const cfmg = await prisma.material.create({
    data: {
      name: '碳纤维增强镁基复合材料',
      designation: 'Cf/Mg',
      categoryId: metalMatrixCategory.id,
      description: '碳纤维增强镁合金基复合材料，超轻高强，用于航空航天结构、便携设备外壳。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cfmg.id, element: 'AZ91D 镁合金', value: 75, unit: 'vol%' },
      { materialId: cfmg.id, element: 'T700 碳纤维', value: 25, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cfmg.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 450, unit: 'MPa' },
      { materialId: cfmg.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 85, unit: 'GPa' },
      { materialId: cfmg.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.82, unit: 'g/cm³' },
      { materialId: cfmg.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 8, unit: '×10⁻⁶/K' },
      { materialId: cfmg.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 85, unit: 'W/(m·K)' },
    ],
  });

  // Gr/Al 石墨颗粒增强铝基复合材料
  const gral = await prisma.material.create({
    data: {
      name: '石墨颗粒增强铝基复合材料',
      designation: 'Gr/Al',
      categoryId: metalMatrixCategory.id,
      description: '石墨颗粒增强铝基复合材料，高热导率、低热膨胀，用于电子封装、热管理材料。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: gral.id, element: '6063 铝合金', value: 70, unit: 'vol%' },
      { materialId: gral.id, element: '石墨颗粒', value: 30, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: gral.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 180, unit: 'MPa' },
      { materialId: gral.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 90, unit: 'GPa' },
      { materialId: gral.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.38, unit: 'g/cm³' },
      { materialId: gral.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 7, unit: '×10⁻⁶/K' },
      { materialId: gral.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 210, unit: 'W/(m·K)' },
    ],
  });

  // Al2O3/Al 氧化铝颗粒增强铝基复合材料
  const al2o3al = await prisma.material.create({
    data: {
      name: '氧化铝颗粒增强铝基复合材料',
      designation: 'Al2O3/Al',
      categoryId: metalMatrixCategory.id,
      description: '氧化铝颗粒增强铝基复合材料，高耐磨、高强度，用于汽车活塞、刹车部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: al2o3al.id, element: 'A356 铝合金', value: 80, unit: 'vol%' },
      { materialId: al2o3al.id, element: 'Al2O3 颗粒', value: 20, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: al2o3al.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 360, unit: 'MPa' },
      { materialId: al2o3al.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 290, unit: 'MPa' },
      { materialId: al2o3al.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 95, unit: 'GPa' },
      { materialId: al2o3al.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.82, unit: 'g/cm³' },
      { materialId: al2o3al.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 170, unit: 'W/(m·K)' },
    ],
  });

  // Kevlar/Al 芳纶纤维增强铝基复合材料
  const kevlaral = await prisma.material.create({
    data: {
      name: '芳纶纤维增强铝基复合材料',
      designation: 'Kevlar/Al',
      categoryId: metalMatrixCategory.id,
      description: '芳纶纤维增强铝基复合材料，高韧性、抗冲击，用于防弹装甲、航空航天结构。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: kevlaral.id, element: '5052 铝合金', value: 75, unit: 'vol%' },
      { materialId: kevlaral.id, element: 'Kevlar-49 芳纶纤维', value: 25, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: kevlaral.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 580, unit: 'MPa' },
      { materialId: kevlaral.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 75, unit: 'GPa' },
      { materialId: kevlaral.id, categoryId: mechanicalCategory.id, propertyName: '冲击强度', value: 150, unit: 'kJ/m²' },
      { materialId: kevlaral.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.15, unit: 'g/cm³' },
    ],
  });

  // Cf/Cu 碳纤维增强铜基复合材料
  const cfcu = await prisma.material.create({
    data: {
      name: '碳纤维增强铜基复合材料',
      designation: 'Cf/Cu',
      categoryId: metalMatrixCategory.id,
      description: '碳纤维增强铜基复合材料，高热导率、低热膨胀，用于电力电子散热器、电接触材料。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cfcu.id, element: '纯铜', value: 70, unit: 'vol%' },
      { materialId: cfcu.id, element: 'M55J 碳纤维', value: 30, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cfcu.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 420, unit: 'MPa' },
      { materialId: cfcu.id, categoryId: physicalCategory.id, propertyName: '密度', value: 6.25, unit: 'g/cm³' },
      { materialId: cfcu.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 6, unit: '×10⁻⁶/K' },
      { materialId: cfcu.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 320, unit: 'W/(m·K)' },
      { materialId: cfcu.id, categoryId: electricalCategory.id, propertyName: '电导率', value: 65, unit: '%IACS' },
    ],
  });

  // SiCw/Mg 碳化硅晶须增强镁基复合材料
  const sicwmg = await prisma.material.create({
    data: {
      name: '碳化硅晶须增强镁基复合材料',
      designation: 'SiCw/Mg',
      categoryId: metalMatrixCategory.id,
      description: 'SiC晶须增强镁基复合材料，超高强度、高模量，用于高性能航空航天结构。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: sicwmg.id, element: 'ZK60 镁合金', value: 85, unit: 'vol%' },
      { materialId: sicwmg.id, element: 'SiC 晶须', value: 15, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: sicwmg.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 520, unit: 'MPa' },
      { materialId: sicwmg.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 80, unit: 'GPa' },
      { materialId: sicwmg.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', value: 3.5, unit: '%' },
      { materialId: sicwmg.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.92, unit: 'g/cm³' },
      { materialId: sicwmg.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 95, unit: 'W/(m·K)' },
    ],
  });

  // ===== 陶瓷基复合材料 =====

  // Cf/SiC 碳纤维增强碳化硅复合材料
  const cfsic = await prisma.material.create({
    data: {
      name: '碳纤维增强碳化硅复合材料',
      designation: 'Cf/SiC',
      categoryId: ceramicMatrixCategory.id,
      description: '碳纤维增强SiC陶瓷基复合材料，高温性能优异、抗热震，用于航空发动机、燃烧室衬里。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cfsic.id, element: 'SiC 陶瓷基体', value: 60, unit: 'vol%' },
      { materialId: cfsic.id, element: 'T700 碳纤维', value: 40, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cfsic.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 350, unit: 'MPa' },
      { materialId: cfsic.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 230, unit: 'GPa' },
      { materialId: cfsic.id, categoryId: thermalCategory.id, propertyName: '使用温度', value: 1200, unit: '°C' },
      { materialId: cfsic.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.55, unit: 'g/cm³' },
      { materialId: cfsic.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 2.5, unit: '×10⁻⁶/K' },
      { materialId: cfsic.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 35, unit: 'W/(m·K)' },
    ],
  });

  // C/C-SiC 碳/碳-碳化硅多基体复合材料
  const ccsic = await prisma.material.create({
    data: {
      name: '碳/碳-碳化硅多基体复合材料',
      designation: 'C/C-SiC',
      categoryId: ceramicMatrixCategory.id,
      description: 'C/C-SiC多基体复合材料，超高温、抗氧化、耐烧蚀，用于火箭喷管、航天器热防护。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: ccsic.id, element: '碳纤维', value: 35, unit: 'vol%' },
      { materialId: ccsic.id, element: '碳基体', value: 30, unit: 'vol%' },
      { materialId: ccsic.id, element: 'SiC 陶瓷', value: 35, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: ccsic.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 240, unit: 'MPa' },
      { materialId: ccsic.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 85, unit: 'GPa' },
      { materialId: ccsic.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: 1650, unit: '°C' },
      { materialId: ccsic.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.05, unit: 'g/cm³' },
      { materialId: ccsic.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 2.0, unit: '×10⁻⁶/K' },
    ],
  });

  // Al2O3/Al2O3 氧化铝纤维增强氧化铝复合材料
  const al2o3al2o3 = await prisma.material.create({
    data: {
      name: '氧化铝纤维增强氧化铝复合材料',
      designation: 'Al2O3/Al2O3',
      categoryId: ceramicMatrixCategory.id,
      description: '氧化铝纤维增强氧化铝陶瓷基复合材料，高温、绝缘、耐腐蚀，用于高温绝缘、催化剂载体。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: al2o3al2o3.id, element: 'Al2O3 基体', value: 70, unit: 'vol%' },
      { materialId: al2o3al2o3.id, element: 'Al2O3 纤维', value: 30, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: al2o3al2o3.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 280, unit: 'MPa' },
      { materialId: al2o3al2o3.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 180, unit: 'GPa' },
      { materialId: al2o3al2o3.id, categoryId: thermalCategory.id, propertyName: '使用温度', value: 1100, unit: '°C' },
      { materialId: al2o3al2o3.id, categoryId: physicalCategory.id, propertyName: '密度', value: 3.75, unit: 'g/cm³' },
      { materialId: al2o3al2o3.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 7.5, unit: '×10⁻⁶/K' },
      { materialId: al2o3al2o3.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1e14, unit: 'Ω·cm' },
    ],
  });

  // ZrO2/SiC 氧化锆增韧碳化硅复合材料
  const zro2sic = await prisma.material.create({
    data: {
      name: '氧化锆增韧碳化硅复合材料',
      designation: 'ZrO2/SiC',
      categoryId: ceramicMatrixCategory.id,
      description: '氧化锆颗粒增韧SiC陶瓷复合材料，高韧性、耐磨，用于机械密封、耐磨衬里。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: zro2sic.id, element: 'SiC 基体', value: 85, unit: 'vol%' },
      { materialId: zro2sic.id, element: 'ZrO2 颗粒', value: 15, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: zro2sic.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 450, unit: 'MPa' },
      { materialId: zro2sic.id, categoryId: mechanicalCategory.id, propertyName: '断裂韧性', value: 7.5, unit: 'MPa·m½' },
      { materialId: zro2sic.id, categoryId: physicalCategory.id, propertyName: '密度', value: 3.25, unit: 'g/cm³' },
      { materialId: zro2sic.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 4.5, unit: '×10⁻⁶/K' },
    ],
  });

  // Si3N4/SiC 氮化硅增强碳化硅复合材料
  const si3n4sic = await prisma.material.create({
    data: {
      name: '氮化硅增强碳化硅复合材料',
      designation: 'Si3N4/SiC',
      categoryId: ceramicMatrixCategory.id,
      description: '氮化硅晶须增强SiC复合材料，高强度、高韧性，用于高温结构部件、涡轮叶片。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: si3n4sic.id, element: 'SiC 基体', value: 80, unit: 'vol%' },
      { materialId: si3n4sic.id, element: 'Si3N4 晶须', value: 20, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: si3n4sic.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 550, unit: 'MPa' },
      { materialId: si3n4sic.id, categoryId: mechanicalCategory.id, propertyName: '断裂韧性', value: 8.5, unit: 'MPa·m½' },
      { materialId: si3n4sic.id, categoryId: thermalCategory.id, propertyName: '使用温度', value: 1400, unit: '°C' },
      { materialId: si3n4sic.id, categoryId: physicalCategory.id, propertyName: '密度', value: 3.15, unit: 'g/cm³' },
      { materialId: si3n4sic.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 4.2, unit: '×10⁻⁶/K' },
    ],
  });

  console.log('工业制造领域常用复合材料数据添加完成！');
  console.log('统计:');
  console.log('- 玻纤增强聚合物基复合材料: 9 种');
  console.log('- 碳纤增强聚合物基复合材料: 5 种');
  console.log('- 芳纶增强聚合物基复合材料: 2 种');
  console.log('- 金属基复合材料: 6 种');
  console.log('- 陶瓷基复合材料: 5 种');
  console.log('- 总计: 27 种复合材料');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
