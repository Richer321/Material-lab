import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 为不同类型的材料分配表面处理方式
const materialSurfaceTreatmentMap = {
  // 铝合金及其表面处理
  '铝合金': [
    { treatment: '阳极氧化', difficulty: 'medium', cost: 'low', notes: '最常用的铝合金表面处理，耐腐蚀性好' },
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '提供各种颜色选择，装饰性好' },
    { treatment: '电泳', difficulty: 'medium', cost: 'medium', notes: '涂层均匀，耐腐蚀性优异' },
    { treatment: '抛光', difficulty: 'medium', cost: 'medium', notes: '获得镜面光泽，装饰效果佳' }
  ],
  // 不锈钢及其表面处理
  '不锈钢': [
    { treatment: '电镀', difficulty: 'medium', cost: 'medium', notes: '提高表面硬度和耐磨性' },
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '提供颜色选择和额外保护' },
    { treatment: '抛光', difficulty: 'medium', cost: 'medium', notes: '获得镜面效果，美观大方' },
    { treatment: '磷化', difficulty: 'easy', cost: 'low', notes: '提高涂层附着力' }
  ],
  // 钛合金及其表面处理
  '钛合金': [
    { treatment: '阳极氧化', difficulty: 'hard', cost: 'high', notes: '形成彩色氧化膜，生物相容性好' },
    { treatment: '喷砂', difficulty: 'easy', cost: 'low', notes: '清除氧化皮，获得均匀表面' },
    { treatment: '抛光', difficulty: 'medium', cost: 'medium', notes: '获得光亮表面，减少摩擦' }
  ],
  // 碳钢及其表面处理
  '碳钢': [
    { treatment: '热处理', difficulty: 'medium', cost: 'medium', notes: '改善力学性能，提高强度和硬度' },
    { treatment: '渗碳', difficulty: 'medium', cost: 'medium', notes: '提高表面硬度和耐磨性' },
    { treatment: '电镀', difficulty: 'medium', cost: 'medium', notes: '提供防腐蚀保护' },
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '防腐蚀和装饰' }
  ],
  // 模具钢及其表面处理
  '模具钢': [
    { treatment: '热处理', difficulty: 'hard', cost: 'high', notes: '获得高硬度和耐磨性' },
    { treatment: '氮化', difficulty: 'hard', cost: 'high', notes: '显著提高表面硬度和使用寿命' },
    { treatment: '抛光', difficulty: 'medium', cost: 'medium', notes: '获得镜面模具表面' },
    { treatment: '电镀', difficulty: 'medium', cost: 'medium', notes: '提高脱模性能' }
  ],
  // 铸造铝合金及其表面处理
  '铸造铝合金': [
    { treatment: '喷砂', difficulty: 'easy', cost: 'low', notes: '清除铸件表面氧化皮和杂质' },
    { treatment: '阳极氧化', difficulty: 'medium', cost: 'medium', notes: '提高耐腐蚀性和外观质量' },
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '提供颜色选择和表面保护' },
    { treatment: '电泳', difficulty: 'medium', cost: 'medium', notes: '涂层均匀，覆盖复杂形状' }
  ],
  // 镁合金及其表面处理
  '镁合金': [
    { treatment: '阳极氧化', difficulty: 'medium', cost: 'medium', notes: '提高耐腐蚀性，镁合金必备处理' },
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '提供额外的腐蚀保护' },
    { treatment: '电镀', difficulty: 'hard', cost: 'high', notes: '特殊工艺，提高耐腐蚀性' }
  ],
  // 铜合金及其表面处理
  '铜合金': [
    { treatment: '电镀', difficulty: 'medium', cost: 'medium', notes: '镀镍、镀铬等，提高耐磨性' },
    { treatment: '抛光', difficulty: 'easy', cost: 'low', notes: '获得光亮表面，装饰效果好' },
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '防氧化保护' },
    { treatment: '磷化', difficulty: 'easy', cost: 'low', notes: '提高涂层附着力' }
  ],
  // 硅胶及其表面处理
  '硅胶': [
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '提供颜色选择和表面改性' },
    { treatment: '抛光', difficulty: 'easy', cost: 'low', notes: '获得光滑表面，改善手感' }
  ],
  // 工程塑料及其表面处理
  '工程塑料': [
    { treatment: '喷涂', difficulty: 'easy', cost: 'low', notes: '提供颜色选择和表面保护' },
    { treatment: '抛光', difficulty: 'medium', cost: 'medium', notes: '获得光泽表面' },
    { treatment: '电镀', difficulty: 'hard', cost: 'high', notes: '特殊工艺，提供金属外观' }
  ]
};

