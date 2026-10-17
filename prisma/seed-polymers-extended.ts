import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展其他高分子材料...');

  // 获取聚合物材料类别
  let polymersCategory = await prisma.materialCategory.findFirst({
    where: { name: '聚合物材料' },
  });

  if (!polymersCategory) {
    throw new Error('找不到聚合物材料类别');
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

  // 其他高分子材料数据
  const otherPolymers = [
    {
      name: 'NR 天然橡胶',
      designation: 'NR-SMR20',
      description: '天然橡胶，具有优异弹性、良好耐磨损性、高拉伸强度，用于轮胎、胶管、胶带、减震器',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 20, maxValue: 30, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1, maxValue: 3, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 500, maxValue: 700, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 30, maxValue: 50, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 60, unit: 'A' },
        { categoryName: '机械', propertyName: '回弹弹性', value: 75, unit: '%' },
        { categoryName: '热', propertyName: '玻璃化温度', value: -72, unit: '°C' },
        { categoryName: '热', propertyName: '脆性温度', minValue: -55, maxValue: -60, unit: '°C' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -50, maxValue: 80, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 0.93, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1kHz)', value: 3.0, unit: '' },
      ],
      compositions: [
        { element: '天然橡胶 (聚异戊二烯)', minValue: 95, maxValue: 99, unit: '%' },
      ],
    },
    {
      name: 'SBR 丁苯橡胶',
      designation: 'SBR-1502',
      description: '丁苯橡胶，具有良好耐磨性、耐老化性、较低成本，用于轮胎、鞋底、传送带、橡胶制品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 15, maxValue: 25, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2, maxValue: 4, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 400, maxValue: 600, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 20, maxValue: 35, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 65, unit: 'A' },
        { categoryName: '机械', propertyName: '回弹弹性', value: 60, unit: '%' },
        { categoryName: '热', propertyName: '玻璃化温度', value: -55, unit: '°C' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -40, maxValue: 100, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 0.94, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '耐磨', propertyName: '耐磨性', value: 0, unit: '良好' },
      ],
      compositions: [
        { element: '苯乙烯', minValue: 22, maxValue: 25, unit: '%' },
        { element: '丁二烯', minValue: 75, maxValue: 78, unit: '%' },
      ],
    },
    {
      name: 'NBR 丁腈橡胶',
      designation: 'NBR-N41',
      description: '丁腈橡胶（中丙烯腈含量），具有优异耐油性、良好耐热性，用于油封、O型圈、胶管、耐油制品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 18, maxValue: 28, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3, maxValue: 6, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 400, maxValue: 600, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 25, maxValue: 40, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 70, unit: 'A' },
        { categoryName: '热', propertyName: '玻璃化温度', value: -35, unit: '°C' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -30, maxValue: 120, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 0.98, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐油性', value: 0, unit: '优异' },
        { categoryName: '化学', propertyName: '耐溶剂性', value: 0, unit: '良好' },
      ],
      compositions: [
        { element: '丙烯腈', minValue: 38, maxValue: 42, unit: '%' },
        { element: '丁二烯', minValue: 58, maxValue: 62, unit: '%' },
      ],
    },
    {
      name: 'EPDM 三元乙丙橡胶',
      designation: 'EPDM-EP101',
      description: '三元乙丙橡胶，具有优异耐候性、耐臭氧性、良好耐热性，用于密封条、雨刮器、建筑密封、电线电缆',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 12, maxValue: 20, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2, maxValue: 5, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 300, maxValue: 500, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 15, maxValue: 30, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 65, unit: 'A' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -50, maxValue: 150, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 0.86, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐候性', value: 0, unit: '优异' },
        { categoryName: '化学', propertyName: '耐臭氧性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: '乙烯', minValue: 55, maxValue: 65, unit: '%' },
        { element: '丙烯', minValue: 30, maxValue: 40, unit: '%' },
        { element: '二烯单体 (ENB)', minValue: 3, maxValue: 8, unit: '%' },
      ],
    },
    {
      name: 'VMQ 硅橡胶',
      designation: 'VMQ-HCR',
      description: '高温硫化硅橡胶，具有优异耐高温性、良好电性能、生物相容性，用于密封件、医疗器材、电线电缆、婴儿用品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 8, maxValue: 12, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2, maxValue: 5, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 500, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 10, maxValue: 25, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 50, unit: 'A' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -60, maxValue: 230, unit: '°C' },
        { categoryName: '热', propertyName: '长期耐温', value: 200, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.15, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电强度', value: 20, unit: 'kV/mm' },
        { categoryName: '生物', propertyName: '生物相容性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: '聚二甲基硅氧烷', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'FKM 氟橡胶',
      designation: 'FKM-Viton',
      description: '氟橡胶（Viton类型），具有优异耐高温、耐化学性、耐油性，用于高温密封件、化工设备、汽车发动机部件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 15, maxValue: 22, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 5, maxValue: 10, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 150, maxValue: 300, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 15, maxValue: 30, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 75, unit: 'A' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -20, maxValue: 250, unit: '°C' },
        { categoryName: '热', propertyName: '长期耐温', value: 200, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.82, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐油性', value: 0, unit: '优异' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: '偏氟乙烯', minValue: 65, maxValue: 70, unit: '%' },
        { element: '六氟丙烯', minValue: 30, maxValue: 35, unit: '%' },
      ],
    },
    {
      name: 'TPU 热塑性聚氨酯弹性体',
      designation: 'TPU-Polyester',
      description: '聚酯型TPU，具有优异弹性、良好耐磨性、耐油性，用于鞋底、输送带、密封件、手机保护套',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 35, maxValue: 50, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 20, maxValue: 50, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 400, maxValue: 600, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 50, maxValue: 80, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 85, unit: 'A' },
        { categoryName: '机械', propertyName: '耐磨性', value: 0, unit: '优异' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -30, maxValue: 80, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 180, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.20, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐油性', value: 0, unit: '良好' },
      ],
      compositions: [
        { element: '聚酯多元醇', minValue: 60, maxValue: 70, unit: '%' },
        { element: '二异氰酸酯', minValue: 25, maxValue: 35, unit: '%' },
        { element: '扩链剂', minValue: 3, maxValue: 8, unit: '%' },
      ],
    },
    {
      name: 'TPE 热塑性弹性体',
      designation: 'TPE-SBS',
      description: 'SBS基热塑性弹性体，具有良好弹性、易加工、可回收，用于文具、手柄、玩具、密封件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 8, maxValue: 15, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 5, maxValue: 15, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 500, maxValue: 900, unit: '%' },
        { categoryName: '机械', propertyName: '撕裂强度', minValue: 20, maxValue: 40, unit: 'kN/m' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 70, unit: 'A' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -40, maxValue: 70, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 85, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 0.91, unit: 'g/cm³' },
        { categoryName: '加工', propertyName: '加工方式', value: 0, unit: '注塑、挤出' },
      ],
      compositions: [
        { element: '苯乙烯-丁二烯-苯乙烯嵌段共聚物', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PFA 全氟烷氧基树脂',
      designation: 'PFA-Teflon',
      description: 'PFA氟塑料，具有优异耐化学性、耐高温性、良好电性能，可熔融加工，用于半导体设备、衬里、管道',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 25, maxValue: 32, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 500, maxValue: 700, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 250, maxValue: 350, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 65, unit: 'D' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -200, maxValue: 260, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 305, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 2.15, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E18, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.1, unit: '' },
        { categoryName: '电', propertyName: '介电损耗 (1MHz)', value: 0.0002, unit: '' },
      ],
      compositions: [
        { element: '全氟烷氧基共聚物', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'ETFE 乙烯-四氟乙烯共聚物',
      designation: 'ETFE-Tefzel',
      description: 'ETFE氟塑料，具有优异耐化学性、良好机械强度、耐候性，用于建筑膜材、电线电缆、衬里',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 40, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 800, maxValue: 1000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 400, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 5, maxValue: 15, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 75, unit: 'D' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -200, maxValue: 150, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 260, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.75, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.6, unit: '' },
      ],
      compositions: [
        { element: '乙烯-四氟乙烯共聚物', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PVDF 聚偏氟乙烯',
      designation: 'PVDF-Kynar',
      description: 'PVDF氟塑料，具有良好耐化学性、高纯度、优异压电性，用于化工设备、太阳能背板、压电传感器',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 40, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1000, maxValue: 1500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 50, maxValue: 300, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 3, maxValue: 8, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 78, unit: 'D' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -40, maxValue: 150, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 170, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.78, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '良好' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 8.5, unit: '' },
        { categoryName: '功能', propertyName: '压电性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: '聚偏氟乙烯', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PLA 聚乳酸',
      designation: 'PLA-Ingeo',
      description: '生物降解PLA，具有良好生物相容性、可降解性、易加工，用于3D打印、包装材料、医疗器械',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 50, maxValue: 70, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3000, maxValue: 4000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 4, maxValue: 10, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 90, maxValue: 120, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 2, maxValue: 4, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 50, maxValue: 60, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 60, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 170, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.24, unit: 'g/cm³' },
        { categoryName: '环境', propertyName: '生物降解性', value: 0, unit: '良好' },
        { categoryName: '生物', propertyName: '生物相容性', value: 0, unit: '良好' },
      ],
      compositions: [
        { element: '左旋聚乳酸 (PLLA)', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PHA 聚羟基脂肪酸酯',
      designation: 'PHA-P34HB',
      description: '生物降解PHA，具有良好韧性、生物降解性、生物相容性，用于包装材料、医疗植入物、农用薄膜',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 20, maxValue: 35, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 500, maxValue: 1500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 500, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 5, maxValue: 15, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 45, maxValue: 55, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 140, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.18, unit: 'g/cm³' },
        { categoryName: '环境', propertyName: '生物降解性', value: 0, unit: '优异' },
        { categoryName: '生物', propertyName: '生物相容性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: '聚3-羟基丁酸酯-4-羟基丁酸酯共聚物', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PBT 聚对苯二甲酸丁二醇酯',
      designation: 'PBT-Valox',
      description: '阻燃级PBT，具有优异电性能、良好耐热性、阻燃性，用于电子连接器、继电器、线圈骨架',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 55, maxValue: 65, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2500, maxValue: 3000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 50, maxValue: 100, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 5, maxValue: 8, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 55, maxValue: 65, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 225, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.35, unit: 'g/cm³' },
        { categoryName: '燃烧', propertyName: '阻燃等级', value: 0, unit: 'UL94 V-0' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电强度', value: 20, unit: 'kV/mm' },
      ],
      compositions: [
        { element: 'PBT (聚对苯二甲酸丁二醇酯)', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PA11 尼龙11',
      designation: 'PA11-Rilsan',
      description: '生物基尼龙11，具有优异柔韧性、耐化学性、低吸水率，用于软管、电缆护套、体育用品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 45, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1200, maxValue: 1600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 300, maxValue: 450, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 5, maxValue: 10, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 140, maxValue: 155, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 186, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.04, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.3, unit: '%' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '良好' },
        { categoryName: '环境', propertyName: '生物基含量', value: 100, unit: '%' },
      ],
      compositions: [
        { element: 'PA11 (聚11-氨基十一酸)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PA12 尼龙12',
      designation: 'PA12-Grilamid',
      description: '尼龙12，具有优异韧性、低吸水率、良好尺寸稳定性，用于气动管件、3D打印、滑雪靴',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 45, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1400, maxValue: 1800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 350, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 6, maxValue: 12, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 130, maxValue: 150, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 178, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.02, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.25, unit: '%' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '良好' },
      ],
      compositions: [
        { element: 'PA12 (聚12-酰胺)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PPS 聚苯硫醚',
      designation: 'PPS-Fortron',
      description: '纯PPS树脂，具有优异耐热性、耐化学性、阻燃性，用于高温过滤器、泵部件、化工设备',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 75, maxValue: 85, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3000, maxValue: 3800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 3, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度', minValue: 1.5, maxValue: 2.5, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 260, maxValue: 270, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 220, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 280, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.35, unit: 'g/cm³' },
        { categoryName: '燃烧', propertyName: '阻燃等级', value: 0, unit: 'UL94 V-0' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: 'PPS (聚苯硫醚)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
  ];

  let createdCount = 0;

  for (const polymer of otherPolymers) {
    console.log(`处理材料: ${polymer.name}`);

    // 检查材料是否已存在
    const existingMaterial = await prisma.material.findFirst({
      where: {
        name: polymer.name,
        designation: polymer.designation,
      },
    });

    if (existingMaterial) {
      console.log(`  ⚠️  材料已存在，跳过: ${polymer.name}`);
      continue;
    }

    // 创建材料
    const material = await prisma.material.create({
      data: {
        name: polymer.name,
        designation: polymer.designation,
        description: polymer.description,
        categoryId: polymersCategory.id,
      },
    });

    // 创建性能数据
    for (const prop of polymer.properties) {
      let propertyCategory = await prisma.propertyCategory.findFirst({
        where: { name: prop.categoryName },
      });

      if (!propertyCategory) {
        propertyCategory = await prisma.propertyCategory.create({
          data: { name: prop.categoryName },
        });
      }

      // 跳过包含文字描述的属性值
      if (typeof prop.value === 'string') {
        continue;
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
    for (const comp of polymer.compositions) {
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
    console.log(`  ✅ 创建成功: ${polymer.name}`);
  }

  console.log(`\n其他高分子材料扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种其他高分子材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展其他高分子材料失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
