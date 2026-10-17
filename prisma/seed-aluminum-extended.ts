import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展铝合金材料...');

  // 获取金属材料类别
  const metalsCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalsCategory) {
    throw new Error('找不到金属材料类别');
  }

  // 创建铝合金子类别
  let aluminumCategory = await prisma.materialCategory.findFirst({
    where: { name: '铝合金' },
  });

  if (!aluminumCategory) {
    aluminumCategory = await prisma.materialCategory.create({
      data: {
        name: '铝合金',
        parentId: metalsCategory.id,
      },
    });
    console.log('✅ 创建铝合金类别');
  }

  // 铝合金数据
  const aluminumAlloys = [
    {
      name: '1060 工业纯铝',
      grade: '1060',
      description: '工业纯铝，铝含量≥99.6%，具有良好的耐腐蚀性、导电性和导热性，用于导电排、化工设备',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 70, maxValue: 110, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 20, maxValue: 55, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 4, maxValue: 25, unit: '%' },
        { category: '机械', name: '硬度', minValue: 15, maxValue: 25, unit: 'HBW' },
        { category: '机械', name: '剪切强度', value: 55, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.70, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 55, maxValue: 60, unit: '%IACS' },
        { category: '热', name: '热导率', value: 220, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 660, unit: '°C' },
        { category: '热', name: '热膨胀系数', value: 23.6, unit: '×10⁻⁶/K' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 99.6, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.35, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.25, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.05, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: '1100 工业纯铝',
      grade: '1100',
      description: '工业纯铝，铝含量≥99.0%，具有优良的耐腐蚀性和成形性，用于炊具、化工设备',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 90, maxValue: 135, unit: 'MPa' },
        { category: '机械', name: '屈服强度', minValue: 30, maxValue: 120, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 3, maxValue: 30, unit: '%' },
        { category: '机械', name: '硬度', minValue: 20, maxValue: 35, unit: 'HBW' },
        { category: '机械', name: '疲劳强度', value: 35, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.71, unit: 'g/cm³' },
        { category: '电', name: '电导率', minValue: 57, maxValue: 59, unit: '%IACS' },
        { category: '热', name: '热导率', value: 220, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 643, unit: '°C' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 99.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.6, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.6, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.2, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '2024 铝铜合金 (硬铝)',
      grade: '2024-T4',
      description: 'Al-Cu-Mg系高强铝合金，是最早的航空用铝合金，用于飞机结构件、铆钉',
      properties: [
        { category: '机械', name: '抗拉强度 (T4)', minValue: 425, maxValue: 470, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T4)', value: 275, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T4)', minValue: 10, maxValue: 20, unit: '%' },
        { category: '机械', name: '硬度 (T4)', minValue: 115, maxValue: 125, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (T3)', minValue: 430, maxValue: 470, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 140, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.78, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 72, maxValue: 74, unit: 'GPa' },
        { category: '热', name: '热导率 (T4)', value: 120, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 90.7, unit: '%' },
        { name: 'Cu (铜)', minValue: 3.8, maxValue: 4.9, unit: '%' },
        { name: 'Mg (镁)', minValue: 1.2, maxValue: 1.8, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.3, maxValue: 0.9, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.5, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: '2017 铝铜合金',
      grade: '2017-T4',
      description: 'Al-Cu-Mg系硬铝，具有高强度和良好的切削性能，用于飞机结构件、螺栓',
      properties: [
        { category: '机械', name: '抗拉强度 (T4)', minValue: 370, maxValue: 430, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T4)', value: 220, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T4)', minValue: 10, maxValue: 16, unit: '%' },
        { category: '机械', name: '硬度 (T4)', minValue: 100, maxValue: 115, unit: 'HBW' },
        { category: '物理', name: '密度', value: 2.79, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 74, unit: 'GPa' },
        { category: '热', name: '热导率 (T4)', value: 130, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 91.5, unit: '%' },
        { name: 'Cu (铜)', minValue: 3.5, maxValue: 4.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 0.4, maxValue: 1.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.4, maxValue: 1.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.7, unit: '%' },
        { name: 'Si (硅)', minValue: 0.2, maxValue: 0.8, unit: '%' },
      ],
    },
    {
      name: '2A12 铝铜合金 (LY12)',
      grade: '2A12-T4',
      description: '国产硬铝，相当于2024，是应用最广的航空结构铝合金',
      properties: [
        { category: '机械', name: '抗拉强度 (T4)', minValue: 420, maxValue: 460, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T4)', value: 280, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T4)', minValue: 10, maxValue: 15, unit: '%' },
        { category: '机械', name: '硬度 (T4)', value: 120, unit: 'HBW' },
        { category: '机械', name: '剪切强度', value: 265, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.78, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 73, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 90.5, unit: '%' },
        { name: 'Cu (铜)', minValue: 3.8, maxValue: 4.9, unit: '%' },
        { name: 'Mg (镁)', minValue: 1.2, maxValue: 1.8, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.3, maxValue: 0.9, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '3003 铝锰合金 (防锈铝)',
      grade: '3003-H14',
      description: 'Al-Mn系防锈铝，具有优良的耐腐蚀性和加工性能，用于化工设备、食品容器',
      properties: [
        { category: '机械', name: '抗拉强度 (H14)', minValue: 140, maxValue: 160, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (H14)', value: 120, unit: 'MPa' },
        { category: '机械', name: '延伸率 (H14)', minValue: 3, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (H14)', minValue: 35, maxValue: 45, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (O)', minValue: 100, maxValue: 130, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.73, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 190, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', minValue: 643, maxValue: 654, unit: '°C' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 97.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 1.0, maxValue: 1.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.7, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.6, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.2, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '3004 铝锰合金',
      grade: '3004-H34',
      description: 'Al-Mg-Mn系防锈铝，强度高于3003，用于易拉罐、建筑材料',
      properties: [
        { category: '机械', name: '抗拉强度 (H34)', minValue: 210, maxValue: 250, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (H34)', value: 170, unit: 'MPa' },
        { category: '机械', name: '延伸率 (H34)', minValue: 4, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (H34)', minValue: 55, maxValue: 65, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (O)', minValue: 170, maxValue: 210, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.72, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 160, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 96.5, unit: '%' },
        { name: 'Mn (锰)', minValue: 1.0, maxValue: 1.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 0.8, maxValue: 1.3, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.7, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.3, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: '3A21 铝锰合金 (LF21)',
      grade: '3A21-O',
      description: '国产防锈铝，相当于3003，应用广泛的低强铝合金',
      properties: [
        { category: '机械', name: '抗拉强度 (O)', minValue: 100, maxValue: 150, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (O)', value: 40, unit: 'MPa' },
        { category: '机械', name: '延伸率 (O)', minValue: 18, maxValue: 22, unit: '%' },
        { category: '机械', name: '硬度 (O)', minValue: 25, maxValue: 35, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (H14)', minValue: 140, maxValue: 180, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.73, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 190, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 96.8, unit: '%' },
        { name: 'Mn (锰)', minValue: 1.0, maxValue: 1.6, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.7, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.6, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: '5052 铝镁合金 (防锈铝)',
      grade: '5052-H32',
      description: 'Al-Mg系防锈铝，具有优良耐腐蚀性和疲劳性能，用于船舶、汽车',
      properties: [
        { category: '机械', name: '抗拉强度 (H32)', minValue: 210, maxValue: 260, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (H32)', value: 180, unit: 'MPa' },
        { category: '机械', name: '延伸率 (H32)', minValue: 7, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度 (H32)', minValue: 60, maxValue: 75, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (O)', minValue: 170, maxValue: 215, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 115, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.68, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 70, unit: 'GPa' },
        { category: '热', name: '热导率', value: 138, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 95.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 2.2, maxValue: 2.8, unit: '%' },
        { name: 'Cr (铬)', minValue: 0.15, maxValue: 0.35, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.4, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.25, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.1, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '5083 铝镁合金',
      grade: '5083-H116',
      description: 'Al-Mg-Mn系高强防锈铝，具有优异的耐海水腐蚀性，用于船舶、舰艇',
      properties: [
        { category: '机械', name: '抗拉强度 (H116)', minValue: 270, maxValue: 340, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (H116)', value: 200, unit: 'MPa' },
        { category: '机械', name: '延伸率 (H116)', minValue: 10, maxValue: 16, unit: '%' },
        { category: '机械', name: '硬度 (H116)', minValue: 80, maxValue: 95, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (O)', minValue: 270, maxValue: 320, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 150, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.66, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 72, unit: 'GPa' },
        { category: '热', name: '热导率', value: 120, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 93.8, unit: '%' },
        { name: 'Mg (镁)', minValue: 4.0, maxValue: 4.9, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.4, maxValue: 1.0, unit: '%' },
        { name: 'Cr (铬)', minValue: 0.05, maxValue: 0.25, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.4, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.4, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.1, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: '5A06 铝镁合金 (LF6)',
      grade: '5A06-O',
      description: '国产高镁防锈铝，具有高强度和耐海水腐蚀性，用于船舶、化工',
      properties: [
        { category: '机械', name: '抗拉强度 (O)', minValue: 310, maxValue: 350, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (O)', value: 160, unit: 'MPa' },
        { category: '机械', name: '延伸率 (O)', minValue: 12, maxValue: 16, unit: '%' },
        { category: '机械', name: '硬度 (O)', minValue: 80, maxValue: 95, unit: 'HBW' },
        { category: '机械', name: '剪切强度', value: 190, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.64, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 71, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 92.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 5.8, maxValue: 6.8, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.5, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.4, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.4, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.2, unit: '%' },
        { name: 'Ti (钛)', minValue: 0.02, maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '5A03 铝镁合金 (LF3)',
      grade: '5A03-O',
      description: '国产防锈铝，具有良好焊接性和耐腐蚀性，用于液体容器、船舶',
      properties: [
        { category: '机械', name: '抗拉强度 (O)', minValue: 180, maxValue: 210, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (O)', value: 80, unit: 'MPa' },
        { category: '机械', name: '延伸率 (O)', minValue: 12, maxValue: 18, unit: '%' },
        { category: '机械', name: '硬度 (O)', minValue: 45, maxValue: 55, unit: 'HBW' },
        { category: '物理', name: '密度', value: 2.67, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 70, unit: 'GPa' },
        { category: '热', name: '热导率', value: 150, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 96.0, unit: '%' },
        { name: 'Mg (镁)', minValue: 3.2, maxValue: 3.8, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.3, maxValue: 0.6, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Si (硅)', minValue: 0.5, maxValue: 0.8, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: '6061 铝镁硅合金 (锻铝)',
      grade: '6061-T6',
      description: 'Al-Mg-Si系锻铝，具有优良的综合性能，是最常用的结构铝合金',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 285, maxValue: 310, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 240, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 10, maxValue: 15, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 90, maxValue: 105, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (T4)', minValue: 220, maxValue: 250, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 95, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.70, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 68, maxValue: 70, unit: 'GPa' },
        { category: '热', name: '热导率 (T6)', value: 150, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 582, unit: '°C' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 96.0, unit: '%' },
        { name: 'Mg (镁)', minValue: 0.8, maxValue: 1.2, unit: '%' },
        { name: 'Si (硅)', minValue: 0.4, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.7, unit: '%' },
        { name: 'Cu (铜)', minValue: 0.15, maxValue: 0.4, unit: '%' },
        { name: 'Cr (铬)', minValue: 0.04, maxValue: 0.35, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.25, unit: '%' },
        { name: 'Ti (钛)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: '6063 铝镁硅合金',
      grade: '6063-T5',
      description: 'Al-Mg-Si系铝合金，具有优良挤压性能和耐腐蚀性，用于建筑型材',
      properties: [
        { category: '机械', name: '抗拉强度 (T5)', minValue: 155, maxValue: 185, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T5)', value: 110, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T5)', minValue: 8, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度 (T5)', minValue: 55, maxValue: 65, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (T6)', minValue: 205, maxValue: 240, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.69, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 69, unit: 'GPa' },
        { category: '热', name: '热导率', value: 190, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 97.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 0.45, maxValue: 0.9, unit: '%' },
        { name: 'Si (硅)', minValue: 0.2, maxValue: 0.6, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.35, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.1, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.1, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: '6A02 铝镁硅合金 (LD2)',
      grade: '6A02-T6',
      description: '国产锻铝，相当于6061，具有良好的塑性和耐腐蚀性',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 295, maxValue: 320, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 220, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 10, maxValue: 14, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 85, maxValue: 95, unit: 'HBW' },
        { category: '物理', name: '密度', value: 2.70, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 70, unit: 'GPa' },
        { category: '热', name: '热导率', value: 155, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 96.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 0.45, maxValue: 0.9, unit: '%' },
        { name: 'Si (硅)', minValue: 0.5, maxValue: 1.2, unit: '%' },
        { name: 'Cu (铜)', minValue: 0.2, maxValue: 0.6, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.15, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: '6082 铝镁硅合金',
      grade: '6082-T6',
      description: 'Al-Mg-Si系高强铝合金，欧洲标准，用于结构件、车辆',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 290, maxValue: 330, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 250, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 8, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 95, maxValue: 110, unit: 'HBW' },
        { category: '机械', name: '疲劳强度', value: 110, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.71, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 71, unit: 'GPa' },
        { category: '热', name: '热导率', value: 160, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 95.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 0.6, maxValue: 1.2, unit: '%' },
        { name: 'Si (硅)', minValue: 0.7, maxValue: 1.3, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.4, maxValue: 1.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.1, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.2, unit: '%' },
        { name: 'Cr (铬)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: '7075 铝锌合金 (超硬铝)',
      grade: '7075-T6',
      description: 'Al-Zn-Mg-Cu系超硬铝，是目前强度最高的铝合金，用于航空结构件',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 520, maxValue: 570, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 450, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 10, maxValue: 13, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 145, maxValue: 160, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (T73)', minValue: 450, maxValue: 500, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 155, unit: 'MPa' },
        { category: '机械', name: '断裂韧度 KIC', minValue: 25, maxValue: 30, unit: 'MPa·m¹/²' },
        { category: '物理', name: '密度', value: 2.81, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', minValue: 70, maxValue: 72, unit: 'GPa' },
        { category: '热', name: '热导率 (T6)', value: 130, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 477, unit: '°C' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 89.2, unit: '%' },
        { name: 'Zn (锌)', minValue: 5.1, maxValue: 6.1, unit: '%' },
        { name: 'Mg (镁)', minValue: 2.1, maxValue: 2.9, unit: '%' },
        { name: 'Cu (铜)', minValue: 1.2, maxValue: 2.0, unit: '%' },
        { name: 'Cr (铬)', minValue: 0.18, maxValue: 0.28, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.4, unit: '%' },
        { name: 'Mn (锰)', maxValue: 0.3, unit: '%' },
        { name: 'Ti (钛)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: '7A04 铝锌合金 (LC4)',
      grade: '7A04-T6',
      description: '国产超硬铝，相当于7075，用于飞机结构件、模具',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 490, maxValue: 540, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 400, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 6, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 130, maxValue: 150, unit: 'HBW' },
        { category: '机械', name: '剪切强度', value: 290, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.85, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 71, unit: 'GPa' },
        { category: '热', name: '热导率', value: 125, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 88.8, unit: '%' },
        { name: 'Zn (锌)', minValue: 5.0, maxValue: 7.0, unit: '%' },
        { name: 'Mg (镁)', minValue: 1.8, maxValue: 2.8, unit: '%' },
        { name: 'Cu (铜)', minValue: 1.4, maxValue: 2.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.2, maxValue: 0.6, unit: '%' },
        { name: 'Cr (铬)', minValue: 0.1, maxValue: 0.25, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.5, unit: '%' },
      ],
    },
    {
      name: '7A09 铝锌合金 (LC9)',
      grade: '7A09-T6',
      description: '国产超硬铝，高强度Al-Zn-Mg-Cu系合金，用于航空结构件',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 510, maxValue: 560, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 430, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 6, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 135, maxValue: 155, unit: 'HBW' },
        { category: '机械', name: '剪切强度', value: 285, unit: 'MPa' },
        { category: '物理', name: '密度', value: 2.84, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 70, unit: 'GPa' },
        { category: '热', name: '热导率', value: 128, unit: 'W/(m·K)' },
      ],
      compositions: [
        { name: 'Al (铝)', minValue: 89.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 5.0, maxValue: 6.5, unit: '%' },
        { name: 'Mg (镁)', minValue: 2.0, maxValue: 3.0, unit: '%' },
        { name: 'Cu (铜)', minValue: 1.2, maxValue: 2.0, unit: '%' },
        { name: 'Cr (铬)', minValue: 0.15, maxValue: 0.25, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.5, unit: '%' },
      ],
    },
  ];

  let addedCount = 0;

  for (const alloy of aluminumAlloys) {
    // 检查是否已存在
    const existing = await prisma.material.findFirst({
      where: {
        name: alloy.name,
        categoryId: aluminumCategory!.id,
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
        categoryId: aluminumCategory!.id,
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

  const totalAluminum = await prisma.material.count({
    where: { categoryId: aluminumCategory!.id },
  });

  console.log('\n✅ 铝合金材料扩展完成！');
  console.log(`铝合金总数: ${totalAluminum} 种`);
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
