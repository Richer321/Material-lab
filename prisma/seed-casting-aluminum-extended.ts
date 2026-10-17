import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展铸造铝合金材料...');

  // 获取金属材料类别
  const metalsCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalsCategory) {
    throw new Error('找不到金属材料类别');
  }

  // 获取或创建铸造铝合金子类别
  let castingAluminumCategory = await prisma.materialCategory.findFirst({
    where: { name: '铸造铝合金' },
  });

  if (!castingAluminumCategory) {
    castingAluminumCategory = await prisma.materialCategory.create({
      data: {
        name: '铸造铝合金',
        parentId: metalsCategory.id,
      },
    });
    console.log('✅ 创建铸造铝合金类别');
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

  // 铸造铝合金数据
  const castingAluminumAlloys = [
    {
      name: 'A356 铸造铝合金',
      designation: 'A356-T6',
      description: 'Al-Si-Mg系铸造铝合金，具有良好的铸造性能和力学性能，是最常用的铸造铝合金之一，用于汽车轮毂、发动机缸体、航空航天零件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T6)', minValue: 260, maxValue: 310, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T6)', minValue: 180, maxValue: 220, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T6)', minValue: 3, maxValue: 8, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T6)', minValue: 70, maxValue: 90, unit: 'HBW' },
        { categoryName: '机械', propertyName: '抗拉强度 (铸态)', minValue: 150, maxValue: 200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 95, unit: 'MPa' },
        { categoryName: '机械', propertyName: '剪切强度', value: 180, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.69, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 72, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率 (T6)', value: 150, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '熔点', value: 615, unit: '°C' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 92.0, unit: '%' },
        { element: 'Si (硅)', minValue: 6.5, maxValue: 7.5, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.25, maxValue: 0.45, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.20, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.10, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.10, unit: '%' },
        { element: 'Ti (钛)', maxValue: 0.20, unit: '%' },
      ],
    },
    {
      name: '356 铸造铝合金',
      designation: '356-T6',
      description: 'Al-Si-Mg系铸造铝合金，与A356相似，应用广泛，用于汽车零件、船舶部件、泵壳',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T6)', minValue: 230, maxValue: 290, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T6)', minValue: 160, maxValue: 200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T6)', minValue: 2, maxValue: 6, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T6)', minValue: 65, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '抗拉强度 (铸态)', minValue: 140, maxValue: 180, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.68, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 71, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 145, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 91.8, unit: '%' },
        { element: 'Si (硅)', minValue: 6.5, maxValue: 7.5, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.20, maxValue: 0.45, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.25, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.20, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.10, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.35, unit: '%' },
      ],
    },
    {
      name: 'A380 铸造铝合金',
      designation: 'A380-F',
      description: 'Al-Si-Cu系压铸铝合金，具有优异的铸造性能，是最常用的压铸铝合金，用于汽车发动机零件、变速箱壳体、电机壳体',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 310, maxValue: 330, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 150, maxValue: 170, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 2.5, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 75, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '抗压强度', value: 290, unit: 'MPa' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 120, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.74, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 70, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 100, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '熔点', value: 595, unit: '°C' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 86.5, unit: '%' },
        { element: 'Si (硅)', minValue: 7.5, maxValue: 9.5, unit: '%' },
        { element: 'Cu (铜)', minValue: 3.0, maxValue: 4.0, unit: '%' },
        { element: 'Fe (铁)', maxValue: 1.3, unit: '%' },
        { element: 'Zn (锌)', maxValue: 3.0, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.50, unit: '%' },
        { element: 'Ni (镍)', maxValue: 0.50, unit: '%' },
      ],
    },
    {
      name: '380 铸造铝合金',
      designation: '380-F',
      description: 'Al-Si-Cu系压铸铝合金，用途与A380类似，用于汽车零件、电器配件、电动工具',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 300, maxValue: 325, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 140, maxValue: 165, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 70, maxValue: 85, unit: 'HBW' },
        { categoryName: '物理', propertyName: '密度', value: 2.75, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 69, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 86.0, unit: '%' },
        { element: 'Si (硅)', minValue: 7.5, maxValue: 9.5, unit: '%' },
        { element: 'Cu (铜)', minValue: 3.0, maxValue: 4.0, unit: '%' },
        { element: 'Fe (铁)', maxValue: 2.0, unit: '%' },
        { element: 'Zn (锌)', maxValue: 3.0, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
      ],
    },
    {
      name: '319 铸造铝合金',
      designation: '319-F',
      description: 'Al-Si-Cu系铸造铝合金，具有良好的铸造性能和力学性能，用于发动机缸体、变速箱、气缸盖',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 240, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 130, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 1, maxValue: 3, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 70, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '抗拉强度 (砂铸T6)', minValue: 250, maxValue: 290, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (砂铸T6)', minValue: 165, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (砂铸T6)', minValue: 1.5, maxValue: 3, unit: '%' },
        { categoryName: '物理', propertyName: '密度', value: 2.79, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 72, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 86.8, unit: '%' },
        { element: 'Si (硅)', minValue: 5.5, maxValue: 6.5, unit: '%' },
        { element: 'Cu (铜)', minValue: 3.0, maxValue: 4.0, unit: '%' },
        { element: 'Fe (铁)', maxValue: 1.0, unit: '%' },
        { element: 'Zn (锌)', maxValue: 2.5, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.50, unit: '%' },
      ],
    },
    {
      name: '383 铸造铝合金',
      designation: '383-F',
      description: 'Al-Si-Cu系压铸铝合金，具有优异的压铸性能，用于复杂薄壁零件、汽车仪表盘、电子设备壳体',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 280, maxValue: 310, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 130, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 65, maxValue: 80, unit: 'HBW' },
        { categoryName: '物理', propertyName: '密度', value: 2.72, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '热导率', value: 96, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 87.5, unit: '%' },
        { element: 'Si (硅)', minValue: 9.5, maxValue: 11.5, unit: '%' },
        { element: 'Cu (铜)', minValue: 1.5, maxValue: 3.5, unit: '%' },
        { element: 'Fe (铁)', maxValue: 1.3, unit: '%' },
        { element: 'Zn (锌)', maxValue: 3.0, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.50, unit: '%' },
      ],
    },
    {
      name: '384 铸造铝合金',
      designation: '384-F',
      description: 'Al-Si-Cu系压铸铝合金，具有优异的流动性，用于精密压铸件、光学设备壳体、通讯设备',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 320, maxValue: 350, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 150, maxValue: 180, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 1.5, maxValue: 3, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 75, maxValue: 90, unit: 'HBW' },
        { categoryName: '物理', propertyName: '密度', value: 2.82, unit: 'g/cm³' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 85.5, unit: '%' },
        { element: 'Si (硅)', minValue: 10.5, maxValue: 12.0, unit: '%' },
        { element: 'Cu (铜)', minValue: 3.0, maxValue: 4.5, unit: '%' },
        { element: 'Fe (铁)', maxValue: 1.3, unit: '%' },
        { element: 'Zn (锌)', maxValue: 3.0, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.50, unit: '%' },
      ],
    },
    {
      name: '413 铸造铝合金',
      designation: '413-F',
      description: 'Al-Si系高硅铸造铝合金，具有优异的铸造性能和耐腐蚀性，用于船舶螺旋桨、厨具、薄壁铸件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 290, maxValue: 320, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 130, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 1.5, maxValue: 3.5, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 70, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '抗拉强度 (砂铸)', minValue: 200, maxValue: 230, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (砂铸)', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '物理', propertyName: '密度', value: 2.65, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 75, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 130, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 86.0, unit: '%' },
        { element: 'Si (硅)', minValue: 11.0, maxValue: 13.0, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.8, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.3, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.2, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: 'A360 铸造铝合金',
      designation: 'A360-F',
      description: 'Al-Si-Mg系压铸铝合金，具有优异的耐腐蚀性和韧性，用于船舶零件、食品设备、五金件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 300, maxValue: 320, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 170, maxValue: 190, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 2.5, maxValue: 5, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 70, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 110, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.63, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 73, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 130, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 91.0, unit: '%' },
        { element: 'Si (硅)', minValue: 9.0, maxValue: 10.0, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.40, maxValue: 0.60, unit: '%' },
        { element: 'Fe (铁)', maxValue: 1.3, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.25, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.50, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.15, unit: '%' },
      ],
    },
    {
      name: '360 铸造铝合金',
      designation: '360-F',
      description: 'Al-Si-Mg系压铸铝合金，用途与A360相似，用于汽车零件、建筑五金、厨具',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (压铸)', minValue: 290, maxValue: 310, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (压铸)', minValue: 165, maxValue: 185, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (压铸)', minValue: 2, maxValue: 4.5, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (压铸)', minValue: 68, maxValue: 82, unit: 'HBW' },
        { categoryName: '物理', propertyName: '密度', value: 2.65, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 72, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 90.8, unit: '%' },
        { element: 'Si (硅)', minValue: 9.0, maxValue: 10.0, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.40, maxValue: 0.60, unit: '%' },
        { element: 'Fe (铁)', maxValue: 2.0, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.60, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.50, unit: '%' },
      ],
    },
    {
      name: '518 铸造铝合金',
      designation: '518-F',
      description: 'Al-Mg系铸造铝合金，具有优异的耐腐蚀性和韧性，用于船舶、海洋设备、化工设备',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (砂铸)', minValue: 280, maxValue: 310, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (砂铸)', minValue: 150, maxValue: 170, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (砂铸)', minValue: 8, maxValue: 12, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (砂铸)', minValue: 60, maxValue: 75, unit: 'HBW' },
        { categoryName: '机械', propertyName: '冲击韧性', value: 40, unit: 'J' },
        { categoryName: '物理', propertyName: '密度', value: 2.57, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 68, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 85, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 92.3, unit: '%' },
        { element: 'Mg (镁)', minValue: 7.0, maxValue: 8.0, unit: '%' },
        { element: 'Si (硅)', maxValue: 0.20, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.25, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.10, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.10, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.10, unit: '%' },
      ],
    },
    {
      name: '206 铸造铝合金',
      designation: '206-T4',
      description: 'Al-Cu系高强铸造铝合金，具有优异的高温性能，用于航空发动机零件、导弹部件、高温结构件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T4)', minValue: 380, maxValue: 440, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T4)', minValue: 240, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T4)', minValue: 8, maxValue: 15, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T4)', minValue: 95, maxValue: 115, unit: 'HBW' },
        { categoryName: '机械', propertyName: '高温强度 (300°C)', minValue: 150, maxValue: 180, unit: 'MPa' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 115, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.80, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 76, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 120, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 92.5, unit: '%' },
        { element: 'Cu (铜)', minValue: 4.2, maxValue: 5.0, unit: '%' },
        { element: 'Mn (锰)', minValue: 0.20, maxValue: 0.40, unit: '%' },
        { element: 'Ti (钛)', minValue: 0.15, maxValue: 0.30, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.15, unit: '%' },
        { element: 'Si (硅)', maxValue: 0.10, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.10, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: '242 铸造铝合金',
      designation: '242-T4',
      description: 'Al-Cu-Ni系耐热铸造铝合金，具有优异的高温性能和耐磨性，用于发动机活塞、气缸、高温结构件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T4)', minValue: 290, maxValue: 330, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T4)', minValue: 195, maxValue: 230, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T4)', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T4)', minValue: 95, maxValue: 110, unit: 'HBW' },
        { categoryName: '机械', propertyName: '高温强度 (300°C)', minValue: 130, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '持久强度 (300°C/100h)', value: 80, unit: 'MPa' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 90, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.82, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 74, unit: 'GPa' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 22, unit: '×10⁻⁶/K' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 92.8, unit: '%' },
        { element: 'Cu (铜)', minValue: 3.5, maxValue: 4.5, unit: '%' },
        { element: 'Ni (镍)', minValue: 1.7, maxValue: 2.3, unit: '%' },
        { element: 'Mg (镁)', minValue: 1.2, maxValue: 1.8, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { element: 'Si (硅)', maxValue: 0.7, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.35, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.25, unit: '%' },
      ],
    },
    {
      name: 'ZL101 铸造铝合金',
      designation: 'ZL101-T6',
      description: 'Al-Si-Mg系国产铸造铝合金，相当于A356，具有良好的铸造性能和力学性能，用于汽车轮毂、发动机零件、电器壳体',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T6)', minValue: 230, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T6)', minValue: 160, maxValue: 200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T6)', minValue: 2, maxValue: 5, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T6)', minValue: 65, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '抗拉强度 (铸态)', minValue: 140, maxValue: 180, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.66, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 70, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 92.5, unit: '%' },
        { element: 'Si (硅)', minValue: 6.5, maxValue: 7.5, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.25, maxValue: 0.45, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.5, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.2, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.15, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.3, unit: '%' },
      ],
    },
    {
      name: 'ZL102 铸造铝合金',
      designation: 'ZL102-F',
      description: 'Al-Si系共晶铸造铝合金，具有优异的铸造性能，用于复杂薄壁铸件、厨具、仪表壳体',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (铸态)', minValue: 140, maxValue: 160, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (铸态)', minValue: 60, maxValue: 80, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (铸态)', minValue: 2, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (铸态)', minValue: 50, maxValue: 65, unit: 'HBW' },
        { categoryName: '物理', propertyName: '密度', value: 2.65, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '热导率', value: 150, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 89.0, unit: '%' },
        { element: 'Si (硅)', minValue: 10.0, maxValue: 13.0, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.8, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.6, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.10, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.3, unit: '%' },
      ],
    },
    {
      name: 'ZL104 铸造铝合金',
      designation: 'ZL104-T6',
      description: 'Al-Si-Mg-Mn系国产铸造铝合金，具有良好的力学性能和铸造性能，用于发动机缸体、气缸盖、变速箱壳体',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T6)', minValue: 220, maxValue: 270, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T6)', minValue: 150, maxValue: 190, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T6)', minValue: 1.5, maxValue: 4, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T6)', minValue: 65, maxValue: 80, unit: 'HBW' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 85, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.65, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 69, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 91.0, unit: '%' },
        { element: 'Si (硅)', minValue: 8.0, maxValue: 10.5, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.17, maxValue: 0.35, unit: '%' },
        { element: 'Mn (锰)', minValue: 0.2, maxValue: 0.5, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.6, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.3, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.3, unit: '%' },
      ],
    },
    {
      name: 'ZL105 铸造铝合金',
      designation: 'ZL105-T6',
      description: 'Al-Si-Cu-Mg系国产铸造铝合金，具有高强度和良好铸造性能，用于发动机活塞、气缸盖、高温结构件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T6)', minValue: 230, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T6)', minValue: 160, maxValue: 200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T6)', minValue: 1, maxValue: 2.5, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T6)', minValue: 70, maxValue: 85, unit: 'HBW' },
        { categoryName: '机械', propertyName: '高温强度 (300°C)', value: 110, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.68, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 70, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 92.0, unit: '%' },
        { element: 'Si (硅)', minValue: 4.5, maxValue: 5.5, unit: '%' },
        { element: 'Cu (铜)', minValue: 1.0, maxValue: 1.5, unit: '%' },
        { element: 'Mg (镁)', minValue: 0.35, maxValue: 0.60, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.6, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.5, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.3, unit: '%' },
      ],
    },
    {
      name: 'ZL201 铸造铝合金',
      designation: 'ZL201-T4',
      description: 'Al-Cu-Mn-Ti系国产高强度铸造铝合金，具有优异的力学性能，用于航空航天结构件、高强零件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (T4)', minValue: 330, maxValue: 390, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (T4)', minValue: 190, maxValue: 230, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (T4)', minValue: 4, maxValue: 8, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (T4)', minValue: 90, maxValue: 110, unit: 'HBW' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 95, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 2.78, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 74, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 93.0, unit: '%' },
        { element: 'Cu (铜)', minValue: 4.5, maxValue: 5.3, unit: '%' },
        { element: 'Mn (锰)', minValue: 0.6, maxValue: 1.0, unit: '%' },
        { element: 'Ti (钛)', minValue: 0.15, maxValue: 0.35, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.25, unit: '%' },
        { element: 'Si (硅)', maxValue: 0.15, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.20, unit: '%' },
        { element: 'Mg (镁)', maxValue: 0.05, unit: '%' },
      ],
    },
    {
      name: 'ZL301 铸造铝合金',
      designation: 'ZL301-F',
      description: 'Al-Mg系国产耐腐蚀铸造铝合金，具有优异的耐腐蚀性和韧性，用于船舶、海洋设备、化工设备',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (砂铸)', minValue: 270, maxValue: 300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (砂铸)', minValue: 140, maxValue: 170, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (砂铸)', minValue: 7, maxValue: 12, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (砂铸)', minValue: 55, maxValue: 70, unit: 'HBW' },
        { categoryName: '机械', propertyName: '冲击韧性', value: 35, unit: 'J' },
        { categoryName: '物理', propertyName: '密度', value: 2.55, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 66, unit: 'GPa' },
        { categoryName: '热', propertyName: '热导率', value: 90, unit: 'W/(m·K)' },
      ],
      compositions: [
        { element: 'Al (铝)', minValue: 93.5, unit: '%' },
        { element: 'Mg (镁)', minValue: 9.5, maxValue: 11.0, unit: '%' },
        { element: 'Si (硅)', maxValue: 0.3, unit: '%' },
        { element: 'Fe (铁)', maxValue: 0.3, unit: '%' },
        { element: 'Cu (铜)', maxValue: 0.1, unit: '%' },
        { element: 'Zn (锌)', maxValue: 0.1, unit: '%' },
        { element: 'Mn (锰)', maxValue: 0.15, unit: '%' },
      ],
    },
  ];

  let createdCount = 0;

  for (const alloy of castingAluminumAlloys) {
    console.log(`处理材料: ${alloy.name}`);

    // 检查材料是否已存在
    const existingMaterial = await prisma.material.findFirst({
      where: {
        name: alloy.name,
        designation: alloy.designation,
      },
    });

    if (existingMaterial) {
      console.log(`  ⚠️  材料已存在，跳过: ${alloy.name}`);
      continue;
    }

    // 创建材料
    const material = await prisma.material.create({
      data: {
        name: alloy.name,
        designation: alloy.designation,
        description: alloy.description,
        categoryId: castingAluminumCategory.id,
      },
    });

    // 创建性能数据
    for (const prop of alloy.properties) {
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
    for (const comp of alloy.compositions) {
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
    console.log(`  ✅ 创建成功: ${alloy.name}`);
  }

  console.log(`\n铸造铝合金扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种铸造铝合金材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展铸造铝合金失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
