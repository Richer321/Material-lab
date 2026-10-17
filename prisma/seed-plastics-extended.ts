import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展工程塑料材料...');

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

  // 工程塑料数据
  const engineeringPlastics = [
    {
      name: 'PA6 尼龙6',
      designation: 'PA6-GF30',
      description: '30%玻纤增强尼龙6，具有高强度、高刚性、优异耐磨性，用于齿轮、轴承、汽车部件、电动工具外壳',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 160, maxValue: 180, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 7500, maxValue: 9000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 3, maxValue: 5, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 220, maxValue: 250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 7500, maxValue: 9000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 12, maxValue: 16, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 85, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 200, maxValue: 215, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 210, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 220, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 2, maxValue: 4, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.35, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.35, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 1.5, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E13, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 4.0, unit: '' },
        { categoryName: '电', propertyName: '介电强度', value: 20, unit: 'kV/mm' },
      ],
      compositions: [
        { element: 'PA6 (尼龙6)', minValue: 68, maxValue: 72, unit: '%' },
        { element: '玻璃纤维', minValue: 28, maxValue: 32, unit: '%' },
      ],
    },
    {
      name: 'PA66 尼龙66',
      designation: 'PA66-GF35',
      description: '35%玻纤增强尼龙66，具有高强度、高耐热性、优异尺寸稳定性，用于发动机部件、电子连接器、汽车外饰件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 180, maxValue: 200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 9000, maxValue: 11000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 250, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 9000, maxValue: 11000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 10, maxValue: 14, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 90, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 245, maxValue: 260, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 255, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 260, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 1.5, maxValue: 3, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.4, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.38, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 1.2, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.8, unit: '' },
      ],
      compositions: [
        { element: 'PA66 (尼龙66)', minValue: 63, maxValue: 67, unit: '%' },
        { element: '玻璃纤维', minValue: 33, maxValue: 37, unit: '%' },
      ],
    },
    {
      name: 'PC 聚碳酸酯',
      designation: 'PC-ABS',
      description: 'PC-ABS合金，具有优异冲击强度、良好耐热性、易加工，用于手机外壳、笔记本电脑外壳、汽车内饰件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 55, maxValue: 65, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2200, maxValue: 2600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 80, maxValue: 120, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 85, maxValue: 95, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 2400, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 45, maxValue: 60, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 115, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 100, maxValue: 110, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 130, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 145, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 6, maxValue: 8, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.22, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.15, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.3, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.0, unit: '' },
        { categoryName: '光学', propertyName: '透光率', value: 85, unit: '%' },
      ],
      compositions: [
        { element: 'PC (聚碳酸酯)', minValue: 55, maxValue: 65, unit: '%' },
        { element: 'ABS (丙烯腈-丁二烯-苯乙烯)', minValue: 35, maxValue: 45, unit: '%' },
      ],
    },
    {
      name: 'POM 聚甲醛',
      designation: 'POM-Homo',
      description: '均聚甲醛，具有高强度、高刚性、优异耐磨性和低摩擦系数，用于齿轮、轴承、滑轨、五金件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 65, maxValue: 72, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2800, maxValue: 3200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 25, maxValue: 40, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 90, maxValue: 100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 2900, maxValue: 3300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 6, maxValue: 8, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 80, unit: 'M' },
        { categoryName: '机械', propertyName: '摩擦系数', value: 0.25, unit: '' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 135, maxValue: 150, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 165, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 175, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 8, maxValue: 11, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.31, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.42, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.25, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.7, unit: '' },
      ],
      compositions: [
        { element: 'POM (聚甲醛)', minValue: 98, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PBT 聚对苯二甲酸丁二醇酯',
      designation: 'PBT-GF30',
      description: '30%玻纤增强PBT，具有高强度、优异电绝缘性、良好耐化学性，用于电子连接器、线圈骨架、继电器',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 140, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 8000, maxValue: 9500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 200, maxValue: 230, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 8000, maxValue: 9500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 8, maxValue: 11, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 88, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 210, maxValue: 225, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 205, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 225, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 2, maxValue: 4, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.28, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.52, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.2, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.5, unit: '' },
        { categoryName: '电', propertyName: '介电损耗', value: 0.005, unit: '' },
      ],
      compositions: [
        { element: 'PBT (聚对苯二甲酸丁二醇酯)', minValue: 68, maxValue: 72, unit: '%' },
        { element: '玻璃纤维', minValue: 28, maxValue: 32, unit: '%' },
      ],
    },
    {
      name: 'PPS 聚苯硫醚',
      designation: 'PPS-GF40',
      description: '40%玻纤增强PPS，具有优异耐热性、耐化学性、阻燃性，用于汽车部件、电子元件、化工设备',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 170, maxValue: 190, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 12000, maxValue: 14000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 1, maxValue: 2, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 240, maxValue: 270, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 12500, maxValue: 14500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 7, maxValue: 10, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 95, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 260, maxValue: 270, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 220, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 280, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 1, maxValue: 2, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.35, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.65, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.05, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.9, unit: '' },
        { categoryName: '燃烧', propertyName: '阻燃等级', value: 0, unit: 'UL94 V-0' },
      ],
      compositions: [
        { element: 'PPS (聚苯硫醚)', minValue: 58, maxValue: 62, unit: '%' },
        { element: '玻璃纤维', minValue: 38, maxValue: 42, unit: '%' },
      ],
    },
    {
      name: 'PEEK 聚醚醚酮',
      designation: 'PEEK-450G',
      description: '高性能PEEK，具有优异耐热性、耐化学性、力学性能，用于航空航天、医疗器械、高端工业部件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 95, maxValue: 105, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 3600, maxValue: 4000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 30, maxValue: 50, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 150, maxValue: 170, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 3800, maxValue: 4200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 8, maxValue: 12, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 99, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 300, maxValue: 320, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 143, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 343, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 250, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 4, maxValue: 5, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.25, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.30, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.5, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.2, unit: '' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: 'PEEK (聚醚醚酮)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PPO 聚苯醚',
      designation: 'PPO+PA-GF30',
      description: 'PPO/PA合金玻纤增强，具有高强度、优异耐水性、良好电性能，用于水泵部件、电器外壳、汽车零件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 110, maxValue: 130, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 6500, maxValue: 8000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 3, maxValue: 5, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 160, maxValue: 190, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 6000, maxValue: 7500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 9, maxValue: 13, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏R)', value: 118, unit: 'R' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 190, maxValue: 210, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 175, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 3, maxValue: 5, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.22, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.42, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.6, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.8, unit: '' },
      ],
      compositions: [
        { element: 'PPO (聚苯醚)', minValue: 25, maxValue: 35, unit: '%' },
        { element: 'PA (尼龙)', minValue: 35, maxValue: 45, unit: '%' },
        { element: '玻璃纤维', minValue: 28, maxValue: 32, unit: '%' },
      ],
    },
    {
      name: 'PET 聚对苯二甲酸乙二醇酯',
      designation: 'PET-GF30',
      description: '30%玻纤增强PET，具有高强度、优异尺寸稳定性、良好耐热性，用于汽车部件、电器配件、阀门',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 150, maxValue: 170, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 8500, maxValue: 10000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 3, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 220, maxValue: 250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 8500, maxValue: 10000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 8, maxValue: 12, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 90, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 220, maxValue: 235, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 215, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 255, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 1.5, maxValue: 3, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.28, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.55, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.15, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.6, unit: '' },
      ],
      compositions: [
        { element: 'PET (聚对苯二甲酸乙二醇酯)', minValue: 68, maxValue: 72, unit: '%' },
        { element: '玻璃纤维', minValue: 28, maxValue: 32, unit: '%' },
      ],
    },
    {
      name: 'LCP 液晶聚合物',
      designation: 'LCP-GF40',
      description: '40%玻纤增强LCP，具有高强度、优异耐热性、低吸水率、高频性能，用于电子连接器、高频器件、医疗器械',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 180, maxValue: 210, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 15000, maxValue: 18000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 1, maxValue: 2, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 250, maxValue: 290, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 15500, maxValue: 18500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 10, maxValue: 15, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 98, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 265, maxValue: 280, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 240, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 280, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数 (流动方向)', minValue: 0.5, maxValue: 1.5, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '线膨胀系数 (垂直方向)', minValue: 3, maxValue: 5, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.45, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.70, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.04, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.5, unit: '' },
        { categoryName: '电', propertyName: '介电损耗 (1MHz)', value: 0.003, unit: '' },
      ],
      compositions: [
        { element: 'LCP (液晶聚合物)', minValue: 58, maxValue: 62, unit: '%' },
        { element: '玻璃纤维', minValue: 38, maxValue: 42, unit: '%' },
      ],
    },
    {
      name: 'PSU 聚砜',
      designation: 'PSU-GF30',
      description: '30%玻纤增强聚砜，具有高强度、优异耐热性、良好透明性，用于医疗器械、食品加工设备、电子元件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 120, maxValue: 140, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 7000, maxValue: 8500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 170, maxValue: 200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 7200, maxValue: 8700, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 8, maxValue: 12, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 88, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 175, maxValue: 190, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 185, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 160, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 2, maxValue: 4, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.26, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.45, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.3, unit: '%' },
        { categoryName: '物理', propertyName: '透光率', value: 75, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.6, unit: '' },
      ],
      compositions: [
        { element: 'PSU (聚砜)', minValue: 68, maxValue: 72, unit: '%' },
        { element: '玻璃纤维', minValue: 28, maxValue: 32, unit: '%' },
      ],
    },
    {
      name: 'PES 聚醚砜',
      designation: 'PES-GF30',
      description: '30%玻纤增强聚醚砜，具有优异耐热性、良好电性能、高透明性，用于电子连接器、汽车照明、食品容器',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 140, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 7500, maxValue: 9000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 2, maxValue: 3, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 190, maxValue: 220, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 7800, maxValue: 9300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 8, maxValue: 11, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 90, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 200, maxValue: 215, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 220, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 180, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 2, maxValue: 3.5, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.24, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.48, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.45, unit: '%' },
        { categoryName: '物理', propertyName: '透光率', value: 80, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.5, unit: '' },
      ],
      compositions: [
        { element: 'PES (聚醚砜)', minValue: 68, maxValue: 72, unit: '%' },
        { element: '玻璃纤维', minValue: 28, maxValue: 32, unit: '%' },
      ],
    },
    {
      name: 'PI 聚酰亚胺',
      designation: 'PI-TPI',
      description: '热塑性聚酰亚胺，具有优异耐热性、良好力学性能、耐辐射性，用于航空航天、电子绝缘、高温部件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 110, maxValue: 130, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2800, maxValue: 3500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 10, maxValue: 20, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 140, maxValue: 170, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 3000, maxValue: 3800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 6, maxValue: 9, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 92, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (1.8MPa)', minValue: 270, maxValue: 290, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 250, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 220, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 3, maxValue: 5, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.22, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.35, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.8, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 3.4, unit: '' },
        { categoryName: '燃烧', propertyName: '阻燃等级', value: 0, unit: 'UL94 V-0' },
      ],
      compositions: [
        { element: 'PI (聚酰亚胺)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'UHMWPE 超高分子量聚乙烯',
      designation: 'UHMWPE-GUR',
      description: '超高分子量聚乙烯，具有优异耐磨性、低摩擦系数、高抗冲击性，用于衬里、滑块、人工关节',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 40, maxValue: 50, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 800, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 300, maxValue: 500, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 35, maxValue: 45, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 80, maxValue: 120, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 68, unit: 'D' },
        { categoryName: '机械', propertyName: '摩擦系数', value: 0.15, unit: '' },
        { categoryName: '机械', propertyName: '耐磨性', value: 0, unit: '优异' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 80, maxValue: 95, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 130, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 135, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 15, maxValue: 20, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.45, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 0.93, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.01, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E16, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.3, unit: '' },
      ],
      compositions: [
        { element: 'UHMWPE (超高分子量聚乙烯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PTFE 聚四氟乙烯',
      designation: 'PTFE-Generic',
      description: '聚四氟乙烯（特氟龙），具有优异耐化学性、低摩擦系数、良好电性能，用于密封件、绝缘材料、不粘涂层',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 20, maxValue: 30, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 400, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 200, maxValue: 400, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', value: 15, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 12, maxValue: 16, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (邵氏D)', value: 60, unit: 'D' },
        { categoryName: '机械', propertyName: '摩擦系数', value: 0.08, unit: '' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 120, maxValue: 130, unit: '°C' },
        { categoryName: '热', propertyName: '熔融温度', value: 327, unit: '°C' },
        { categoryName: '热', propertyName: '长期使用温度', value: 260, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 10, maxValue: 15, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.25, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 2.18, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.01, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E18, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.1, unit: '' },
        { categoryName: '电', propertyName: '介电损耗 (1MHz)', value: 0.0002, unit: '' },
        { categoryName: '化学', propertyName: '耐化学性', value: 0, unit: '优异' },
      ],
      compositions: [
        { element: 'PTFE (聚四氟乙烯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
    {
      name: 'PMMA 聚甲基丙烯酸甲酯',
      designation: 'PMMA-Cast',
      description: '浇铸型PMMA（亚克力），具有优异透明性、良好表面硬度、易加工，用于显示屏、广告牌、照明罩',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度', minValue: 65, maxValue: 75, unit: 'MPa' },
        { categoryName: '机械', propertyName: '拉伸模量', minValue: 2800, maxValue: 3300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂伸长率', minValue: 3, maxValue: 6, unit: '%' },
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 100, maxValue: 120, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弯曲模量', minValue: 2900, maxValue: 3400, unit: 'MPa' },
        { categoryName: '机械', propertyName: '缺口冲击强度 (23°C)', minValue: 1.5, maxValue: 2.5, unit: 'kJ/m²' },
        { categoryName: '机械', propertyName: '硬度 (洛氏M)', value: 85, unit: 'M' },
        { categoryName: '热', propertyName: '热变形温度 (0.45MPa)', minValue: 90, maxValue: 100, unit: '°C' },
        { categoryName: '热', propertyName: '维卡软化温度', value: 105, unit: '°C' },
        { categoryName: '热', propertyName: '玻璃化温度', value: 105, unit: '°C' },
        { categoryName: '热', propertyName: '线膨胀系数', minValue: 7, maxValue: 9, unit: '×10⁻⁵/K' },
        { categoryName: '热', propertyName: '热导率', value: 0.20, unit: 'W/(m·K)' },
        { categoryName: '物理', propertyName: '密度', value: 1.18, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '吸水率 (23°C, 24h)', value: 0.3, unit: '%' },
        { categoryName: '物理', propertyName: '透光率', value: 92, unit: '%' },
        { categoryName: '物理', propertyName: '折射率', value: 1.49, unit: '' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E15, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数 (1MHz)', value: 2.8, unit: '' },
      ],
      compositions: [
        { element: 'PMMA (聚甲基丙烯酸甲酯)', minValue: 99, maxValue: 100, unit: '%' },
      ],
    },
  ];

  let createdCount = 0;

  for (const plastic of engineeringPlastics) {
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

  console.log(`\n工程塑料扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种工程塑料材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展工程塑料失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
