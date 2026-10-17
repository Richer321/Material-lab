import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加医用高分子材料数据...');

  // 获取聚合物材料类别
  const polymerCategory = await prisma.materialCategory.findFirst({
    where: { name: '聚合物材料' },
  });

  if (!polymerCategory) {
    console.error('找不到聚合物材料类别，请先运行基础 seed');
    return;
  }

  // 创建医用高分子子类别
  const medicalPolymerCategory = await prisma.materialCategory.findFirst({
    where: { name: '医用高分子', parentId: polymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '医用高分子',
      parentId: polymerCategory.id,
    },
  });

  // 创建子类别
  const puCategory = await prisma.materialCategory.findFirst({
    where: { name: '医用聚氨酯', parentId: medicalPolymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '医用聚氨酯',
      parentId: medicalPolymerCategory.id,
    },
  });

  const pebaxCategory = await prisma.materialCategory.findFirst({
    where: { name: 'Pebax', parentId: medicalPolymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: 'Pebax',
      parentId: medicalPolymerCategory.id,
    },
  });

  const nylonCategory = await prisma.materialCategory.findFirst({
    where: { name: '医用尼龙', parentId: medicalPolymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '医用尼龙',
      parentId: medicalPolymerCategory.id,
    },
  });

  const peCategory = await prisma.materialCategory.findFirst({
    where: { name: '医用聚乙烯', parentId: medicalPolymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '医用聚乙烯',
      parentId: medicalPolymerCategory.id,
    },
  });

  const fluoropolymerCategory = await prisma.materialCategory.findFirst({
    where: { name: '医用氟聚合物', parentId: medicalPolymerCategory.id },
  }) || await prisma.materialCategory.create({
    data: {
      name: '医用氟聚合物',
      parentId: medicalPolymerCategory.id,
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

  // ===== 医用级聚氨酯 =====

  // 1. Tecoflex EG-80A
  const tecoflex = await prisma.material.create({
    data: {
      name: 'Tecoflex EG-80A 医用级聚氨酯',
      designation: 'Tecoflex EG-80A',
      categoryId: puCategory.id,
      description: '医用级热塑性聚氨酯弹性体，硬度80 Shore A，优异的生物相容性和血液相容性，用于医疗导管、PFA导管外层、血管导管、导尿管、医疗管材。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: tecoflex.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 80, unit: 'Shore A' },
      { materialId: tecoflex.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 35, maxValue: 40, unit: 'MPa' },
      { materialId: tecoflex.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 18, maxValue: 25, unit: 'MPa' },
      { materialId: tecoflex.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 500, maxValue: 600, unit: '%' },
      { materialId: tecoflex.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', minValue: 45, maxValue: 55, unit: 'kN/m' },
      { materialId: tecoflex.id, categoryId: mechanicalCategory.id, propertyName: '撕裂传播强度', minValue: 15, maxValue: 20, unit: 'kN/m' },
      { materialId: tecoflex.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -30, unit: '°C' },
      { materialId: tecoflex.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 180, maxValue: 190, unit: '°C' },
      { materialId: tecoflex.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.12, unit: 'g/cm³' },
      { materialId: tecoflex.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 20, unit: 'kV/mm' },
      { materialId: tecoflex.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1, unit: '×10¹² Ω·cm' },
      { materialId: tecoflex.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.5, maxValue: 0.8, unit: '%' },
    ],
  });

  // 2. Pellethane 2363-80A
  const pellethane = await prisma.material.create({
    data: {
      name: 'Pellethane 2363-80A 医用级聚氨酯',
      designation: 'Pellethane 2363-80A',
      categoryId: puCategory.id,
      description: '医用级热塑性聚氨酯弹性体，硬度80 Shore A，优异的耐磨性和生物稳定性，用于长期植入导管、PFA导管、心脏导管、血管内导管。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pellethane.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 80, unit: 'Shore A' },
      { materialId: pellethane.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 40, maxValue: 45, unit: 'MPa' },
      { materialId: pellethane.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 20, maxValue: 28, unit: 'MPa' },
      { materialId: pellethane.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 450, maxValue: 550, unit: '%' },
      { materialId: pellethane.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', minValue: 50, maxValue: 60, unit: 'kN/m' },
      { materialId: pellethane.id, categoryId: mechanicalCategory.id, propertyName: '撕裂传播强度', minValue: 18, maxValue: 25, unit: 'kN/m' },
      { materialId: pellethane.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -35, unit: '°C' },
      { materialId: pellethane.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 185, maxValue: 195, unit: '°C' },
      { materialId: pellethane.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.15, unit: 'g/cm³' },
      { materialId: pellethane.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 22, unit: 'kV/mm' },
      { materialId: pellethane.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 5, unit: '×10¹² Ω·cm' },
      { materialId: pellethane.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.4, maxValue: 0.7, unit: '%' },
    ],
  });

  // ===== Pebax材料 =====

  // 3. Pebax 5533
  const pebax5533 = await prisma.material.create({
    data: {
      name: 'Pebax 5533 医用级聚醚嵌段酰胺',
      designation: 'Pebax 5533',
      categoryId: pebaxCategory.id,
      description: '医用级聚醚嵌段酰胺，硬度55 Shore D，优异的柔韧性和生物相容性，用于PFA导管、血管介入导管、球囊导管、微导管。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 55, unit: 'Shore D' },
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 38, maxValue: 42, unit: 'MPa' },
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 280, maxValue: 350, unit: 'MPa' },
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 450, maxValue: 550, unit: '%' },
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', minValue: 140, maxValue: 180, unit: 'kN/m' },
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '弯曲模量', minValue: 200, maxValue: 280, unit: 'MPa' },
      { materialId: pebax5533.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -50, unit: '°C' },
      { materialId: pebax5533.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 155, maxValue: 165, unit: '°C' },
      { materialId: pebax5533.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.01, unit: 'g/cm³' },
      { materialId: pebax5533.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 25, unit: 'kV/mm' },
      { materialId: pebax5533.id, categoryId: mechanicalCategory.id, propertyName: '摩擦系数', value: 0.35, unit: '' },
      { materialId: pebax5533.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.8, maxValue: 1.2, unit: '%' },
    ],
  });

  // 4. Pebax 6333
  const pebax6333 = await prisma.material.create({
    data: {
      name: 'Pebax 6333 医用级聚醚嵌段酰胺',
      designation: 'Pebax 6333',
      categoryId: pebaxCategory.id,
      description: '医用级聚醚嵌段酰胺，硬度63 Shore D，更高的刚性和支撑性，用于PFA导管支撑层、导管增强层、血管鞘。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 63, unit: 'Shore D' },
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 42, maxValue: 48, unit: 'MPa' },
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 380, maxValue: 480, unit: 'MPa' },
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 400, maxValue: 500, unit: '%' },
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', minValue: 160, maxValue: 200, unit: 'kN/m' },
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '弯曲模量', minValue: 300, maxValue: 380, unit: 'MPa' },
      { materialId: pebax6333.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -45, unit: '°C' },
      { materialId: pebax6333.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 160, maxValue: 170, unit: '°C' },
      { materialId: pebax6333.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.02, unit: 'g/cm³' },
      { materialId: pebax6333.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 28, unit: 'kV/mm' },
      { materialId: pebax6333.id, categoryId: mechanicalCategory.id, propertyName: '摩擦系数', value: 0.32, unit: '' },
      { materialId: pebax6333.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.7, maxValue: 1.0, unit: '%' },
    ],
  });

  // 5. Pebax 7033
  const pebax7033 = await prisma.material.create({
    data: {
      name: 'Pebax 7033 医用级聚醚嵌段酰胺',
      designation: 'Pebax 7033',
      categoryId: pebaxCategory.id,
      description: '医用级聚醚嵌段酰胺，硬度70 Shore D，高刚性高强度，用于PFA导管外层保护层、导管支撑结构、血管支架导管。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '硬度', value: 70, unit: 'Shore D' },
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 48, maxValue: 55, unit: 'MPa' },
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 550, maxValue: 700, unit: 'MPa' },
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 350, maxValue: 450, unit: '%' },
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '撕裂强度', minValue: 180, maxValue: 220, unit: 'kN/m' },
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '弯曲模量', minValue: 450, maxValue: 550, unit: 'MPa' },
      { materialId: pebax7033.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -40, unit: '°C' },
      { materialId: pebax7033.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 165, maxValue: 175, unit: '°C' },
      { materialId: pebax7033.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.03, unit: 'g/cm³' },
      { materialId: pebax7033.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 30, unit: 'kV/mm' },
      { materialId: pebax7033.id, categoryId: mechanicalCategory.id, propertyName: '摩擦系数', value: 0.28, unit: '' },
      { materialId: pebax7033.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.6, maxValue: 0.9, unit: '%' },
    ],
  });

  // ===== 医用级尼龙 =====

  // 6. Grilamid TR-55
  const grilamid = await prisma.material.create({
    data: {
      name: 'Grilamid TR-55 医用级尼龙12',
      designation: 'Grilamid TR-55',
      categoryId: nylonCategory.id,
      description: '医用级透明尼龙12，优异的生物相容性和透明性，用于医疗导管、导管连接器、Y型连接器、医疗设备外壳。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: grilamid.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 50, maxValue: 55, unit: 'MPa' },
      { materialId: grilamid.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 1500, maxValue: 1800, unit: 'MPa' },
      { materialId: grilamid.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 150, maxValue: 200, unit: '%' },
      { materialId: grilamid.id, categoryId: mechanicalCategory.id, propertyName: '缺口冲击强度（23°C）', minValue: 8, maxValue: 12, unit: 'kJ/m²' },
      { materialId: grilamid.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: 40, unit: '°C' },
      { materialId: grilamid.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 178, maxValue: 185, unit: '°C' },
      { materialId: grilamid.id, categoryId: thermalCategory.id, propertyName: '热变形温度（1.8MPa）', minValue: 140, maxValue: 155, unit: '°C' },
      { materialId: grilamid.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.01, unit: 'g/cm³' },
      { materialId: grilamid.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 25, unit: 'kV/mm' },
      { materialId: grilamid.id, categoryId: physicalCategory.id, propertyName: '透光率', minValue: 85, maxValue: 90, unit: '%' },
      { materialId: grilamid.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.7, maxValue: 1.0, unit: '%' },
    ],
  });

  // ===== 医用级聚乙烯 =====

  // 7. GUR 2120 UHMWPE
  const gur2120 = await prisma.material.create({
    data: {
      name: 'GUR 2120 医用级超高分子量聚乙烯',
      designation: 'GUR 2120 UHMWPE',
      categoryId: peCategory.id,
      description: '医用级超高分子量聚乙烯，优异的耐磨性和生物相容性，用于人工关节、关节liner、医疗植入物。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: gur2120.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 40, maxValue: 50, unit: 'MPa' },
      { materialId: gur2120.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 800, maxValue: 1200, unit: 'MPa' },
      { materialId: gur2120.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 300, maxValue: 500, unit: '%' },
      { materialId: gur2120.id, categoryId: mechanicalCategory.id, propertyName: '缺口冲击强度（23°C）', minValue: 80, maxValue: 120, unit: 'kJ/m²' },
      { materialId: gur2120.id, categoryId: mechanicalCategory.id, propertyName: '磨损率', minValue: 1, maxValue: 3, unit: 'mm³/10⁶次' },
      { materialId: gur2120.id, categoryId: mechanicalCategory.id, propertyName: '摩擦系数', value: 0.15, unit: '' },
      { materialId: gur2120.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -120, unit: '°C' },
      { materialId: gur2120.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 135, maxValue: 145, unit: '°C' },
      { materialId: gur2120.id, categoryId: physicalCategory.id, propertyName: '密度', value: 0.93, unit: 'g/cm³' },
    ],
  });

  // 8. REXENE 2549 HDPE
  const rexene2549 = await prisma.material.create({
    data: {
      name: 'REXENE 2549 医用级高密度聚乙烯',
      designation: 'REXENE 2549 HDPE',
      categoryId: peCategory.id,
      description: '医用级高密度聚乙烯，良好加工性能和生物相容性，用于医疗容器、注射器筒、医疗包装、医疗管材。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: rexene2549.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 28, maxValue: 32, unit: 'MPa' },
      { materialId: rexene2549.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 1000, maxValue: 1400, unit: 'MPa' },
      { materialId: rexene2549.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 200, maxValue: 400, unit: '%' },
      { materialId: rexene2549.id, categoryId: mechanicalCategory.id, propertyName: '缺口冲击强度（23°C）', minValue: 5, maxValue: 10, unit: 'kJ/m²' },
      { materialId: rexene2549.id, categoryId: thermalCategory.id, propertyName: '玻璃化温度', value: -110, unit: '°C' },
      { materialId: rexene2549.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 130, maxValue: 140, unit: '°C' },
      { materialId: rexene2549.id, categoryId: physicalCategory.id, propertyName: '密度', value: 0.95, unit: 'g/cm³' },
      { materialId: rexene2549.id, categoryId: electricalCategory.id, propertyName: '介电强度', value: 25, unit: 'kV/mm' },
      { materialId: rexene2549.id, categoryId: physicalCategory.id, propertyName: '吸水率（24h）', minValue: 0.01, maxValue: 0.03, unit: '%' },
    ],
  });

  // ===== 氟聚合物 =====

  // 9. FEP
  const fep = await prisma.material.create({
    data: {
      name: 'FEP 氟化乙烯丙烯共聚物',
      designation: 'FEP-100',
      categoryId: fluoropolymerCategory.id,
      description: '氟化乙烯丙烯共聚物，优异的耐化学性和电性能，用于医疗导管绝缘层、电线电缆绝缘、PFA导管内衬。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: fep.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 20, maxValue: 25, unit: 'MPa' },
      { materialId: fep.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 500, maxValue: 700, unit: 'MPa' },
      { materialId: fep.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 250, maxValue: 350, unit: '%' },
      { materialId: fep.id, categoryId: mechanicalCategory.id, propertyName: '缺口冲击强度（23°C）', minValue: 7, maxValue: 12, unit: 'kJ/m²' },
      { materialId: fep.id, categoryId: mechanicalCategory.id, propertyName: '摩擦系数', value: 0.25, unit: '' },
      { materialId: fep.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 260, maxValue: 270, unit: '°C' },
      { materialId: fep.id, categoryId: thermalCategory.id, propertyName: '连续使用温度', value: 200, unit: '°C' },
      { materialId: fep.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.15, unit: 'g/cm³' },
      { materialId: fep.id, categoryId: electricalCategory.id, propertyName: '介电常数（1MHz）', value: 2.1, unit: '' },
      { materialId: fep.id, categoryId: electricalCategory.id, propertyName: '介电损耗（1MHz）', value: 0.0007, unit: '' },
      { materialId: fep.id, categoryId: electricalCategory.id, propertyName: '介电强度', minValue: 60, maxValue: 80, unit: 'kV/mm' },
      { materialId: fep.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1, unit: '×10¹⁸ Ω·cm' },
    ],
  });

  // 10. ETFE
  const etfe = await prisma.material.create({
    data: {
      name: 'ETFE 乙烯-四氟乙烯共聚物',
      designation: 'ETFE-100',
      categoryId: fluoropolymerCategory.id,
      description: '乙烯-四氟乙烯共聚物，优异的耐化学性、机械强度和耐辐射性，用于医疗设备外壳、辐射医疗设备、PFA导管组件。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: etfe.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 45, maxValue: 55, unit: 'MPa' },
      { materialId: etfe.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 700, maxValue: 900, unit: 'MPa' },
      { materialId: etfe.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 200, maxValue: 400, unit: '%' },
      { materialId: etfe.id, categoryId: mechanicalCategory.id, propertyName: '缺口冲击强度（23°C）', minValue: 15, maxValue: 25, unit: 'kJ/m²' },
      { materialId: etfe.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 255, maxValue: 265, unit: '°C' },
      { materialId: etfe.id, categoryId: thermalCategory.id, propertyName: '连续使用温度', value: 150, unit: '°C' },
      { materialId: etfe.id, categoryId: physicalCategory.id, propertyName: '密度', value: 1.75, unit: 'g/cm³' },
      { materialId: etfe.id, categoryId: electricalCategory.id, propertyName: '介电常数（1MHz）', value: 2.6, unit: '' },
      { materialId: etfe.id, categoryId: electricalCategory.id, propertyName: '介电损耗（1MHz）', value: 0.005, unit: '' },
      { materialId: etfe.id, categoryId: electricalCategory.id, propertyName: '介电强度', minValue: 70, maxValue: 90, unit: 'kV/mm' },
      { materialId: etfe.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1, unit: '×10¹⁶ Ω·cm' },
      { materialId: etfe.id, categoryId: physicalCategory.id, propertyName: '耐辐射性', value: 1000, unit: 'Mrad' },
    ],
  });

  // 11. PFA
  const pfa = await prisma.material.create({
    data: {
      name: 'PFA 全氟烷氧基树脂',
      designation: 'PFA-340',
      categoryId: fluoropolymerCategory.id,
      description: '全氟烷氧基树脂，优异的耐高温性、耐化学性和不粘性，用于医疗导管衬里、高温医疗设备、PFA导管内层。',
    },
  });

  await prisma.materialProperty.createMany({
    data: [
      { materialId: pfa.id, categoryId: mechanicalCategory.id, propertyName: '抗拉强度', minValue: 28, maxValue: 32, unit: 'MPa' },
      { materialId: pfa.id, categoryId: mechanicalCategory.id, propertyName: '拉伸模量', minValue: 550, maxValue: 750, unit: 'MPa' },
      { materialId: pfa.id, categoryId: mechanicalCategory.id, propertyName: '断裂伸长率', minValue: 300, maxValue: 400, unit: '%' },
      { materialId: pfa.id, categoryId: mechanicalCategory.id, propertyName: '缺口冲击强度（23°C）', minValue: 12, maxValue: 18, unit: 'kJ/m²' },
      { materialId: pfa.id, categoryId: mechanicalCategory.id, propertyName: '摩擦系数', value: 0.20, unit: '' },
      { materialId: pfa.id, categoryId: thermalCategory.id, propertyName: '熔融温度', minValue: 305, maxValue: 315, unit: '°C' },
      { materialId: pfa.id, categoryId: thermalCategory.id, propertyName: '连续使用温度', value: 260, unit: '°C' },
      { materialId: pfa.id, categoryId: physicalCategory.id, propertyName: '密度', value: 2.12, unit: 'g/cm³' },
      { materialId: pfa.id, categoryId: electricalCategory.id, propertyName: '介电常数（1MHz）', value: 2.1, unit: '' },
      { materialId: pfa.id, categoryId: electricalCategory.id, propertyName: '介电损耗（1MHz）', value: 0.0002, unit: '' },
      { materialId: pfa.id, categoryId: electricalCategory.id, propertyName: '介电强度', minValue: 60, maxValue: 80, unit: 'kV/mm' },
      { materialId: pfa.id, categoryId: electricalCategory.id, propertyName: '体积电阻率', value: 1, unit: '×10¹⁸ Ω·cm' },
    ],
  });

  console.log('医用高分子材料数据添加完成！');
  console.log('已添加 11 种医用高分子材料：');
  console.log('  - Tecoflex EG-80A, Pellethane 2363-80A (医用聚氨酯)');
  console.log('  - Pebax 5533, Pebax 6333, Pebax 7033 (聚醚嵌段酰胺)');
  console.log('  - Grilamid TR-55 (医用尼龙12)');
  console.log('  - GUR 2120 UHMWPE, REXENE 2549 HDPE (医用聚乙烯)');
  console.log('  - FEP, ETFE, PFA (医用氟聚合物)');
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
