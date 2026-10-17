import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加应用领域数据...');

  // 创建应用领域
  const applications = [
    { name: '航空航天', description: '用于飞机、航天器、导弹等的结构材料和功能材料' },
    { name: '汽车工业', description: '用于汽车制造的各种材料，包括车身、发动机、底盘等' },
    { name: '医疗器械', description: '用于医疗器械和植入物的生物相容性材料' },
    { name: '电子工业', description: '用于电子元器件、电路板、封装的材料' },
    { name: '建筑结构', description: '用于建筑结构和基础设施的材料' },
    { name: '化工设备', description: '用于化工容器、管道、反应器的耐腐蚀材料' },
    { name: '能源领域', description: '用于石油、天然气、核能、可再生能源等领域的材料' },
    { name: '船舶海洋', description: '用于船舶、海洋平台、港口设施的材料' },
    { name: '体育器材', description: '用于运动器材、健身设备的材料' },
    { name: '日用消费品', description: '用于家用电器、日用品等的材料' },
    { name: '国防军工', description: '用于武器装备、防护设施等的特种材料' },
    { name: '食品包装', description: '用于食品包装、容器、厨房用品的材料' },
  ];

  for (const app of applications) {
    await prisma.applicationDomain.upsert({
      where: { name: app.name },
      update: { description: app.description },
      create: app,
    });
  }

  console.log('应用领域添加完成！');

  // 创建加工方式
  const manufacturingMethods = [
    // 一次加工
    { name: '铸造', category: 'primary', description: '将熔融金属倒入模具中冷却凝固' },
    { name: '粉末冶金', category: 'primary', description: '金属粉末压制烧结成型' },
    { name: '注塑成型', category: 'primary', description: '熔融塑料注入模具冷却成型' },
    { name: '挤压成型', category: 'primary', description: '材料通过挤压模具获得截面形状' },
    { name: '轧制', category: 'primary', description: '金属通过轧辊减小厚度获得板材/型材' },
    { name: '锻造', category: 'primary', description: '金属加热后施加压力成型' },

    // 二次加工
    { name: '车削', category: 'secondary', description: '工件旋转，刀具切削外圆/内圆' },
    { name: '铣削', category: 'secondary', description: '旋转刀具切削工件平面/曲面' },
    { name: '钻削', category: 'secondary', description: '钻头旋转切削孔洞' },
    { name: '磨削', category: 'secondary', description: '磨粒高速旋转磨削工件表面' },
    { name: '镗削', category: 'secondary', description: '镗刀切削扩大或精加工孔' },
    { name: '锯切', category: 'secondary', description: '锯条切割材料' },
    { name: '冲压', category: 'secondary', description: '板材在压力机上冲裁成型' },
    { name: '剪切', category: 'secondary', description: '剪切机切割板材/型材' },

    // 成型工艺
    { name: '弯曲成型', category: 'forming', description: '板材/管材弯曲成所需形状' },
    { name: '拉伸成型', category: 'forming', description: '板材拉伸获得复杂曲面' },
    { name: '旋压成型', category: 'forming', description: '旋转工件通过工具成型' },
    { name: '滚压成型', category: 'forming', description: '通过滚轮使板材成型' },
    { name: '爆炸成型', category: 'forming', description: '利用爆炸冲击波成型板材' },
    { name: '超塑成型', category: 'forming', description: '利用材料超塑性进行成型' },
    { name: '热成型', category: 'forming', description: '加热塑料板材后真空/气压成型' },
    { name: '吹塑成型', category: 'forming', description: '熔融塑料吹入模具成型中空制品' },
    { name: '热压成型', category: 'forming', description: '加热材料后加压成型' },
    { name: '反应注射成型', category: 'forming', description: '液态原料在模具内反应固化' },

    // 连接工艺
    { name: '焊接', category: 'joining', description: '通过加热或压力使材料永久连接' },
    { name: '钎焊', category: 'joining', description: '使用钎料填充接头间隙连接' },
    { name: '锡焊', category: 'joining', description: '使用锡铅合金钎料连接电子元件' },
    { name: '铆接', category: 'joining', description: '使用铆钉连接材料' },
    { name: '螺栓连接', category: 'joining', description: '使用螺栓螺母连接材料' },
    { name: '粘接', category: 'joining', description: '使用胶粘剂连接材料' },
    { name: '缝合', category: 'joining', description: '用于纺织复合材料等的连接' },
  ];

  for (const method of manufacturingMethods) {
    await prisma.manufacturingMethod.upsert({
      where: { name: method.name },
      update: { category: method.category, description: method.description },
      create: method,
    });
  }

  console.log('加工方式添加完成！');
  console.log('总计:');
  console.log(`- 应用领域: ${applications.length} 个`);
  console.log(`- 加工方式: ${manufacturingMethods.length} 个`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
