import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展通用工程塑料材料...');

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

  // 通用工程塑料数据
  const generalPlastics = [
    {
      name: 'PP 聚丙烯',
      designation: 'PP-Homo',
      description: '均聚聚丙烯，具有良好耐热性、优异耐化学性、低密度，用于食品容器、医疗器械、汽车部件、包装材料',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 30, maxValue: 40, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1300, maxValue: 1800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 100, maxValue: 600, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 45, maxValue: 60, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 1400, maxValue: 1900, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 3, maxValue: 5, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 95, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 100, maxValue: 110, unit: '°C' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 55, maxValue: 65, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 155, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 165, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 9, maxValue: 11, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.22, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 0.90, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.02, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.3, unit: '' },
        { categoryName: '电', propertyName: '介电强度', value: 25, unit: 'kV/mm' },
      ],
      compositions: [
        { element: 'PP (聚丙烯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PP 聚丙烯共聚物',
      designation: 'PP-Copolymer',
      description: 'PP共聚物（乙烯-丙烯无规共聚），具有优异抗冲击性、良好透明性，用于储物箱、家用器具、瓶盖',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 25, maxValue: 35, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 900, maxValue: 1300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 500, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 35, maxValue: 50, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 1000, maxValue: 1400, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 5, maxValue: 10, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 85, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 90, maxValue: 105, unit: '°C' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 50, maxValue: 60, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 145, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 160, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 10, maxValue: 13, unit: '×10⁻⁵/K' },
        { categoryName: '物理', propertyName: '密度', value: 0.90, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '透光率', value: 65, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'PP (聚丙烯)', minValue: 90, maxValue: 95, unit: '%' },
        { element: '乙烯', minValue: 5, maxValue: 10, unit: '%' },
      ],
    },
    {
      name: 'LDPE 低密度聚乙烯',
      designation: 'LDPE-LD150',
      description: '低密度聚乙烯，具有良好柔软性、优异耐化学性、易加工，用于塑料袋、薄膜、包装材料、电线电缆',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 8, maxValue: 15, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 150, maxValue: 300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 100, maxValue: 650, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', value: 12, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 20, maxValue: 40, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 48, unit: 'D' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 35, maxValue: 45, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 85, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 110, unit: '°C' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -50, maxValue: 80, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 18, maxValue: 22, unit: '×10⁻⁵/K' },
        { categoryName: '物理', propertyName: '密度', value: 0.92, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.01, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.3, unit: '' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: 'LDPE (低密度聚乙烯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'HDPE 高密度聚乙烯',
      designation: 'HDPE-HD700',
      description: '高密度聚乙烯，具有良好刚性、优异耐化学性、高强度，用于瓶子、玩具、家具、管道',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 25, maxValue: 35, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 900, maxValue: 1400, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 100, maxValue: 800, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 30, maxValue: 45, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 5, maxValue: 15, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 62, unit: 'D' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 60, maxValue: 80, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 125, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 135, unit: '°C' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -50, maxValue: 80, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 12, maxValue: 16, unit: '×10⁻⁵/K' },
        { categoryName: '物理', propertyName: '密度', value: 0.95, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.01, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.4, unit: '' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: 'HDPE (高密度聚乙烯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PVC 聚氯乙烯（硬质）',
      designation: 'PVC-Rigid',
      description: '硬质PVC，具有良好刚性、优异阻燃性、耐化学性，用于管道、门窗型材、板材、电线电缆',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 45, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2800, maxValue: 3500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 20, maxValue: 40, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 70, maxValue: 90, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 3000, maxValue: 3800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 3, maxValue: 6, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 115, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 65, maxValue: 75, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 80, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 80, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 5, maxValue: 8, unit: '×10⁻⁵/K' },
        { categoryName: '物理', propertyName: '密度', value: 1.40, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.1, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.2, unit: '' },
        { categoryName: '燃烧', propertyName: '阻燃等级', value: 0, unit: 'UL94 V-0' },
      ],
      compositions: [
        { element: 'PVC (聚氯乙烯)', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PVC 聚氯乙烯（软质）',
      designation: 'PVC-Flexible',
      description: '软质PVC，具有良好柔软性、优异耐候性、易加工，用于软管、电缆护套、地板革、人造革',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 12, maxValue: 20, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 10, maxValue: 30, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 450, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (邵氏A)', value: 75, unit: 'A' },
        { categoryName: '热', propertyName: '脆化温度', minValue: -20, maxValue: -30, unit: '°C' },
        { categoryName: '热', propertyName: '使用温度范围', minValue: -15, maxValue: 60, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.25, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐候性', value: 0, unit: '良好' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '良好' },
      ],
      compositions: [
        { element: 'PVC (聚氯乙烯)', minValue: 60, maxValue: 70, unit: '%' },
        { element: '增塑剂', minValue: 25, maxValue: 35, unit: '%' },
      ],
    },
    {
      name: 'PS 通用聚苯乙烯',
      designation: 'PS-GPPS',
      description: '通用级聚苯乙烯（GPPS），具有高刚性、良好透明性、易加工、低成本，用于文具、餐具、CD盒、一次性用品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 45, maxValue: 60, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3000, maxValue: 3800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 1, maxValue: 3, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 80, maxValue: 100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 3200, maxValue: 4000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 1, maxValue: 2, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 75, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 85, maxValue: 95, unit: '°C' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 75, maxValue: 85, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 95, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 100, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.05, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '透光率', value: 90, unit: '%' },
        { categoryName: '光学', propertyName: '折射率', value: 1.59, unit: '' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.5, unit: '' },
      ],
      compositions: [
        { element: 'PS (聚苯乙烯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'HIPS 高抗冲聚苯乙烯',
      designation: 'HIPS-HI',
      description: '高抗冲聚苯乙烯，通过添加橡胶增韧，具有优异抗冲击性、良好加工性，用于电器外壳、玩具、包装材料',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 25, maxValue: 35, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1800, maxValue: 2500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 30, maxValue: 60, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 40, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 2000, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 6, maxValue: 12, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 75, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 80, maxValue: 90, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 90, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.05, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.7, unit: '' },
      ],
      compositions: [
        { element: 'PS (聚苯乙烯)', minValue: 88, maxValue: 92, unit: '%' },
        { element: '橡胶增韧剂', minValue: 8, maxValue: 12, unit: '%' },
      ],
    },
    {
      name: 'ABS 丙烯腈-丁二烯-苯乙烯',
      designation: 'ABS-General',
      description: '通用ABS，具有良好抗冲击性、高强度、优异表面光泽，用于电器外壳、玩具、汽车内饰、键盘',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 40, maxValue: 50, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2000, maxValue: 2600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 15, maxValue: 30, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 65, maxValue: 85, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 2200, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 15, maxValue: 25, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 110, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 90, maxValue: 100, unit: '°C' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 85, maxValue: 95, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 105, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.05, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.9, unit: '' },
      ],
      compositions: [
        { element: '丙烯腈 (AN)', minValue: 20, maxValue: 25, unit: '%' },
        { element: '丁二烯 (BD)', minValue: 15, maxValue: 25, unit: '%' },
        { element: '苯乙烯 (ST)', minValue: 55, maxValue: 60, unit: '%' },
      ],
    },
    {
      name: 'ABS 高抗冲型',
      designation: 'ABS-HighImpact',
      description: '高抗冲ABS，通过增加橡胶含量提高冲击强度，用于电动工具外壳、安全帽、汽车保险杠',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 35, maxValue: 45, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1800, maxValue: 2300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 30, maxValue: 50, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 55, maxValue: 70, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 30, maxValue: 45, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 100, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 85, maxValue: 95, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.06, unit: 'g/cm³' },
      ],
      compositions: [
        { element: '丙烯腈 (AN)', minValue: 15, maxValue: 20, unit: '%' },
        { element: '丁二烯 (BD)', minValue: 25, maxValue: 35, unit: '%' },
        { element: '苯乙烯 (ST)', minValue: 45, maxValue: 55, unit: '%' },
      ],
    },
    {
      name: 'SAN 苯乙烯-丙烯腈',
      designation: 'SAN-General',
      description: 'SAN树脂，具有良好透明性、优异耐化学性、高强度，用于化妆品瓶、餐具、电器配件、医疗用品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 70, maxValue: 85, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3500, maxValue: 4200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 100, maxValue: 120, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 3800, maxValue: 4500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 3, maxValue: 5, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 80, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 95, maxValue: 110, unit: '°C' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 90, maxValue: 105, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 110, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.08, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '透光率', value: 85, unit: '%' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
        { categoryName: '化学', propertyName: '耐应力开裂', value: 0, unit: '优异' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.8, unit: '' },
      ],
      compositions: [
        { element: '苯乙烯', minValue: 70, maxValue: 76, unit: '%' },
        { element: '丙烯腈', minValue: 24, maxValue: 30, unit: '%' },
      ],
    },
    {
      name: 'ASA 丙烯酸酯-苯乙烯-丙烯腈',
      designation: 'ASA-General',
      description: 'ASA树脂，具有优异耐候性、良好抗冲击性、颜色稳定性，用于汽车外饰件、建筑型材、户外用品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 45, maxValue: 55, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2200, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 20, maxValue: 35, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 70, maxValue: 90, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 2400, newValue: 3000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 12, maxValue: 20, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 105, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 90, maxValue: 100, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 105, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.07, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐候性', value: 0, unit: '优异' },
        { categoryName: '化学', propertyName: '耐UV性', value: 0, unit: '优异' },
        { categoryName: '化学', propertyName: '颜色稳定性', value: 0, unit: '优异' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: '丙烯酸酯橡胶', minValue: 25, maxValue: 35, unit: '%' },
        { element: '苯乙烯-丙烯腈共聚物', minValue: 65, maxValue: 75, unit: '%' },
      ],
    },
    {
      name: 'MS 聚甲基苯乙烯',
      designation: 'MS-General',
      description: 'MS树脂（甲基苯乙烯），具有优异光学性能、高折射率、良好透明性，用于光学镜片、LED透镜、指示灯',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 55, maxValue: 70, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3200, maxValue: 4000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 2, maxValue: 4, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 95, maxValue: 110, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 115, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.12, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '透光率', value: 90, unit: '%' },
        { categoryName: '光学', propertyName: '折射率', value: 1.57, unit: '' },
        { categoryName: '光学', propertyName: '阿贝数', value: 35, unit: '' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: '甲基苯乙烯', minValue: 95, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'SB 苯乙烯-丁二烯',
      designation: 'SB-General',
      description: 'SB树脂（苯乙烯-丁二烯嵌段共聚物），具有良好韧性、透明性、易加工，用于包装盒、文具、日用品',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 35, maxValue: 50, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 1500, maxValue: 2200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 20, maxValue: 50, unit: '%' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 5, maxValue: 10, unit: 'kJ/m²' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 75, maxValue: 90, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 85, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 1.02, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '透光率', value: 75, unit: '%' },
      ],
      compositions: [
        { element: '苯乙烯', minValue: 70, maxValue: 80, unit: '%' },
        { element: '丁二烯', minValue: 20, maxValue: 30, unit: '%' },
      ],
    },
  ];

  let createdCount = 0;

  for (const plastic of generalPlastics) {
    console.log(`处理材料: ${plastic.name}`);

    // 检查材料是否已存在
    const existingMaterial = await prisma.material.findFirst({
      where: {
        name: plastic.name,
        designation: plastic.designation,
      },
    });

    if (existingMaterial) {
      console.log(`  ⚠️  材料已存在，跳过: ${plastic.name}`);
      continue;
    }

    // 创建材料
    const material = await prisma.material.create({
      data: {
        name: plastic.name,
        designation: plastic.designation,
        description: plastic.description,
        categoryId: polymersCategory.id,
      },
    });

    // 创建性能数据
    for (const prop of plastic.properties) {
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
    for (const comp of plastic.compositions) {
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
    console.log(`  ✅ 创建成功: ${plastic.name}`);
  }

  console.log(`\n通用工程塑料扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种通用工程塑料材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展通用工程塑料失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
