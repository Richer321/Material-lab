import { prisma } from '@/lib/db/prisma';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

async function getStats() {
  const materialCount = await prisma.material.count();
  const categoryCount = await prisma.materialCategory.count();
  const propertyCount = await prisma.materialProperty.count();
  const sourceCount = await prisma.dataSource.count();

  return { materialCount, categoryCount, propertyCount, sourceCount };
}

async function getRecentMaterials() {
  return prisma.material.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
    },
  });
}

export default async function HomePage() {
  const stats = await getStats();
  const recentMaterials = await getRecentMaterials();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">材料性能数据库</h1>
        <p className="text-xl text-gray-600 mb-8">
          存储、检索、对比和管理各种材料性能数据的专业平台
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/materials">
            <Button size="lg">浏览材料</Button>
          </Link>
          <Link href="/materials/new">
            <Button size="lg" variant="secondary">
              添加新材料
            </Button>
          </Link>
          <Link href="/compare">
            <Button size="lg" variant="outline">
              材料对比
            </Button>
          </Link>
          <Link href="/selection">
            <Button size="lg" variant="outline">
              选型规范
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.materialCount}</div>
            <div className="text-sm text-gray-600">材料总数</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.categoryCount}</div>
            <div className="text-sm text-gray-600">材料类别</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.propertyCount}</div>
            <div className="text-sm text-gray-600">性能数据</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.sourceCount}</div>
            <div className="text-sm text-gray-600">数据来源</div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Materials */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900">最近添加的材料</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMaterials.map((material) => (
              <Link
                key={material.id}
                href={`/materials/${material.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{material.name}</h3>
                {material.designation && (
                  <p className="text-sm text-gray-600 mb-2">{material.designation}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{material.category.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(material.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">材料管理</h3>
            <p className="text-gray-600 text-sm">
              支持材料的增删改查，包括性能数据、成分信息和数据来源的完整管理
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能搜索</h3>
            <p className="text-gray-600 text-sm">
              按名称、牌号、类别快速搜索材料，支持性能范围筛选
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">材料对比</h3>
            <p className="text-gray-600 text-sm">
              选择多个材料进行性能对比，快速找出最优选择
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
