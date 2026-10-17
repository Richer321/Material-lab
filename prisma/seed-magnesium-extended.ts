import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展镁合金材料...');

  // 获取金属材料类别
  const metalsCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalsCategory) {
    throw new Error('找不到金属材料类别');
  }

  // 创建镁合金子类别
  let magnesiumCategory = await prisma.materialCategory.findFirst({
    where: { name: '镁合金' },
  });

  if (!magnesiumCategory) {
    magnesiumCategory = await prisma.materialCategory.create({
      data: {
        name: '镁合金',
        parentId: metalsCategory.id,
      },
    });
    console.log('✅ 创建镁合金类别');
  }

  // 镁合金数据
  const magnesiumAlloys = [
    {
      name: 'AZ31 镁铝锌合金',
      grade: 'AZ31B',
      description: 'Mg-Al-Zn系变形镁合金，具有良好的强度和塑性，是最常用的镁合金之一',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 230, maxValue: 260, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 150, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, maxValue: 15, unit: '%' },
        { category: '机械', name: '硬度', minValue: 45, maxValue: 60, unit: 'HBW' },
        { category: '机械', name: '压缩屈服强度', value: 90, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.78, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 77, unit: 'W/(m·K)' },
        { category: '热', name: '熔点', value: 650, unit: '°C' },
        { category: '热', name: '热膨胀系数', value: 26, unit: '×10⁻⁶/K' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 95.5, maxValue: 96.5, unit: '%' },
        { name: 'Al (铝)', minValue: 2.5, maxValue: 3.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.6, maxValue: 1.4, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.2, maxValue: 1.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.005, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.005, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'AZ61 镁铝锌合金',
      grade: 'AZ61',
      description: 'Mg-Al-Zn系高强变形镁合金，强度高于AZ31，用于结构件',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 280, maxValue: 310, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 180, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 8, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度', minValue: 55, maxValue: 70, unit: 'HBW' },
        { category: '机械', name: '压缩屈服强度', value: 110, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.80, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 72, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 93.0, maxValue: 94.5, unit: '%' },
        { name: 'Al (铝)', minValue: 5.5, maxValue: 6.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.5, maxValue: 1.5, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.15, maxValue: 0.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.002, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'AZ91 镁铝锌合金',
      grade: 'AZ91D',
      description: 'Mg-Al-Zn系铸造镁合金，是应用最广的镁合金，用于汽车、电子产品外壳',
      properties: [
        { category: '机械', name: '抗拉强度 (铸态)', minValue: 200, maxValue: 250, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (铸态)', value: 150, unit: 'MPa' },
        { category: '机械', name: '延伸率 (铸态)', minValue: 3, maxValue: 6, unit: '%' },
        { category: '机械', name: '硬度 (铸态)', minValue: 60, maxValue: 75, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (时效)', minValue: 230, maxValue: 280, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', value: 160, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.81, unit: 'g/cm³' },
        { category: '热', name: '热导率', value: 72, unit: 'W/(m·K)' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 89.5, maxValue: 91.0, unit: '%' },
        { name: 'Al (铝)', minValue: 8.3, maxValue: 9.7, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.35, maxValue: 1.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.15, maxValue: 0.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.005, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.002, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.03, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: 'ZK60 镁锌锆合金',
      grade: 'ZK60',
      description: 'Mg-Zn-Zr系高强度变形镁合金，具有优异的强度和韧性',
      properties: [
        { category: '机械', name: '抗拉强度 (T5)', minValue: 310, maxValue: 340, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T5)', value: 250, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T5)', minValue: 4, maxValue: 8, unit: '%' },
        { category: '机械', name: '硬度 (T5)', minValue: 65, maxValue: 80, unit: 'HBW' },
        { category: '机械', name: '抗拉强度 (时效)', minValue: 340, maxValue: 370, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', value: 280, unit: 'MPa' },
        { category: '机械', name: '疲劳强度', value: 140, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.83, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 94.5, maxValue: 96.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 4.5, maxValue: 5.5, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.45, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.005, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'ZK30 镁锌锆合金',
      grade: 'ZK30',
      description: 'Mg-Zn-Zr系变形镁合金，具有良好的塑性和焊接性能',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 260, maxValue: 290, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 180, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 8, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度', minValue: 50, maxValue: 65, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.82, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 44, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 96.0, maxValue: 97.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 2.8, maxValue: 3.5, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.45, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.005, unit: '%' },
      ],
    },
    {
      name: 'AM50 镁铝锰合金',
      grade: 'AM50A',
      description: 'Mg-Al-Mn系高韧性铸造镁合金，用于汽车安全件',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 210, maxValue: 240, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 125, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, maxValue: 15, unit: '%' },
        { category: '机械', name: '硬度', minValue: 55, maxValue: 65, unit: 'HBW' },
        { category: '机械', name: '冲击韧性', value: 15, unit: 'J' },
        { category: '物理', name: '密度', value: 1.78, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 94.0, maxValue: 95.5, unit: '%' },
        { name: 'Al (铝)', minValue: 4.4, maxValue: 5.6, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.25, maxValue: 0.55, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.22, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.004, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.002, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.01, unit: '%' },
      ],
    },
    {
      name: 'AM60 镁铝锰合金',
      grade: 'AM60B',
      description: 'Mg-Al-Mn系铸造镁合金，具有高强度和良好韧性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 220, maxValue: 260, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 8, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度', minValue: 58, maxValue: 72, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.79, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 93.0, maxValue: 94.5, unit: '%' },
        { name: 'Al (铝)', minValue: 5.5, maxValue: 6.5, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.2, maxValue: 0.5, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.22, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.005, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.002, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.01, unit: '%' },
      ],
    },
    {
      name: 'WE43 稀土镁合金',
      grade: 'WE43',
      description: 'Mg-RE-Zr系高温高强镁合金，具有优异的耐蠕变性能',
      properties: [
        { category: '机械', name: '抗拉强度 (T6)', minValue: 250, maxValue: 290, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T6)', value: 170, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T6)', minValue: 4, maxValue: 8, unit: '%' },
        { category: '机械', name: '硬度 (T6)', minValue: 60, maxValue: 80, unit: 'HBW' },
        { category: '机械', name: '高温强度 (250°C)', value: 150, unit: 'MPa' },
        { category: '机械', name: '持久强度 (250°C/100h)', value: 90, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.84, unit: 'g/cm³' },
        { category: '热', name: '工作温度', maxValue: 250, unit: '°C' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 94.0, maxValue: 96.0, unit: '%' },
        { name: 'Y (钇)', minValue: 3.7, maxValue: 4.3, unit: '%' },
        { name: 'RE (稀土)', minValue: 2.8, maxValue: 3.5, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.4, maxValue: 1.0, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.005, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.03, unit: '%' },
      ],
    },
    {
      name: 'MB1 镁锰合金',
      grade: 'MB1',
      description: '国产变形镁合金，具有良好的焊接性和耐腐蚀性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 170, maxValue: 190, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 80, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 5, maxValue: 8, unit: '%' },
        { category: '机械', name: '硬度', minValue: 40, maxValue: 50, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.76, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 43, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 98.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 1.5, maxValue: 2.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.1, unit: '%' },
        { name: 'Al (铝)', maxValue: 0.2, unit: '%' },
        { name: 'Zn (锌)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: 'MB2 镁铝锰合金',
      grade: 'MB2',
      description: '国产变形镁合金，强度高于MB1，用于受力件',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 220, maxValue: 250, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 120, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 6, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度', minValue: 45, maxValue: 60, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.78, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 44, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 95.5, maxValue: 96.5, unit: '%' },
        { name: 'Al (铝)', minValue: 3.0, maxValue: 4.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.15, maxValue: 0.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.2, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: 'MB3 镁铝锰合金',
      grade: 'MB3',
      description: '国产变形镁合金，具有良好强度和塑性',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 240, maxValue: 270, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 8, maxValue: 12, unit: '%' },
        { category: '机械', name: '硬度', minValue: 50, maxValue: 65, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.79, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 94.0, maxValue: 95.5, unit: '%' },
        { name: 'Al (铝)', minValue: 3.5, maxValue: 4.5, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.3, maxValue: 0.6, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.5, maxValue: 1.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: 'MB8 镁锰合金',
      grade: 'MB8',
      description: '国产变形镁合金，含Ce稀土，改善耐热性能',
      properties: [
        { category: '机械', name: '抗拉强度', minValue: 210, maxValue: 240, unit: 'MPa' },
        { category: '机械', name: '屈服强度', value: 100, unit: 'MPa' },
        { category: '机械', name: '延伸率', minValue: 10, maxValue: 15, unit: '%' },
        { category: '机械', name: '硬度', minValue: 45, maxValue: 55, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.78, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 44, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 97.0, unit: '%' },
        { name: 'Mn (锰)', minValue: 1.3, maxValue: 2.2, unit: '%' },
        { name: 'Ce (铈)', minValue: 0.15, maxValue: 0.35, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.1, unit: '%' },
        { name: 'Al (铝)', maxValue: 0.2, unit: '%' },
      ],
    },
    {
      name: 'MB15 镁锌锆合金',
      grade: 'MB15',
      description: '国产高强度变形镁合金，相当于ZK60',
      properties: [
        { category: '机械', name: '抗拉强度 (时效)', minValue: 320, maxValue: 350, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', value: 250, unit: 'MPa' },
        { category: '机械', name: '延伸率 (时效)', minValue: 6, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (时效)', minValue: 65, maxValue: 80, unit: 'HBW' },
        { category: '机械', name: '疲劳强度', value: 130, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.82, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 94.5, maxValue: 96.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 4.8, maxValue: 6.2, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.45, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.005, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'ZM1 镁锌锆合金',
      grade: 'ZM1',
      description: '国产铸造镁合金，高强度型',
      properties: [
        { category: '机械', name: '抗拉强度 (T1)', minValue: 230, maxValue: 260, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (T1)', value: 140, unit: 'MPa' },
        { category: '机械', name: '延伸率 (T1)', minValue: 5, maxValue: 10, unit: '%' },
        { category: '机械', name: '硬度 (T1)', minValue: 55, maxValue: 70, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.82, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 96.0, maxValue: 97.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 3.5, maxValue: 5.5, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.5, maxValue: 1.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.005, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.1, unit: '%' },
      ],
    },
    {
      name: 'ZM2 镁锌锆合金',
      grade: 'ZM2',
      description: '国产铸造镁合金，含稀土，高温性能好',
      properties: [
        { category: '机械', name: '抗拉强度 (常温)', minValue: 190, maxValue: 220, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (常温)', value: 130, unit: 'MPa' },
        { category: '机械', name: '延伸率 (常温)', minValue: 2.5, maxValue: 4, unit: '%' },
        { category: '机械', name: '抗拉强度 (200°C)', value: 145, unit: 'MPa' },
        { category: '机械', name: '持久强度 (200°C/100h)', value: 110, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.85, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 44, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 95.0, maxValue: 96.5, unit: '%' },
        { name: 'Zn (锌)', minValue: 3.5, maxValue: 5.0, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.5, maxValue: 1.0, unit: '%' },
        { name: 'RE (稀土)', minValue: 0.75, maxValue: 1.75, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
      ],
    },
    {
      name: 'ZM3 镁稀土合金',
      grade: 'ZM3',
      description: '国产铸造镁合金，高稀土含量，优异耐热性能',
      properties: [
        { category: '机械', name: '抗拉强度 (常温)', minValue: 140, maxValue: 160, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (常温)', value: 90, unit: 'MPa' },
        { category: '机械', name: '延伸率 (常温)', minValue: 2, maxValue: 3, unit: '%' },
        { category: '机械', name: '抗拉强度 (250°C)', value: 130, unit: 'MPa' },
        { category: '机械', name: '持久强度 (250°C/100h)', value: 80, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.86, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 43, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 94.0, maxValue: 96.0, unit: '%' },
        { name: 'RE (稀土)', minValue: 2.5, maxValue: 4.0, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.5, maxValue: 1.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.2, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
      ],
    },
    {
      name: 'ZM4 镁稀土合金',
      grade: 'ZM4',
      description: '国产铸造镁合金，耐热型',
      properties: [
        { category: '机械', name: '抗拉强度 (常温)', minValue: 150, maxValue: 170, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (常温)', value: 100, unit: 'MPa' },
        { category: '机械', name: '延伸率 (常温)', minValue: 2, maxValue: 3, unit: '%' },
        { category: '机械', name: '抗拉强度 (200°C)', value: 150, unit: 'MPa' },
        { category: '机械', name: '持久强度 (200°C/100h)', value: 100, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.85, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 44, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 93.5, maxValue: 95.5, unit: '%' },
        { name: 'RE (稀土)', minValue: 2.0, maxValue: 3.0, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.5, maxValue: 1.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 2.0, maxValue: 3.0, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
      ],
    },
    {
      name: 'ZM5 镁铝锰合金',
      grade: 'ZM5',
      description: '国产铸造镁合金，相当于AZ91，应用最广',
      properties: [
        { category: '机械', name: '抗拉强度 (铸态)', minValue: 150, maxValue: 170, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (铸态)', value: 90, unit: 'MPa' },
        { category: '机械', name: '延伸率 (铸态)', minValue: 2, maxValue: 3, unit: '%' },
        { category: '机械', name: '抗拉强度 (时效)', minValue: 230, maxValue: 260, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', value: 150, unit: 'MPa' },
        { category: '机械', name: '硬度 (时效)', minValue: 60, maxValue: 75, unit: 'HBW' },
        { category: '物理', name: '密度', value: 1.81, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 89.0, maxValue: 91.0, unit: '%' },
        { name: 'Al (铝)', minValue: 7.5, maxValue: 9.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.2, maxValue: 0.8, unit: '%' },
        { name: 'Mn (锰)', minValue: 0.15, maxValue: 0.5, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.05, unit: '%' },
        { name: 'Ni (镍)', maxValue: 0.01, unit: '%' },
        { name: 'Cu (铜)', maxValue: 0.1, unit: '%' },
        { name: 'Si (硅)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: 'ZM6 镁稀土锌合金',
      grade: 'ZM6',
      description: '国产高强度铸造镁合金，含稀土和锆',
      properties: [
        { category: '机械', name: '抗拉强度 (时效)', minValue: 260, maxValue: 290, unit: 'MPa' },
        { category: '机械', name: '屈服强度 (时效)', value: 160, unit: 'MPa' },
        { category: '机械', name: '延伸率 (时效)', minValue: 4, maxValue: 8, unit: '%' },
        { category: '机械', name: '硬度 (时效)', minValue: 60, maxValue: 75, unit: 'HBW' },
        { category: '机械', name: '持久强度 (200°C/100h)', value: 110, unit: 'MPa' },
        { category: '物理', name: '密度', value: 1.84, unit: 'g/cm³' },
        { category: '热', name: '弹性模量', value: 45, unit: 'GPa' },
      ],
      compositions: [
        { name: 'Mg (镁)', minValue: 93.0, maxValue: 95.0, unit: '%' },
        { name: 'RE (稀土)', minValue: 2.0, maxValue: 3.0, unit: '%' },
        { name: 'Zn (锌)', minValue: 0.2, maxValue: 0.7, unit: '%' },
        { name: 'Zr (锆)', minValue: 0.4, maxValue: 0.8, unit: '%' },
        { name: 'Fe (铁)', maxValue: 0.01, unit: '%' },
      ],
    },
  ];

  let addedCount = 0;

  for (const alloy of magnesiumAlloys) {
    // 检查是否已存在
    const existing = await prisma.material.findFirst({
      where: {
        name: alloy.name,
        categoryId: magnesiumCategory!.id,
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
        categoryId: magnesiumCategory!.id,
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

  const totalMagnesium = await prisma.material.count({
    where: { categoryId: magnesiumCategory!.id },
  });

  console.log('\n✅ 镁合金材料扩展完成！');
  console.log(`镁合金总数: ${totalMagnesium} 种`);
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
