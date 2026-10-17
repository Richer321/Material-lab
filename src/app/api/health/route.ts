import { NextResponse } from 'next/server';
import { testDatabaseConnection, prisma } from '@/lib/db/prisma';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'unknown',
    prisma: 'unknown',
  };

  try {
    // 测试数据库连接
    const dbConnected = await testDatabaseConnection();
    health.database = dbConnected ? 'connected' : 'disconnected';

    // 检查Prisma客户端状态
    try {
      await prisma.$queryRaw`SELECT 1`;
      health.prisma = 'operational';
    } catch (error) {
      health.prisma = 'error';
      health.status = 'degraded';
    }

    // 获取数据库统计信息
    const materialCount = await prisma.material.count();
    const categoryCount = await prisma.materialCategory.count();

    return NextResponse.json({
      ...health,
      statistics: {
        materials: materialCount,
        categories: categoryCount,
      },
    });
  } catch (error) {
    health.status = 'unhealthy';
    health.database = 'error';
    health.prisma = 'error';

    return NextResponse.json({
      ...health,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 503 });
  }
}
