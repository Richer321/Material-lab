import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始创建加工指导数据...');

  // 加工方式分类数据
  const manufacturingCategories = [
    {
      name: '机加',
      icon: '⚙️',
      commonMaterials: ['铝合金', '钛合金', '不锈钢', '碳钢', '铜合金', '镁合金'],
      applications: ['精密零件', '发动机部件', '轴承', '齿轮', '紧固件', '医疗器械'],
      description: '适用于高精度要求、复杂形状的金属零件加工',
      advantages: ['精度高', '表面质量好', '适用范围广', '小批量生产灵活'],
      limitations: ['材料利用率低', '加工时间长', '刀具成本高'],
    },
    {
      name: '注塑',
      icon: '💉',
      commonMaterials: ['ABS', 'PP', 'PE', 'PC', 'PA', 'POM', 'PBT', 'PS'],
      applications: ['外壳', '容器', '齿轮', '手柄', '连接器', '玩具', '日用品'],
      description: '适合大批量生产复杂形状的塑料制品',
      advantages: ['生产效率高', '尺寸稳定', '复杂形状', '成本较低'],
      limitations: ['模具成本高', '设计周期长', '仅限塑料'],
    },
    {
      name: '模压',
      icon: '🔧',
      commonMaterials: ['酚醛树脂', '环氧树脂', '硅胶', '氟橡胶', '复合材料', '胶木'],
      applications: ['电器外壳', '手柄', '垫圈', '密封件', '刹车片', '电路板'],
      description: '适用于热固性材料和复合材料的大批量生产',
      advantages: ['制品质量好', '效率高', '适合复杂形状', '废料少'],
      limitations: ['仅限热固性材料', '模具成本高', '周期较长'],
    },
    {
      name: '挤出',
      icon: '🔩',
      commonMaterials: ['PVC', 'PE', 'PP', 'ABS', 'PC', '铝合金', '铜'],
      applications: ['管材', '型材', '板材', '薄膜', '电线护套', '门窗型材'],
      description: '适合生产具有恒定截面的长尺寸产品',
      advantages: ['连续生产', '效率极高', '成本低', '截面均匀'],
      limitations: ['仅限恒定截面', '产品形状受限', '设备投资大'],
    },
    {
      name: 'MIM',
      icon: '🏭',
      commonMaterials: ['不锈钢', '钛合金', '铁基合金', '钨合金', '铜合金'],
      applications: ['医疗器械', '电子零件', '枪械部件', '手表零件', '汽车零件'],
      description: '结合了注塑和粉末冶金的优点，适合小型复杂金属零件',
      advantages: ['复杂形状', '高精度', '少无切削', '成本较低'],
      limitations: ['尺寸受限', '设备昂贵', '后处理复杂'],
    },
    {
      name: '3D打印',
      icon: '🖨️',
      commonMaterials: ['PLA', 'ABS', '树脂', '钛合金', '铝合金', '不锈钢', '复合材料'],
      applications: ['原型制作', '定制零件', '医疗器械', '航空部件', '艺术品', '模具'],
      description: '无需模具，直接从CAD模型制造实体零件',
      advantages: ['无需模具', '设计自由度高', '个性化定制', '快速响应'],
      limitations: ['效率低', '成本高', '精度有限', '材料性能'],
    },
    {
      name: '铸造',
      icon: '🔥',
      commonMaterials: ['铸铁', '铸钢', '铝合金', '镁合金', '铜合金', '钛合金'],
      applications: ['发动机缸体', '泵体', '阀门', '机床床身', '船舶螺旋桨', '艺术品'],
      description: '适合制造形状复杂、具有复杂内腔的金属零件',
      advantages: ['适应性强', '复杂形状', '成本较低', '大尺寸零件'],
      limitations: ['精度较低', '组织疏松', '表面粗糙', '环境污染'],
    },
    {
      name: '锻压',
      icon: '🔨',
      commonMaterials: ['碳钢', '合金钢', '铝合金', '钛合金', '铜合金', '高温合金'],
      applications: ['连杆', '曲轴', '齿轮', '叶片', '法兰', '紧固件'],
      description: '通过塑性变形改善金属组织，提高力学性能',
      advantages: ['性能优良', '组织致密', '纤维流线', '可靠性高'],
      limitations: ['形状受限', '模具成本高', '尺寸限制', '能耗较高'],
    },
  ];

  console.log('加工指导数据结构已创建');
  console.log('包含 8 种加工方式：');
  manufacturingCategories.forEach((cat) => {
    console.log(`  - ${cat.icon} ${cat.name}: ${cat.commonMaterials.length} 种常用材料, ${cat.applications.length} 类应用`);
  });

  return manufacturingCategories;
}

main()
  .then((result) => {
    console.log('\n数据准备完成！');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
