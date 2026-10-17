import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('开始为材料添加应用和加工方式示例数据...');

  // 获取应用领域
  const applications = await prisma.applicationDomain.findMany();
  const appMap = new Map(applications.map((a) => [a.name, a.id]));

  // 获取加工方式
  const methods = await prisma.manufacturingMethod.findMany();
  const methodMap = new Map(methods.map((m) => [m.name, m.id]));

  // 获取一些典型材料
  const ti64 = await prisma.material.findFirst({ where: { designation: 'Ti-6Al-4V' } });
  const al7075 = await prisma.material.findFirst({ where: { designation: '7075-T6' } });
  const ss304 = await prisma.material.findFirst({ where: { designation: '316' } });
  const cfrp = await prisma.material.findFirst({ where: { name: { contains: 'CFRP' } } });

  // 为 Ti-6Al-4V 添加应用和加工方式
  if (ti64) {
    // 应用
    for (const appData of [
      {
        applicationId: appMap.get('航空航天')!,
        typicalUse: true,
        notes: '飞机结构件、发动机叶片、压气机盘',
      },
      {
        applicationId: appMap.get('医疗器械')!,
        typicalUse: true,
        notes: '人工关节、骨固定板、牙种植体',
      },
      {
        applicationId: appMap.get('汽车工业')!,
        typicalUse: false,
        notes: '高性能汽车发动机阀门、连杆',
      },
    ]) {
      try {
        await prisma.materialApplication.create({
          data: {
            materialId: ti64.id,
            ...appData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    // 加工方式
    for (const methodData of [
      {
        methodId: methodMap.get('锻造')!,
        difficulty: 'hard',
        notes: '需要在高温或等温条件下锻造',
      },
      {
        methodId: methodMap.get('车削')!,
        difficulty: 'medium',
        notes: '使用硬质合金刀具，低速切削',
      },
      {
        methodId: methodMap.get('铣削')!,
        difficulty: 'medium',
        notes: '需要充分冷却，刀具易磨损',
      },
      {
        methodId: methodMap.get('焊接')!,
        difficulty: 'hard',
        notes: '需要惰性气体保护，易氧化',
      },
    ]) {
      try {
        await prisma.materialManufacturingMethod.create({
          data: {
            materialId: ti64.id,
            ...methodData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    console.log('✓ Ti-6Al-4V 应用和加工方式已添加');
  }

  // 为 7075 铝合金添加应用和加工方式
  if (al7075) {
    for (const appData of [
      {
        applicationId: appMap.get('航空航天')!,
        typicalUse: true,
        notes: '飞机机翼、机身结构件',
      },
      {
        applicationId: appMap.get('国防军工')!,
        typicalUse: true,
        notes: '导弹结构件、装甲板',
      },
      {
        applicationId: appMap.get('体育器材')!,
        typicalUse: false,
        notes: '自行车车架、登山器材',
      },
    ]) {
      try {
        await prisma.materialApplication.create({
          data: {
            materialId: al7075.id,
            ...appData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    for (const methodData of [
      {
        methodId: methodMap.get('轧制')!,
        difficulty: 'medium',
        notes: '可热轧或冷轧成板材、型材',
      },
      {
        methodId: methodMap.get('铣削')!,
        difficulty: 'easy',
        notes: '加工性能良好，但易产生应力集中',
      },
      {
        methodId: methodMap.get('车削')!,
        difficulty: 'easy',
        notes: '切削性能良好',
      },
    ]) {
      try {
        await prisma.materialManufacturingMethod.create({
          data: {
            materialId: al7075.id,
            ...methodData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    console.log('✓ 7075-T6 应用和加工方式已添加');
  }

  // 为 316 不锈钢添加应用和加工方式
  if (ss304) {
    for (const appData of [
      {
        applicationId: appMap.get('化工设备')!,
        typicalUse: true,
        notes: '压力容器、热交换器、管道',
      },
      {
        applicationId: appMap.get('医疗器械')!,
        typicalUse: true,
        notes: '手术器械、植入物',
      },
      {
        applicationId: appMap.get('食品包装')!,
        typicalUse: true,
        notes: '食品加工设备、储存容器',
      },
      {
        applicationId: appMap.get('建筑结构')!,
        typicalUse: false,
        notes: '装饰件、栏杆、屋顶',
      },
    ]) {
      try {
        await prisma.materialApplication.create({
          data: {
            materialId: ss304.id,
            ...appData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    for (const methodData of [
      {
        methodId: methodMap.get('焊接')!,
        difficulty: 'easy',
        notes: '焊接性能优良，不易产生晶间腐蚀',
      },
      {
        methodId: methodMap.get('车削')!,
        difficulty: 'medium',
        notes: '加工硬化倾向，需要锋利刀具',
      },
      {
        methodId: methodMap.get('弯曲成型')!,
        difficulty: 'easy',
        notes: '冷弯性能良好',
      },
    ]) {
      try {
        await prisma.materialManufacturingMethod.create({
          data: {
            materialId: ss304.id,
            ...methodData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    console.log('✓ 316 不锈钢应用和加工方式已添加');
  }

  // 为 CFRP 添加应用和加工方式
  if (cfrp) {
    for (const appData of [
      {
        applicationId: appMap.get('航空航天')!,
        typicalUse: true,
        notes: '飞机机身、机翼、尾翼主结构',
      },
      {
        applicationId: appMap.get('汽车工业')!,
        typicalUse: false,
        notes: '高性能汽车车身、底盘部件',
      },
      {
        applicationId: appMap.get('体育器材')!,
        typicalUse: true,
        notes: '网球拍、高尔夫球杆、自行车',
      },
    ]) {
      try {
        await prisma.materialApplication.create({
          data: {
            materialId: cfrp.id,
            ...appData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    for (const methodData of [
      {
        methodId: methodMap.get('热压成型')!,
        difficulty: 'hard',
        notes: '需要高温高压和固化周期',
      },
      {
        methodId: methodMap.get('反应注射成型')!,
        difficulty: 'medium',
        notes: '适合复杂形状零件',
      },
      {
        methodId: methodMap.get('铣削')!,
        difficulty: 'easy',
        notes: '可用普通刀具切削，但易产生分层',
      },
      {
        methodId: methodMap.get('粘接')!,
        difficulty: 'medium',
        notes: '常用结构胶接，表面处理很重要',
      },
    ]) {
      try {
        await prisma.materialManufacturingMethod.create({
          data: {
            materialId: cfrp.id,
            ...methodData,
          },
        });
      } catch (e) {
        // 忽略重复错误
      }
    }

    console.log('✓ CFRP 应用和加工方式已添加');
  }

  console.log('\n应用和加工方式示例数据添加完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
