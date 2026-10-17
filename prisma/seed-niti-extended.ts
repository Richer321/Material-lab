import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始扩展镍钛合金材料...');

  // 获取金属材料类别
  const metalsCategory = await prisma.materialCategory.findFirst({
    where: { name: '金属材料' },
  });

  if (!metalsCategory) {
    throw new Error('找不到金属材料类别');
  }

  // 获取或创建镍钛合金子类别
  let nitiCategory = await prisma.materialCategory.findFirst({
    where: { name: '镍钛合金' },
  });

  if (!nitiCategory) {
    nitiCategory = await prisma.materialCategory.create({
      data: {
        name: '镍钛合金',
        parentId: metalsCategory.id,
      },
    });
    console.log('✅ 创建镍钛合金类别');
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

  // 镍钛合金数据
  const nitiAlloys = [
    {
      name: 'NiTi 近等原子比形状记忆合金',
      designation: 'NiTi-50.8at%',
      description: 'Ni-Ti系形状记忆合金，具有优异的形状记忆效应和超弹性，用于医疗支架、骨科植入物、智能器件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 800, maxValue: 1100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 100, maxValue: 250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 25, maxValue: 40, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 180, maxValue: 250, unit: 'HV' },
        { categoryName: '机械', propertyName: '抗拉强度 (冷加工)', minValue: 1200, maxValue: 1400, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (冷加工)', minValue: 800, maxValue: 1000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (冷加工)', minValue: 5, maxValue: 15, unit: '%' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 400, unit: 'MPa' },
        { categoryName: '机械', propertyName: '弹性模量 (奥氏体)', value: 70, unit: 'GPa' },
        { categoryName: '机械', propertyName: '弹性模量 (马氏体)', value: 30, unit: 'GPa' },
        { categoryName: '机械', propertyName: '剪切模量', value: 26, unit: 'GPa' },
        { categoryName: '热', propertyName: '相变温度 (As)', minValue: -10, maxValue: 80, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 10, maxValue: 100, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Ms)', minValue: -20, maxValue: 60, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Mf)', minValue: -40, maxValue: 40, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.45, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '熔点', value: 1310, unit: '°C' },
        { categoryName: '热', propertyName: '热导率', value: 10, unit: 'W/(m·K)' },
        { categoryName: '热', propertyName: '热膨胀系数 (奥氏体)', value: 11, unit: '×10⁻⁶/K' },
        { categoryName: '电', propertyName: '电阻率 (奥氏体)', value: 100, unit: 'μΩ·cm' },
        { categoryName: '电', propertyName: '电阻率 (马氏体)', value: 70, unit: 'μΩ·cm' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.0, maxValue: 56.0, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 44.0, maxValue: 45.0, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 超弹性合金',
      designation: 'NiTi-SE',
      description: 'Ni-Ti系超弹性合金，具有优异的超弹性和抗疲劳性能，用于医用导丝、眼镜架、手机天线、天线',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (时效)', minValue: 900, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (时效)', minValue: 400, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (时效)', minValue: 15, maxValue: 30, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (时效)', minValue: 200, maxValue: 300, unit: 'HV' },
        { categoryName: '机械', propertyName: '超弹性应变', minValue: 6, maxValue: 8, unit: '%' },
        { categoryName: '机械', propertyName: '回复应力', minValue: 500, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '疲劳寿命 (2%应变)', value: 10000000, unit: '次' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 500, unit: 'MPa' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: -5, maxValue: 15, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.48, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 65, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.5, maxValue: 56.5, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.5, maxValue: 44.5, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 形状记忆合金 (高温型)',
      designation: 'NiTi-HT',
      description: 'Ni-Ti系高温形状记忆合金，相变温度高于室温，用于汽车执行器、航空航天、高温智能器件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 750, maxValue: 1000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 150, maxValue: 300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 20, maxValue: 35, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 170, maxValue: 240, unit: 'HV' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 4, maxValue: 6, unit: '%' },
        { categoryName: '机械', propertyName: '恢复力', minValue: 400, maxValue: 550, unit: 'MPa' },
        { categoryName: '热', propertyName: '相变温度 (As)', minValue: 60, maxValue: 90, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 80, maxValue: 110, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Ms)', minValue: 50, maxValue: 80, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Mf)', minValue: 40, maxValue: 70, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.50, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量 (奥氏体)', value: 75, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 56.5, maxValue: 57.5, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 42.5, maxValue: 43.5, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTiNb 宽滞后形状记忆合金',
      designation: 'NiTiNb-3at%',
      description: 'Ni-Ti-Nb系宽滞后形状记忆合金，相变滞后宽，便于储存和运输，用于管接头、紧固件、连接器',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 700, maxValue: 950, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 200, maxValue: 350, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 18, maxValue: 32, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 160, maxValue: 230, unit: 'HV' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 4, maxValue: 5, unit: '%' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: -20, maxValue: 20, unit: '°C' },
        { categoryName: '热', propertyName: '相变滞后宽度', minValue: 80, maxValue: 120, unit: '°C' },
        { categoryName: '机械', propertyName: '恢复力', minValue: 350, maxValue: 500, unit: 'MPa' },
        { categoryName: '物理', propertyName: '密度', value: 6.52, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 68, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 54.0, maxValue: 55.0, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.0, maxValue: 44.0, unit: '%', weight: true },
        { element: 'Nb (铌)', minValue: 3.0, maxValue: 5.0, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTiCu 铜改性形状记忆合金',
      designation: 'NiTiCu-10at%',
      description: 'Ni-Ti-Cu系铜改性形状记忆合金，相变滞后窄，循环稳定性好，用于微驱动器、传感器、精密器件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 750, maxValue: 1000, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 180, maxValue: 320, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 20, maxValue: 35, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 170, maxValue: 240, unit: 'HV' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 3, maxValue: 5, unit: '%' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 35, maxValue: 65, unit: '°C' },
        { categoryName: '热', propertyName: '相变滞后宽度', minValue: 5, maxValue: 15, unit: '°C' },
        { categoryName: '机械', propertyName: '循环稳定性', value: 100000, unit: '次' },
        { categoryName: '物理', propertyName: '密度', value: 6.40, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 70, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 49.0, maxValue: 51.0, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 39.0, maxValue: 41.0, unit: '%', weight: true },
        { element: 'Cu (铜)', minValue: 8.0, maxValue: 12.0, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTiFe 铁改性形状记忆合金',
      designation: 'NiTiFe-3at%',
      description: 'Ni-Ti-Fe系铁改性形状记忆合金，相变温度低于室温，用于低温管接头、低温连接器、制冷器件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 800, maxValue: 1050, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 150, maxValue: 280, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 22, maxValue: 38, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 180, maxValue: 260, unit: 'HV' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 4, maxValue: 6, unit: '%' },
        { categoryName: '热', propertyName: '相变温度 (As)', minValue: -100, maxValue: -60, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: -80, maxValue: -40, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Ms)', minValue: -110, maxValue: -70, unit: '°C' },
        { categoryName: '热', propertyName: '相变温度 (Mf)', minValue: -130, maxValue: -90, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.47, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 72, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 54.5, maxValue: 55.5, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.0, maxValue: 44.0, unit: '%', weight: true },
        { element: 'Fe (铁)', minValue: 2.0, maxValue: 4.0, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTiCr 铬改性高温形状记忆合金',
      designation: 'NiTiCr-0.5at%',
      description: 'Ni-Ti-Cr系铬改性高温形状记忆合金，提高抗氧化性和高温稳定性，用于高温执行器、航空发动机',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 850, maxValue: 1100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 200, maxValue: 350, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 18, maxValue: 32, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 190, maxValue: 270, unit: 'HV' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 4, maxValue: 5.5, unit: '%' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 100, maxValue: 150, unit: '°C' },
        { categoryName: '机械', propertyName: '高温抗氧化性', value: 800, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.46, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '弹性模量', value: 74, unit: 'GPa' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.5, maxValue: 56.5, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.0, maxValue: 44.0, unit: '%', weight: true },
        { element: 'Cr (铬)', minValue: 0.3, maxValue: 0.8, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 医用生物相容合金',
      designation: 'NiTi-Bio',
      description: '医用级Ni-Ti形状记忆合金，优异生物相容性和抗腐蚀性，用于血管支架、骨科植入物、手术器械',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (时效)', minValue: 950, maxValue: 1250, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (时效)', minValue: 450, maxValue: 650, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (时效)', minValue: 12, maxValue: 25, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (时效)', minValue: 220, maxValue: 320, unit: 'HV' },
        { categoryName: '机械', propertyName: '超弹性应变', minValue: 7, maxValue: 8.5, unit: '%' },
        { categoryName: '机械', propertyName: '疲劳强度 (生理环境)', value: 450, unit: 'MPa' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 15, maxValue: 35, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.49, unit: 'g/cm³' },
        { categoryName: '化学', propertyName: '耐腐蚀性', value: 0.01, unit: 'mm/year' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 54.8, maxValue: 56.0, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 44.0, maxValue: 45.2, unit: '%', weight: true },
        { element: 'O (氧)', maxValue: 0.05, unit: '%', weight: true },
        { element: 'C (碳)', maxValue: 0.02, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 航空航天高强合金',
      designation: 'NiTi-Aero',
      description: '航空航天用Ni-Ti形状记忆合金，高强高韧，用于智能结构、振动控制、可变几何机构',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (冷加工+时效)', minValue: 1400, maxValue: 1600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (冷加工+时效)', minValue: 1000, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (冷加工+时效)', minValue: 8, maxValue: 15, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (冷加工+时效)', minValue: 350, maxValue: 450, unit: 'HV' },
        { categoryName: '机械', propertyName: '断裂韧性', value: 50, unit: 'MPa·m½' },
        { categoryName: '机械', propertyName: '恢复力', minValue: 600, maxValue: 750, unit: 'MPa' },
        { categoryName: '机械', propertyName: '疲劳强度', value: 550, unit: 'MPa' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 50, maxValue: 80, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.48, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '工作温度', value: 200, unit: '°C' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.0, maxValue: 56.0, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 44.0, maxValue: 45.0, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 线材用超弹性合金',
      designation: 'NiTi-Wire',
      description: 'Ni-Ti系超弹性线材，均匀的超弹性性能，用于医疗导丝、眼镜架、运动器材、渔具',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (线材)', minValue: 1000, maxValue: 1300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (线材)', minValue: 500, maxValue: 700, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (线材)', minValue: 10, maxValue: 20, unit: '%' },
        { categoryName: '机械', propertyName: '超弹性应变', minValue: 6, maxValue: 8, unit: '%' },
        { categoryName: '机械', propertyName: '弯曲疲劳寿命', value: 1000000, unit: '次' },
        { categoryName: '机械', propertyName: '扭转疲劳寿命', value: 500000, unit: '次' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: -10, maxValue: 20, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.47, unit: 'g/cm³' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.5, maxValue: 56.5, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.5, maxValue: 44.5, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 薄板用形状记忆合金',
      designation: 'NiTi-Plate',
      description: 'Ni-Ti系形状记忆薄板，用于微驱动器、智能结构、振动阻尼器、热敏器件',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (薄板)', minValue: 900, maxValue: 1200, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (薄板)', minValue: 400, maxValue: 600, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (薄板)', minValue: 15, maxValue: 25, unit: '%' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 4, maxValue: 5.5, unit: '%' },
        { categoryName: '机械', propertyName: '恢复应力', minValue: 400, maxValue: 550, unit: 'MPa' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 20, maxValue: 60, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.48, unit: 'g/cm³' },
        { categoryName: '热', propertyName: '热膨胀系数', value: 10, unit: '×10⁻⁶/K' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.0, maxValue: 56.0, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 44.0, maxValue: 45.0, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 高阻尼合金',
      designation: 'NiTi-Damp',
      description: 'Ni-Ti系高阻尼形状记忆合金，优异的吸能减震性能，用于减震器、阻尼器、噪声控制',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (退火)', minValue: 800, maxValue: 1100, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (退火)', minValue: 150, maxValue: 300, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (退火)', minValue: 20, maxValue: 35, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (退火)', minValue: 180, maxValue: 260, unit: 'HV' },
        { categoryName: '机械', propertyName: '阻尼容量 (SDC)', minValue: 20, maxValue: 40, unit: '%' },
        { categoryName: '机械', propertyName: '对数衰减率', minValue: 0.15, maxValue: 0.25, unit: '' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 30, maxValue: 70, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.48, unit: 'g/cm³' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.2, maxValue: 56.2, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.8, maxValue: 44.8, unit: '%', weight: true },
      ],
    },
    {
      name: 'NiTi 轧制带材合金',
      designation: 'NiTi-Ribbon',
      description: 'Ni-Ti系轧制带材，用于紧固件、弹簧、传感器、智能夹具',
      properties: [
        { categoryName: '机械', propertyName: '抗拉强度 (轧制)', minValue: 1100, maxValue: 1400, unit: 'MPa' },
        { categoryName: '机械', propertyName: '屈服强度 (轧制)', minValue: 700, maxValue: 900, unit: 'MPa' },
        { categoryName: '机械', propertyName: '延伸率 (轧制)', minValue: 8, maxValue: 18, unit: '%' },
        { categoryName: '机械', propertyName: '硬度 (轧制)', minValue: 300, maxValue: 400, unit: 'HV' },
        { categoryName: '机械', propertyName: '形状记忆应变', minValue: 4.5, maxValue: 6, unit: '%' },
        { categoryName: '机械', propertyName: '弹性模量 (奥氏体)', value: 72, unit: 'GPa' },
        { categoryName: '热', propertyName: '相变温度 (Af)', minValue: 10, maxValue: 50, unit: '°C' },
        { categoryName: '物理', propertyName: '密度', value: 6.49, unit: 'g/cm³' },
      ],
      compositions: [
        { element: 'Ni (镍)', minValue: 55.3, maxValue: 56.3, unit: '%', weight: true },
        { element: 'Ti (钛)', minValue: 43.7, maxValue: 44.7, unit: '%', weight: true },
      ],
    },
  ];

  let createdCount = 0;

  for (const alloy of nitiAlloys) {
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
        categoryId: nitiCategory.id,
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

  console.log(`\n镍钛合金扩展完成！`);
  console.log(`✅ 成功创建 ${createdCount} 种镍钛合金材料`);
  console.log(`📊 总材料数: ${await prisma.material.count()}`);
}

main()
  .catch((e) => {
    console.error('扩展镍钛合金失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
