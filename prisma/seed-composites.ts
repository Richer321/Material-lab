import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加复合材料数据...');

  // 获取或创建复合材料主类别
  const compositeCategory = await prisma.materialCategory.findFirst({
    where: { name: '复合材料' },
  }) || await prisma.materialCategory.create({
    data: {
      name: '复合材料',
    },
  });

  // 创建或获取子类别
  const polymerMatrixCategory = await prisma.materialCategory.findFirst({
    where: { name: '聚合物基复合材料', parentId: compositeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '聚合物基复合材料',
      parentId: compositeCategory.id,
    },
  });

  const metalMatrixCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属基复合材料', parentId: compositeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '金属基复合材料',
      parentId: compositeCategory.id,
    },
  });

  const ceramicMatrixCategory = await prisma.materialCategory.findFirst({
    where: { name: '陶瓷基复合材料', parentId: compositeCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '陶瓷基复合材料',
      parentId: compositeCategory.id,
    },
  });

  const cfrpCategory = await prisma.materialCategory.findFirst({
    where: { name: '碳纤维增强复合材料', parentId: polymerMatrixCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '碳纤维增强复合材料',
      parentId: polymerMatrixCategory.id,
    },
  });

  const gfrpCategory = await prisma.materialCategory.findFirst({
    where: { name: '玻璃纤维增强复合材料', parentId: polymerMatrixCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '玻璃纤维增强复合材料',
      parentId: polymerMatrixCategory.id,
    },
  });

  const aramidCategory = await prisma.materialCategory.findFirst({
    where: { name: '芳纶纤维复合材料', parentId: polymerMatrixCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '芳纶纤维复合材料',
      parentId: polymerMatrixCategory.id,
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

  // ===== 碳纤维增强复合材料 (CFRP) =====

  // T700/EP 单向碳纤维复合材料
  const t700ep = await prisma.material.create({
    data: {
      name: '碳纤维/环氧树脂复合材料 (单向)',
      designation: 'T700/EP',
      categoryId: cfrpCategory.id,
      description: 'T700碳纤维增强环氧树脂单向复合材料，高强度、高模量，广泛用于航空航天、汽车工业。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: t700ep.id, element: '碳纤维 T700', value: 60, unit: 'vol%' },
      { materialId: t700ep.id, element: '环氧树脂', value: 40, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: t700ep.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 2100, unit: 'MPa' },
      { materialId: t700ep.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 130, unit: 'GPa' },
      { materialId: t700ep.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 1200, unit: 'MPa' },
      { materialId: t700ep.id, categoryId: mechanicalCategory.id, propertyName: '剪切强度', value: 70, unit: 'MPa' },
      { materialId: t700ep.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.58, unit: 'g/cm³' },
      { materialId: t700ep.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 0.5, unit: '×10⁻⁶/K' },
      { materialId: t700ep.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 5, unit: 'W/(m·K)' },
    ],
  });

  // G803/EP 织物碳纤维复合材料
  const g803ep = await prisma.material.create({
    data: {
      name: '碳纤维/环氧树脂复合材料 (织物)',
      designation: 'G803/EP',
      categoryId: cfrpCategory.id,
      description: 'G803碳纤维织物增强环氧树脂复合材料，各向性能均衡，适用于多向受力结构件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: g803ep.id, element: '碳纤维织物 G803', value: 55, unit: 'vol%' },
      { materialId: g803ep.id, element: '环氧树脂', value: 45, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: g803ep.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 650, unit: 'MPa' },
      { materialId: g803ep.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 60, unit: 'GPa' },
      { materialId: g803ep.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 550, unit: 'MPa' },
      { materialId: g803ep.id, categoryId: mechanicalCategory.id, propertyName: '剪切强度', value: 35, unit: 'MPa' },
      { materialId: g803ep.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.55, unit: 'g/cm³' },
      { materialId: g803ep.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 2.5, unit: '×10⁻⁶/K' },
      { materialId: g803ep.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 3, unit: 'W/(m·K)' },
    ],
  });

  // IM7/EP 中模量碳纤维复合材料
  const im7ep = await prisma.material.create({
    data: {
      name: '中模量碳纤维/环氧树脂复合材料',
      designation: 'IM7/EP',
      categoryId: cfrpCategory.id,
      description: 'IM7中模量碳纤维增强环氧树脂复合材料，优异的拉伸性能和抗疲劳性能，用于主承力结构。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: im7ep.id, element: 'IM7 碳纤维', value: 62, unit: 'vol%' },
      { materialId: im7ep.id, element: '环氧树脂', value: 38, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: im7ep.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 2800, unit: 'MPa' },
      { materialId: im7ep.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 165, unit: 'GPa' },
      { materialId: im7ep.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 1500, unit: 'MPa' },
      { materialId: im7ep.id, categoryId: mechanicalCategory.id, propertyName: '剪切强度', value: 85, unit: 'MPa' },
      { materialId: im7ep.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.6, unit: 'g/cm³' },
      { materialId: im7ep.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 0.3, unit: '×10⁻⁶/K' },
    ],
  });

  // ===== 玻璃纤维增强复合材料 (GFRP) =====

  // E-玻璃纤维/聚酯复合材料
  const eglassup = await prisma.material.create({
    data: {
      name: 'E-玻璃纤维/聚酯复合材料',
      designation: 'E-Glass/UP',
      categoryId: gfrpCategory.id,
      description: 'E-玻璃纤维增强不饱和聚酯树脂复合材料，低成本，广泛应用于建筑、船舶、储罐等。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: eglassup.id, element: 'E-玻璃纤维', value: 45, unit: 'vol%' },
      { materialId: eglassup.id, element: '不饱和聚酯树脂', value: 55, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: eglassup.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 350, unit: 'MPa' },
      { materialId: eglassup.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 22, unit: 'GPa' },
      { materialId: eglassup.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 280, unit: 'MPa' },
      { materialId: eglassup.id, categoryId: mechanicalCategory.id, propertyName: '弯曲强度', value: 400, unit: 'MPa' },
      { materialId: eglassup.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.85, unit: 'g/cm³' },
      { materialId: eglassup.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 15, unit: '×10⁻⁶/K' },
      { materialId: eglassup.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 0.3, unit: 'W/(m·K)' },
    ],
  });

  // S-玻璃纤维/环氧树脂复合材料
  const sglass = await prisma.material.create({
    data: {
      name: 'S-玻璃纤维/环氧树脂复合材料',
      designation: 'S-Glass/EP',
      categoryId: gfrpCategory.id,
      description: 'S-高强玻璃纤维增强环氧树脂复合材料，高强度，用于高性能结构件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: sglass.id, element: 'S-玻璃纤维', value: 55, unit: 'vol%' },
      { materialId: sglass.id, element: '环氧树脂', value: 45, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: sglass.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 1200, unit: 'MPa' },
      { materialId: sglass.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 45, unit: 'GPa' },
      { materialId: sglass.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 800, unit: 'MPa' },
      { materialId: sglass.id, categoryId: mechanicalCategory.id, propertyName: '冲击强度', value: 250, unit: 'kJ/m²' },
      { materialId: sglass.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.95, unit: 'g/cm³' },
      { materialId: sglass.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 8, unit: '×10⁻⁶/K' },
    ],
  });

  // ===== 芳纶纤维复合材料 =====

  // K49/EP 芳纶纤维复合材料
  const k49ep = await prisma.material.create({
    data: {
      name: '芳纶纤维/环氧树脂复合材料',
      designation: 'K49/EP',
      categoryId: aramidCategory.id,
      description: 'Kevlar-49芳纶纤维增强环氧树脂复合材料，高韧性、低密度，优异的抗冲击性能。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: k49ep.id, element: 'Kevlar-49 芳纶纤维', value: 60, unit: 'vol%' },
      { materialId: k49ep.id, element: '环氧树脂', value: 40, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: k49ep.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 1450, unit: 'MPa' },
      { materialId: k49ep.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 75, unit: 'GPa' },
      { materialId: k49ep.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 280, unit: 'MPa' },
      { materialId: k49ep.id, categoryId: mechanicalCategory.id, propertyName: '冲击强度', value: 300, unit: 'kJ/m²' },
      { materialId: k49ep.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.38, unit: 'g/cm³' },
      { materialId: k49ep.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: -2, unit: '×10⁻⁶/K' },
      { materialId: k49ep.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 0.8, unit: 'W/(m·K)' },
    ],
  });

  // ===== 金属基复合材料 =====

  // SiCp/Al 碳化硅颗粒增强铝基复合材料
  const sicpal = await prisma.material.create({
    data: {
      name: '碳化硅颗粒增强铝基复合材料',
      designation: 'SiCp/Al (15% vol)',
      categoryId: metalMatrixCategory.id,
      description: 'SiC颗粒增强6061铝合金基复合材料，高比强度、高模量，用于航空、汽车结构件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: sicpal.id, element: 'SiC 颗粒', value: 15, unit: 'vol%' },
      { materialId: sicpal.id, element: '6061 铝合金', value: 85, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: sicpal.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 380, unit: 'MPa' },
      { materialId: sicpal.id, categoryId: mechanicalCategory.id, propertyName: '屈服强度', value: 330, unit: 'MPa' },
      { materialId: sicpal.id, categoryId: mechanicalCategory.id, propertyName: '弹性模量', value: 95, unit: 'GPa' },
      { materialId: sicpal.id, categoryId: mechanicalCategory.id, propertyName: '延伸率', value: 4.5, unit: '%' },
      { materialId: sicpal.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.85, unit: 'g/cm³' },
      { materialId: sicpal.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 14, unit: '×10⁻⁶/K' },
      { materialId: sicpal.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 180, unit: 'W/(m·K)' },
    ],
  });

  // Cf/Al 碳纤维增强铝基复合材料
  const cfal = await prisma.material.create({
    data: {
      name: '碳纤维增强铝基复合材料',
      designation: 'Cf/Al',
      categoryId: metalMatrixCategory.id,
      description: 'P120石墨纤维增强纯铝基复合材料，超高比刚度，用于精密仪器、卫星结构。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cfal.id, element: 'P120 石墨纤维', value: 45, unit: 'vol%' },
      { materialId: cfal.id, element: '纯铝', value: 55, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cfal.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 720, unit: 'MPa' },
      { materialId: cfal.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 280, unit: 'GPa' },
      { materialId: cfal.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.4, unit: 'g/cm³' },
      { materialId: cfal.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 0.5, unit: '×10⁻⁶/K' },
      { materialId: cfal.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 220, unit: 'W/(m·K)' },
    ],
  });

  // B/Al 硼纤维增强铝基复合材料
  const bal = await prisma.material.create({
    data: {
      name: '硼纤维增强铝基复合材料',
      designation: 'B/Al',
      categoryId: metalMatrixCategory.id,
      description: '硼纤维增强6061铝合金基复合材料，高强度、高模量，用于航空结构。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: bal.id, element: '硼纤维', value: 50, unit: 'vol%' },
      { materialId: bal.id, element: '6061 铝合金', value: 50, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: bal.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 1400, unit: 'MPa' },
      { materialId: bal.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 220, unit: 'GPa' },
      { materialId: bal.id, categoryId: mechanicalCategory.id, propertyName: '压缩强度', value: 1800, unit: 'MPa' },
      { materialId: bal.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.65, unit: 'g/cm³' },
    ],
  });

  // ===== 陶瓷基复合材料 =====

  // C/C 碳/碳复合材料
  const cc = await prisma.material.create({
    data: {
      name: '碳/碳复合材料',
      designation: 'C/C',
      categoryId: ceramicMatrixCategory.id,
      description: '碳纤维增强碳基复合材料，超高温结构材料，用于刹车片、火箭喷管等高温部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: cc.id, element: '碳纤维', value: 45, unit: 'wt%' },
      { materialId: cc.id, element: '碳基体', value: 55, unit: 'wt%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: cc.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 180, unit: 'MPa' },
      { materialId: cc.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 60, unit: 'GPa' },
      { materialId: cc.id, categoryId: thermalCategory.id, propertyName: '使用温度', minValue: 2000, unit: '°C' },
      { materialId: cc.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.75, unit: 'g/cm³' },
      { materialId: cc.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 1.5, unit: '×10⁻⁶/K' },
      { materialId: cc.id, categoryId: thermalCategory.id, propertyName: '热导率', value: 80, unit: 'W/(m·K)' },
    ],
  });

  // SiC/SiC 碳化硅/碳化硅复合材料
  const sicsic = await prisma.material.create({
    data: {
      name: '碳化硅/碳化硅复合材料',
      designation: 'SiC/SiC',
      categoryId: ceramicMatrixCategory.id,
      description: 'SiC纤维增强SiC陶瓷基复合材料，高温抗氧化，用于航空发动机部件。',
    },
  });

  await prisma.materialComposition.createMany({
    data: [
      { materialId: sicsic.id, element: 'SiC 纤维', value: 35, unit: 'vol%' },
      { materialId: sicsic.id, element: 'SiC 陶瓷基体', value: 65, unit: 'vol%' },
    ],
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: sicsic.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', value: 320, unit: 'MPa' },
      { materialId: sicsic.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', value: 230, unit: 'GPa' },
      { materialId: sicsic.id, categoryId: thermalCategory.id, propertyName: '使用温度', value: 1200, unit: '°C' },
      { materialId: sicsic.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.8, unit: 'g/cm³' },
      { materialId: sicsic.id, categoryId: thermalCategory.id, propertyName: '热膨胀系数', value: 3.5, unit: '×10⁻⁶/K' },
    ],
  });

  console.log('复合材料数据添加完成！');
  console.log('统计:');
  console.log('- 聚合物基复合材料: 5 种');
  console.log('- 金属基复合材料: 3 种');
  console.log('- 陶瓷基复合材料: 2 种');
  console.log('- 总计: 11 种复合材料');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