async function main() {
  console.log('开始创建材料与表面处理的关联...');

  try {
    // 获取所有表面处理方式
    const surfaceTreatments = await prisma.surfaceTreatment.findMany();
    const treatmentMap = new Map(surfaceTreatments.map(t => [t.name, t.id]));

    // 获取所有材料
    const materials = await prisma.material.findMany({
      include: { category: true }
    });

    let createdCount = 0;
    let skippedCount = 0;

    for (const material of materials) {
      // 根据材料类别或名称判断适用的表面处理
      let applicableTreatments = null;

      // 检查材料类别
      for (const [category, treatments] of Object.entries(materialSurfaceTreatmentMap)) {
        if (material.category.name.includes(category) ||
            material.name.includes(category) ||
            material.designation?.includes(category)) {
          applicableTreatments = treatments;
          break;
        }
      }

      // 如果没有找到匹配的类别，根据材料类型推断
      if (!applicableTreatments) {
        const categoryName = material.category.name.toLowerCase();

        if (categoryName.includes('铝') || material.name.includes('铝')) {
          applicableTreatments = materialSurfaceTreatmentMap['铝合金'];
        } else if (categoryName.includes('不锈钢') || material.name.includes('不锈钢')) {
          applicableTreatments = materialSurfaceTreatmentMap['不锈钢'];
        } else if (categoryName.includes('钛') || material.name.includes('钛')) {
          applicableTreatments = materialSurfaceTreatmentMap['钛合金'];
        } else if (categoryName.includes('钢') || categoryName.includes('铁')) {
          if (categoryName.includes('模具') || material.name.includes('模具')) {
            applicableTreatments = materialSurfaceTreatmentMap['模具钢'];
          } else if (categoryName.includes('铸造')) {
            applicableTreatments = materialSurfaceTreatmentMap['铸造铝合金'];
          } else {
            applicableTreatments = materialSurfaceTreatmentMap['碳钢'];
          }
        } else if (categoryName.includes('镁') || material.name.includes('镁')) {
          applicableTreatments = materialSurfaceTreatmentMap['镁合金'];
        } else if (categoryName.includes('铜') || material.name.includes('铜')) {
          applicableTreatments = materialSurfaceTreatmentMap['铜合金'];
        } else if (categoryName.includes('硅') || material.name.includes('硅')) {
          applicableTreatments = materialSurfaceTreatmentMap['硅胶'];
        } else if (categoryName.includes('塑') || categoryName.includes('聚合物')) {
          applicableTreatments = materialSurfaceTreatmentMap['工程塑料'];
        }
      }

      // 如果找到了适用的表面处理，创建关联
      if (applicableTreatments) {
        for (const treatment of applicableTreatments) {
          const treatmentId = treatmentMap.get(treatment.treatment);
          if (treatmentId) {
            // 检查是否已存在关联
            const existing = await prisma.materialSurfaceTreatment.findFirst({
              where: {
                materialId: material.id,
                treatmentId: treatmentId
              }
            });

            if (!existing) {
              await prisma.materialSurfaceTreatment.create({
                data: {
                  materialId: material.id,
                  treatmentId: treatmentId,
                  difficulty: treatment.difficulty,
                  cost: treatment.cost,
                  notes: treatment.notes
                }
              });
              createdCount++;
              console.log(`✅ 为 "${material.name}" 添加表面处理: ${treatment.treatment}`);
            } else {
              skippedCount++;
            }
          }
        }
      }
    }

    console.log(`\n材料表面处理关联创建完成！`);
    console.log(`- 新创建关联: ${createdCount}`);
    console.log(`- 已存在跳过: ${skippedCount}`);

  } catch (error) {
    console.error('错误:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('脚本执行失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });