import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展陶瓷材料...');

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

  // 陶瓷材料数据
  const ceramics = [
    {
      name: '氧化锆陶瓷',
      designation: 'ZrO2-PSZ',
      description: '部分稳定氧化锆陶瓷，具有高韧性、高强度和优异的耐磨性，用于刀具、轴承、耐磨件、人造关节',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 900, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2000, maxValue: 3000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 8, maxValue: 12, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '硬度 (HRA)', minValue: 87, maxValue: 92, unit: 'HRA' },
        { categoryName: '机械', propertyName: '弹性模量', value: 210, unit: 'GPa' },
        { categoryName: '机械', propertyName: '韦氏硬度', value: 1200, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', value: 2.5, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 10.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 2700, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1200, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.05, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E12, unit: 'Ω·cm' },
        { categoryName: '机械', propertyName: '泊松比', value: 0.31, unit: '' },
      ],
      compositions: [
        { element: 'ZrO2 (氧化锆)', minValue: 97, unit: '%' },
        { element: 'Y2O3 (氧化钇)', maxValue: 3, unit: '%' },
        { element: '其他', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '氧化镁陶瓷',
      designation: 'MgO-99',
      description: '高纯氧化镁陶瓷，具有优异的耐高温性能和电绝缘性，用于耐火材料、电绝缘体、炉衬',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 150, maxValue: 250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 800, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 2.5, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 260, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', minValue: 40, maxValue: 60, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 13.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 2852, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 2000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.58, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'MgO (氧化镁)', minValue: 99, unit: '%' },
        { element: 'CaO (氧化钙)', maxValue: 0.5, unit: '%' },
        { element: 'SiO2 (二氧化硅)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '氧化钇稳定氧化锆',
      designation: 'YSZ-8mol%',
      description: '8mol%氧化钇稳定氧化锆，具有优异的离子导电性和热稳定性，用于固体氧化物燃料电池、氧传感器、热障涂层',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 800, maxValue: 1000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 1800, maxValue: 2500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 6, maxValue: 8, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 200, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 1200, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 2.0, maxValue: 2.5, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 10.8, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 2680, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.00, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '氧离子电导率 (1000°C)', value: 0.1, unit: 'S/cm' },
      ],
      compositions: [
        { element: 'ZrO2 (氧化锆)', minValue: 90, maxValue: 92, unit: '%' },
        { element: 'Y2O3 (氧化钇)', minValue: 8, maxValue: 10, unit: '%' },
      ],
    },
    {
      name: '氮化铝陶瓷',
      designation: 'AlN-99',
      description: '高纯氮化铝陶瓷，具有极高的热导率和优异的电绝缘性，用于功率电子基板、散热器、半导体封装',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 300, maxValue: 450, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2000, maxValue: 2500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 2.8, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 330, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 1200, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 170, maxValue: 200, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 4.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '分解温度', value: 2200, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.26, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
        { categoryName: '电', propertyName: '介电常数', value: 8.8, unit: '' },
      ],
      compositions: [
        { element: 'AlN (氮化铝)', minValue: 99, unit: '%' },
        { element: 'O (氧)', maxValue: 0.8, unit: '%' },
        { element: 'C (碳)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '氮化硼陶瓷',
      designation: 'BN-Hex',
      description: '六方氮化硼陶瓷，具有优异的润滑性、耐高温性和电绝缘性，用于高温润滑剂、坩埚、绝缘体',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 40, maxValue: 70, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 50, maxValue: 100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', minValue: 20, maxValue: 40, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 20, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 30, maxValue: 60, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数 (⊥)', value: 0.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '热膨胀系数 (∥)', value: 38, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '分解温度', value: 3000, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 2.27, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E13, unit: 'Ω·cm' },
        { categoryName: '其他', propertyName: '摩擦系数', value: 0.16, unit: '' },
      ],
      compositions: [
        { element: 'BN (氮化硼)', minValue: 98, unit: '%' },
        { element: 'B2O3 (氧化硼)', maxValue: 1.5, unit: '%' },
      ],
    },
    {
      name: '碳化硼陶瓷',
      designation: 'B4C-HotPressed',
      description: '热压碳化硼陶瓷，具有极高的硬度、低密度和优异的中子吸收能力，用于防弹装甲、中子吸收剂、研磨材料',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 350, maxValue: 450, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2000, maxValue: 2900, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 3.5, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 450, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (Knoop)', value: 2800, unit: 'HK' },
        { categoryName: '热', propertyName: '热导率', minValue: 30, maxValue: 42, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 5.0, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '分解温度', value: 2450, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 2.52, unit: 'g/cm³' },
        { categoryName: '核', propertyName: '热中子截面', value: 600, unit: 'barns' },
      ],
      compositions: [
        { element: 'B4C (碳化硼)', minValue: 98, unit: '%' },
        { element: 'C (碳)', maxValue: 1.5, unit: '%' },
      ],
    },
    {
      name: '碳化钨硬质合金',
      designation: 'WC-10Co',
      description: '含10%钴的碳化钨硬质合金，具有极高的硬度、耐磨性和强度，用于切削刀具、钻头、模具',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 2000, maxValue: 2800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 4500, maxValue: 6000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 10, maxValue: 14, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 600, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度 (HRA)', minValue: 89, maxValue: 92, unit: 'HRA' },
        { categoryName: '热', propertyName: '热导率', minValue: 80, maxValue: 100, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 5.2, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 800, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 14.5, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '电阻率', value: 20, unit: 'μΩ·cm' },
        { categoryName: '磁', propertyName: '矫顽力', value: 10, unit: 'kA/m' },
      ],
      compositions: [
        { element: 'WC (碳化钨)', minValue: 88, maxValue: 91, unit: '%' },
        { element: 'Co (钴)', minValue: 9, maxValue: 11, unit: '%' },
      ],
    },
    {
      name: '硅化钼陶瓷',
      designation: 'MoSi2',
      description: '二硅化钼陶瓷，具有优异的高温抗氧化性和电热性能，用于高温发热体、高温结构件、航空发动机部件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 350, maxValue: 450, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1200°C)', minValue: 200, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量 (RT)', value: 380, unit: 'GPa' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 4.5, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '硬度', value: 1200, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 45, maxValue: 55, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 8.1, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 2030, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1700, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.24, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '电阻率 (RT)', value: 40, unit: 'μΩ·cm' },
        { categoryName: '电', propertyName: '电阻率 (1200°C)', value: 350, unit: 'μΩ·cm' },
      ],
      compositions: [
        { element: 'MoSi2 (硅化钼)', minValue: 99, unit: '%' },
        { element: 'SiO2 (二氧化硅)', maxValue: 0.8, unit: '%' },
      ],
    },
    {
      name: '硼化钛陶瓷',
      designation: 'TiB2-HotPressed',
      description: '热压硼化钛陶瓷，具有高导电性、高硬度和优异的耐腐蚀性，用于铝电解槽阴极、蒸发舟、装甲',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 400, maxValue: 550, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2500, maxValue: 3500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 5, maxValue: 7, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 550, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 2500, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 60, maxValue: 80, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 7.4, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 3225, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 4.52, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '电阻率', value: 15, unit: 'μΩ·cm' },
      ],
      compositions: [
        { element: 'TiB2 (硼化钛)', minValue: 98, unit: '%' },
        { element: 'TiN (氮化钛)', maxValue: 1.5, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '氧化铝增韧陶瓷',
      designation: 'ZTA',
      description: '氧化铝增韧氧化锆复合陶瓷，结合了氧化铝的硬度和氧化锆的韧性，用于耐磨件、切削刀具、密封件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 700, maxValue: 950, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 2500, maxValue: 3500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', minValue: 6, maxValue: 8, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 250, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 1400, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', value: 15, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 9.0, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1100, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 5.5, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E12, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'Al2O3 (氧化铝)', minValue: 75, maxValue: 80, unit: '%' },
        { element: 'ZrO2 (氧化锆)', minValue: 20, maxValue: 25, unit: '%' },
      ],
    },
    {
      name: '钛酸钡压电陶瓷',
      designation: 'BaTiO3-PZT',
      description: '钛酸钡基压电陶瓷，具有优异的压电性能和介电性能，用于传感器、换能器、致动器、电容器',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 70, maxValue: 100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 67, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 550, unit: 'HV' },
        { categoryName: '机械', propertyName: '密度', value: 5.7, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '居里温度', minValue: 120, maxValue: 180, unit: '°C' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 8.5, unit: '×10⁻⁶/K' },
        { categoryName: '电', propertyName: '介电常数', minValue: 1200, maxValue: 3500, unit: '' },
        { categoryName: '电', propertyName: '压电系数 d33', minValue: 150, maxValue: 350, unit: 'pC/N' },
        { categoryName: '电', propertyName: '机电耦合系数 kp', value: 0.35, unit: '' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E11, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'BaTiO3 (钛酸钡)', minValue: 90, unit: '%' },
        { element: 'PbZrO3 (锆酸铅)', minValue: 5, maxValue: 8, unit: '%' },
        { element: '添加剂', maxValue: 2, unit: '%' },
      ],
    },
    {
      name: '压电石英陶瓷',
      designation: 'SiO2-Quartz',
      description: '合成石英压电陶瓷，具有稳定的压电性能和低损耗，用于振荡器、滤波器、谐振器、频率控制器',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 80, maxValue: 120, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 72, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 700, unit: 'HV' },
        { categoryName: '热', propertyName: '热膨胀系数 (∥)', value: 13.7, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '热膨胀系数 (⊥)', value: 15.6, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '相变温度', value: 573, unit: '°C' },
        { categoryName: '热', propertyName: '熔点', value: 1713, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 2.65, unit: 'g/cm³' },
        { categoryName: '光学', propertyName: '折射率 (n0)', value: 1.544, unit: '' },
        { categoryName: '光学', propertyName: '折射率 (ne)', value: 1.553, unit: '' },
        { categoryName: '电', propertyName: '介电常数', value: 4.5, unit: '' },
        { categoryName: '电', propertyName: '压电系数 d11', value: 2.3, unit: 'pC/N' },
      ],
      compositions: [
        { element: 'SiO2 (二氧化硅)', minValue: 99.9, unit: '%' },
        { element: '杂质', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '莫来石陶瓷',
      designation: 'Mullite-3Al2O3-2SiO2',
      description: '莫来石陶瓷，具有优异的热稳定性和低热膨胀系数，用于耐火材料、高温窑具、热交换器',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 150, maxValue: 250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1200°C)', minValue: 100, maxValue: 180, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 800, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 150, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', minValue: 4, maxValue: 6, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 5.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 1850, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1600, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.16, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E12, unit: 'Ω·cm' },
        { categoryName: '光学', propertyName: '折射率', value: 1.64, unit: '' },
      ],
      compositions: [
        { element: 'Al2O3 (氧化铝)', minValue: 70, maxValue: 77, unit: '%' },
        { element: 'SiO2 (二氧化硅)', minValue: 23, maxValue: 28, unit: '%' },
      ],
    },
    {
      name: '尖晶石陶瓷',
      designation: 'MgAl2O4',
      description: '镁铝尖晶石透明陶瓷，具有优异的光学透过性和热稳定性，用于透明装甲、窗材料、光学器件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 150, maxValue: 250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 1500, maxValue: 2000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 260, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 1150, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 15, maxValue: 25, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 7.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 2135, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1200, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 3.58, unit: 'g/cm³' },
        { categoryName: '光学', propertyName: '透光率 (可见光)', minValue: 80, maxValue: 90, unit: '%' },
        { categoryName: '光学', propertyName: '折射率', value: 1.72, unit: '' },
      ],
      compositions: [
        { element: 'MgAl2O4 (尖晶石)', minValue: 99, unit: '%' },
        { element: '杂质', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '堇青石陶瓷',
      designation: 'Cordierite-2MgO-2Al2O3-5SiO2',
      description: '堇青石陶瓷，具有极低的热膨胀系数和优异的抗热震性，用于蜂窝陶瓷载体、热交换器、催化剂载体',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 80, maxValue: 140, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 300, maxValue: 500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 120, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', minValue: 2, maxValue: 4, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', minValue: 1.5, maxValue: 2.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1200, unit: '°C' },
        { categoryName: '热', propertyName: '抗热震性', value: 800, unit: 'ΔT(°C)' },
        { categoryName: '物理', propertyName: '密度', value: 2.51, unit: 'g/cm³' },
        { categoryName: '物理', propertyName: '气孔率', minValue: 5, maxValue: 15, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E12, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'MgO (氧化镁)', minValue: 13, maxValue: 14, unit: '%' },
        { element: 'Al2O3 (氧化铝)', minValue: 34, maxValue: 36, unit: '%' },
        { element: 'SiO2 (二氧化硅)', minValue: 49, maxValue: 52, unit: '%' },
      ],
    },
    {
      name: '锂铝硅陶瓷',
      designation: 'LAS-GlassCeramic',
      description: '锂铝硅微晶玻璃，具有接近零的热膨胀系数和优异的透明性，用于炉灶面板、防火窗、望远镜镜坯',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度', minValue: 100, maxValue: 180, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗压强度', minValue: 500, maxValue: 800, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 90, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 620, unit: 'HV' },
        { categoryName: '热', propertyName: '热膨胀系数', minValue: -3, maxValue: 3, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '热导率', value: 2.0, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '最高使用温度', value: 800, unit: '°C' },
        { categoryName: '热', propertyName: '抗热震性', value: 800, unit: 'ΔT(°C)' },
        { categoryName: '物理', propertyName: '密度', value: 2.50, unit: 'g/cm³' },
        { categoryName: '光学', propertyName: '透光率 (可见光)', minValue: 85, maxValue: 92, unit: '%' },
        { categoryName: '电', propertyName: '体积电阻率', value: 1E14, unit: 'Ω·cm' },
      ],
      compositions: [
        { element: 'SiO2 (二氧化硅)', minValue: 55, maxValue: 65, unit: '%' },
        { element: 'Al2O3 (氧化铝)', minValue: 18, maxValue: 25, unit: '%' },
        { element: 'Li2O (氧化锂)', minValue: 3, maxValue: 5, unit: '%' },
        { element: 'TiO2+ZrO2 (成核剂)', minValue: 5, maxValue: 10, unit: '%' },
      ],
    },
    {
      name: '硼化锆陶瓷',
      designation: 'ZrB2',
      description: '二硼化锆超高温陶瓷，具有极高的熔点和优异的抗氧化性，用于高超音速飞行器热防护、喷管、电极',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 400, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '抗弯强度 (1500°C)', minValue: 350, maxValue: 500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 4.0, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '弹性模量', value: 500, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 2300, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 60, maxValue: 80, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 6.8, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 3245, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 2000, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.09, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '电阻率', value: 12, unit: 'μΩ·cm' },
      ],
      compositions: [
        { element: 'ZrB2 (硼化锆)', minValue: 98, unit: '%' },
        { element: 'ZrO2 (氧化锆)', maxValue: 1.5, unit: '%' },
        { element: 'B4C (碳化硼)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '二硅化钽陶瓷',
      designation: 'TaSi2',
      description: '二硅化钽超高温陶瓷，具有优异的高温抗氧化性和导电性，用于高温发热体、超高温结构件',
      properties: [
        { categoryName: '机械', propertyName: '抗弯强度 (RT)', minValue: 350, maxValue: 500, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量', value: 400, unit: 'GPa' },
        { categoryName: '机械', propertyName: '硬度', value: 1500, unit: 'HV' },
        { categoryName: '热', propertyName: '热导率', minValue: 35, maxValue: 45, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 9.5, unit: '×10⁻⁶/K' },
        { categoryName: '热', propertyName: '熔点', value: 2200, unit: '°C' },
        { categoryName: '热', propertyName: '最高使用温度', value: 1600, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 9.15, unit: 'g/cm³' },
        { categoryName: '电', propertyName: '电阻率', value: 25, unit: 'μΩ·cm' },
      ],
      compositions: [
        { element: 'TaSi2 (二硅化钽)', minValue: 99, unit: '%' },
        { element: '杂质', maxValue: 0.5, unit: '%' },
      ],
    },
  ];

  let createdCount = 0;

  for (const ceramic of ceramics) {
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

  console.log(`\n陶瓷材料扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种陶瓷材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展陶瓷材料失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
