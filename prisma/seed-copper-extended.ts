import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展铜合金材料...');

  // 获取金属材料类别
  const metalsCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalsCategory) {
    throw new Error('找不到金属材料类别');
  }

  // 创建铜合金子类别
  let copperCategory = await prisma.materialCategory.findFirst({
    where: { name: '铜合金' },
  });

  if (!copperCategory) {
    copperCategory = await prisma.materialCategory.create({
      data: {
        name: '铜合金',
        parentId: metalsCategory.id,
      },
    });
    console.log('✅ 创建铜合金类别');
  }

  // 铜合金数据
  const copperAlloys = [
    {
      name: 'H62 普通黄铜',
      grade: 'H62',
      description: 'Cu-Zn系普通黄铜，具有良好力学性能和耐腐蚀性，用于散热器、垫圈、弹簧',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 320, maxValue: 380, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 110, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 45, maxValue: 55, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 55, maxValue: 70, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 580, maxValue: 640, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.43, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 25, maxValue: 28, unit: '%IACS' },
        { category: '热', name: '热导率', value: 110, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', minValue: 905, maxValue: 925, unit: '°C' },
        { category: '热', name: '热膨胀系数', value: 20.6, unit: '×10⁻⁶/K' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 60.5, maxValue: 63.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 36.5, maxValue: 39.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.15, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.08, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: 'H68 普通黄铜',
      grade: 'H68',
      description: 'Cu-Zn系黄铜，具有优异的冷热加工性能，用于深冲件、波纹管',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 310, maxValue: 370, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 90, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 50, maxValue: 65, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 50, maxValue: 65, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 560, maxValue: 620, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.50, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 27, maxValue: 30, unit: '%IACS' },
        { category: '热', name: '热导率', value: 115, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 920, unit: '°C' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 67.0, maxValue: 70.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 30.0, maxValue: 33.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.10, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.03, unit: '%' },
      ],
    },
    {
      name: 'H70 弹壳黄铜',
      grade: 'H70',
      description: 'Cu-Zn系黄铜，又称弹壳黄铜，具有高强度和良好加工性',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 300, maxValue: 360, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 80, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 50, maxValue: 60, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 50, maxValue: 60, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 540, maxValue: 600, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.53, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 28, maxValue: 31, unit: '%IACS' },
        { category: '热', name: '热导率', value: 120, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 68.5, maxValue: 71.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 28.5, maxValue: 31.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.10, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.03, unit: '%' },
      ],
    },
    {
      name: 'H80 黄铜',
      grade: 'H80',
      description: 'Cu-Zn系高铜黄铜，具有优良耐腐蚀性和金黄色外观，用于装饰件',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 280, maxValue: 340, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 70, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 50, maxValue: 60, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 45, maxValue: 60, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 480, maxValue: 540, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.65, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 35, maxValue: 40, unit: '%IACS' },
        { category: '热', name: '热导率', value: 140, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 79.0, maxValue: 81.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 19.0, maxValue: 21.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.10, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.03, unit: '%' },
      ],
    },
    {
      name: 'HPb59-1 铅黄铜',
      grade: 'HPb59-1',
      description: '易切削黄铜，铅改善切削性能，用于精密机械零件、钟表零件',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 390, maxValue: 450, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 12, maxValue: 20, unit: '%' },
        { category: '机械', name: '硬度', minValue: 80, maxValue: 95, unit: 'HBW' },
        { category: '物理', name: '密度', value: 8.50, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 20, maxValue: 25, unit: '%IACS' },
        { category: '热', name: '热导率', value: 100, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 885, unit: '°C' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 57.0, maxValue: 60.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 38.0, maxValue: 42.0, unit: '%' },
        { name: 'Pb (铅)', minValue: 0.8, maxValue: 1.9, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: 'QSn6.5-0.1 锡青铜',
      grade: 'QSn6.5-0.1',
      description: 'Cu-Sn-P系锡青铜，具有高强度和耐磨性，用于弹簧、接触器',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 340, maxValue: 400, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 120, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 55, maxValue: 65, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 60, maxValue: 75, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 680, maxValue: 750, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 250, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.80, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 15, maxValue: 18, unit: '%IACS' },
        { category: '热', name: '热导率', value: 75, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 110, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 92.5, unit: '%' },
        { name: 'Sn (锡)', minValue: 6.0, maxValue: 7.0, unit: '%' },
        { name: 'P (磷)', minValue: 0.1, maxValue: 0.25, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.02, unit: '%' },
      ],
    },
    {
      name: 'QSn7-0.2 锡青铜',
      grade: 'QSn7-0.2',
      description: '高锡锡青铜，具有高强度和耐磨性，用于轴承、轴套',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 355, maxValue: 410, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 130, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 60, maxValue: 70, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 65, maxValue: 80, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 720, maxValue: 800, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.80, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 12, maxValue: 15, unit: '%IACS' },
        { category: '热', name: '弹性模量', value: 112, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 92.0, unit: '%' },
        { name: 'Sn (锡)', minValue: 6.0, maxValue: 8.0, unit: '%' },
        { name: 'P (磷)', minValue: 0.1, maxValue: 0.4, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: 'QSn4-3 锡青铜',
      grade: 'QSn4-3',
      description: 'Cu-Sn-Zn系锡青铜，具有良好的弹性和耐腐蚀性',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 300, maxValue: 350, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 100, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 45, maxValue: 55, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 55, maxValue: 70, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 540, maxValue: 610, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.80, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 18, maxValue: 22, unit: '%IACS' },
        { category: '热', name: '弹性模量', value: 105, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 92.5, unit: '%' },
        { name: 'Sn (锡)', minValue: 3.5, maxValue: 4.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'QAl9-4 铝青铜',
      grade: 'QAl9-4',
      description: 'Cu-Al-Fe系铝青铜，具有高强度和耐腐蚀性，用于船舶螺旋桨',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 480, maxValue: 550, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 180, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 25, maxValue: 35, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 100, maxValue: 120, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 700, maxValue: 800, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 210, unit: 'MPa' },
        { category: '物理', name: '密度', value: 7.60, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 10, maxValue: 12, unit: '%IACS' },
        { category: '热', name: '热导率', value: 55, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 115, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 86.5, unit: '%' },
        { name: 'Al (铝)', minValue: 8.0, maxValue: 10.0, unit: '%' },
        { name: 'Fe (铁)', minValue: 2.0, maxValue: 4.0, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.5, unit: '%' },
        { name: 'Zn (锌)', maxValue: 1.0, unit: '%' },
      ],
    },
    {
      name: 'QAl10-4-4 高强铝青铜',
      grade: 'QAl10-4-4',
      description: 'Cu-Al-Fe-Ni系高强铝青铜，具有高强度和耐热性',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 590, maxValue: 660, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 260, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 12, maxValue: 20, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 140, maxValue: 160, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 750, maxValue: 850, unit: 'MPa' },
        { category: '机械', name: '高温强度 (400°C)', value: 380, unit: 'MPa' },
        { category: '物理', name: '密度', value: 7.58, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 8, maxValue: 10, unit: '%IACS' },
        { category: '热', name: '弹性模量', value: 125, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 81.5, unit: '%' },
        { name: 'Al (铝)', minValue: 9.5, maxValue: 11.0, unit: '%' },
        { name: 'Fe (铁)', minValue: 3.5, maxValue: 5.5, unit: '%' },
        { name: 'Ni (镍)', minValue: 3.5, maxValue: 5.5, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: 'QBe2 铍青铜',
      grade: 'QBe2',
      description: 'Cu-Be系高强弹性合金，具有最高强度和导电性，用于精密弹簧',
      properties: [
        { category: '机械', name: '抗拉强度 (软态)', minValue: 420, maxValue: 500, unit: 'MPa' },
        { category: '机械', name: '抗拉强度 (时效)', minValue: 1200, maxValue: 1350, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', value: 1100, unit: 'MPa' },
        { category: '机械', name: '延伸率 (时效)', minValue: 2, maxValue: 4, unit: '%' },
        { category: '机械', name: '硬度 (时效)', minValue: 350, maxValue: 400, unit: 'HBW' },
        { category: '机械', name: '疲劳强度 (时效)', value: 350, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.25, unit: 'g/cm³' },
        { category: '电', name: '电导率 (时效)', minValue: 18, maxValue: 22, unit: '%IACS' },
        { category: '热', name: '弹性模量', value: 135, unit: 'GPa' },
        { category: '热', name: '热导率', value: 105, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 97.5, unit: '%' },
        { name: 'Be (铍)', minValue: 1.8, maxValue: 2.1, unit: '%' },
        { name: 'Ni (镍)', minValue: 0.2, maxValue: 0.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.1, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: 'QSi3-1 硅青铜',
      grade: 'QSi3-1',
      description: 'Cu-Si-Mn系硅青铜，具有高强度和焊接性，用于电极、焊接材料',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 350, maxValue: 420, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 40, maxValue: 55, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 70, maxValue: 90, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 620, maxValue: 700, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 210, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.40, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 6, maxValue: 8, unit: '%IACS' },
        { category: '热', name: '弹性模量', value: 118, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 95.5, unit: '%' },
        { name: 'Si (硅)', minValue: 2.75, maxValue: 3.25, unit: '%' },
        { name: 'Mn (锰)', minValue: 1.0, maxValue: 1.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: 'B10 白铜',
      grade: 'B10',
      description: 'Cu-Ni系白铜，具有优异耐海水腐蚀性，用于船舶管道',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 270, maxValue: 340, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 100, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 25, maxValue: 35, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 65, maxValue: 85, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 430, maxValue: 490, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.90, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 8, maxValue: 10, unit: '%IACS' },
        { category: '热', name: '热导率', value: 45, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 140, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 88.5, maxValue: 91.5, unit: '%' },
        { name: 'Ni (镍)', minValue: 9.0, maxValue: 11.0, unit: '%' },
        { name: 'Fe (铁)', minValue: 1.0, maxValue: 1.5, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.5, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.03, unit: '%' },
      ],
    },
    {
      name: 'B19 白铜',
      grade: 'B19',
      description: 'Cu-Ni系白铜，具有良好耐腐蚀性和可焊性',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 290, maxValue: 360, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 110, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 28, maxValue: 38, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 70, maxValue: 90, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 440, maxValue: 510, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.90, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 6, maxValue: 8, unit: '%IACS' },
        { category: '热', name: '热导率', value: 38, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 145, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 79.5, maxValue: 81.5, unit: '%' },
        { name: 'Ni (镍)', minValue: 18.0, maxValue: 20.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: 'B30 白铜',
      grade: 'B30',
      description: 'Cu-Ni系高镍白铜，具有优异耐腐蚀性和强度',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 370, maxValue: 440, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 25, maxValue: 35, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 85, maxValue: 105, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 540, maxValue: 620, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.90, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 4, maxValue: 6, unit: '%IACS' },
        { category: '热', name: '热导率', value: 30, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 150, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 68.5, maxValue: 71.5, unit: '%' },
        { name: 'Ni (镍)', minValue: 28.5, maxValue: 31.5, unit: '%' },
        { name: 'Fe (铁)', minValue: 0.5, maxValue: 1.0, unit: '%' },
        { name: 'Mn (锰)', maxValue: 1.0, unit: '%' },
      ],
    },
    {
      name: 'BZn15-20 锌白铜 (德银)',
      grade: 'BZn15-20',
      description: 'Cu-Ni-Zn系锌白铜，又称德银，具有银白色外观和良好弹性',
      properties: [
        { category: '机械', name: '抗拉强度 (软态)', minValue: 340, maxValue: 420, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (软态)', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率 (软态)', minValue: 35, maxValue: 50, unit: '%' },
        { category: '机械', name: '硬度 (软态)', minValue: 75, maxValue: 95, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 560, maxValue: 640, unit: 'MPa' },
        { category: '机械', name: '弹性极限', value: 200, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.70, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 5, maxValue: 7, unit: '%IACS' },
        { category: '热', name: '弹性模量', value: 125, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 62.0, maxValue: 65.0, unit: '%' },
        { name: 'Ni (镍)', minValue: 13.5, maxValue: 16.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 18.0, maxValue: 22.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: 'T2 纯铜',
      grade: 'T2',
      description: '工业纯铜，铜含量≥99.9%，具有优异导电性和导热性',
      properties: [
        { category: '机械', name: '抗拉强度 (退火)', minValue: 195, maxValue: 255, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (退火)', value: 60, unit: 'MPa' },
        { category: '机械', name: '延伸率 (退火)', minValue: 30, maxValue: 45, unit: '%' },
        { category: '机械', name: '硬度 (退火)', minValue: 40, maxValue: 55, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (硬态)', minValue: 290, maxValue: 380, unit: 'MPa' },
        { category: '物理', name: '密度', value: 8.96, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 98, maxValue: 101, unit: '%IACS' },
        { category: '热', name: '热导率', value: 390, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 1083, unit: '°C' },
        { category: '热', name: '弹性模量', value: 130, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Cu (铜)', minValue: 99.9, unit: '%' },
        { name: 'O (氧)', maxValue: 0.06, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.005, unit: '%' },
        { name: 'Pb (铅)', maxValue: 0.005, unit: '%' },
        { name: 'S (硫)', maxValue: 0.005, unit: '%' },
      ],
    },
  ];

  let addedCount = 0;

  for (const alloy of copperAlloys) {
    // 检查是否已存在
    const existing = await prisma.material.findFirst({
      where: {
        name: alloy.name,
        categoryId: copperCategory!.id,
      },
    });

    if (existing) {
      console.log(`⏭️  跳过已存在: ${alloy.name}`);
      continue;
    }

    // 创建材料
    const material = await prisma.material.create({
      data: {
        name: alloy.name,
        designation: alloy.grade,
        categoryId: copperCategory!.id,
        description: alloy.description,
      },
    });

    // 获取或创建属性类别
    const categoryNames = [...new Set(alloy.properties.map(p => p.category))];
    const categoryMap = new Map<string, string>();

    for (const catName of categoryNames) {
      let propCategory = await prisma.propertyCategory.findFirst({
        where: { name: catName },
      });

      if (!propCategory) {
        propCategory = await prisma.propertyCategory.create({
          data: { name: catName },
        });
      }
      categoryMap.set(catName, propCategory.id);
    }

    // 创建性能数据
    for (const prop of alloy.properties) {
      const categoryId = categoryMap.get(prop.category)!;
      await prisma.materialProperty.create({
        data: {
          materialId: material.id,
          categoryId: categoryId,
          propertyName: prop.name,
          minValue: prop.minValue ?? null,
          maxValue: prop.maxValue ?? null,
          value: prop.value ?? null,
          unit: prop.unit,
        },
      });
    }

    // 创建成分数据
    for (const comp of alloy.compositions) {
      await prisma.materialComposition.create({
        data: {
          materialId: material.id,
          element: comp.name,
          minValue: comp.minValue ?? null,
          maxValue: comp.maxValue ?? null,
          unit: comp.unit,
        },
      });
    }

    // 创建数据来源
    let source = await prisma.dataSource.findFirst({
      where: { title: 'MatWeb Database' },
    });

    if (!source) {
      source = await prisma.dataSource.create({
        data: {
          title: 'MatWeb Database',
          type: 'WEBSITE',
          url: 'https://www.matweb.com',
        },
      });
    }

    await prisma.materialDataSource.create({
      data: {
        materialId: material.id,
        sourceId: source.id,
      },
    });

    addedCount++;
    console.log(`✅ 添加: ${alloy.name}`);
  }

  const totalCopper = await prisma.material.count({
    where: { categoryId: copperCategory!.id },
  });

  console.log('\n✅ 铜合金材料扩展完成！');
  console.log(`铜合金总数: ${totalCopper} 种`);
  console.log(`新增材料: ${addedCount} 种`);
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
