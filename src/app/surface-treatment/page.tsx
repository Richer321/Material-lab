'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface SurfaceTreatment {
  id: string;
  name: string;
  icon: string | null;
  category: string;
  description: string | null;
  applications: string[];
  advantages: string[];
  limitations: string[];
  processFlow: string[];
  parameters: string[];
  precautions: string[];
}

// 表面处理数据分类
const categoryLabels: Record<string, string> = {
  chemical: '化学处理',
  coating: '涂层处理',
  thermal: '热处理',
  mechanical: '机械处理'
};

function SurfaceTreatmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [treatments, setTreatments] = useState<SurfaceTreatment[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<SurfaceTreatment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatments();
  }, []);

  useEffect(() => {
    const treatmentId = searchParams.get('treatment');
    if (treatmentId && treatments.length > 0) {
      const found = treatments.find((t) => t.id === treatmentId);
      if (found) {
        setSelectedTreatment(found);
      }
    } else {
      setSelectedTreatment(null);
    }
  }, [searchParams, treatments]);

  const fetchTreatments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/surface-treatments');
      const data = await response.json();
      setTreatments(data);
    } catch (error) {
      console.error('Failed to fetch surface treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/surface-treatment');
  };

  const handleTreatmentClick = (treatment: SurfaceTreatment) => {
    router.push(`/surface-treatment?treatment=${treatment.id}`);
  };

  const getCategoryLabel = (category: string) => {
    return categoryLabels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      chemical: 'bg-blue-100 text-blue-800',
      coating: 'bg-green-100 text-green-800',
      thermal: 'bg-orange-100 text-orange-800',
      mechanical: 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (selectedTreatment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button onClick={handleBack} variant="secondary">
            ← 返回
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="text-4xl mr-3">{selectedTreatment.icon || '🔧'}</span>
            {selectedTreatment.name}
          </h1>
        </div>

        {/* 概述 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">工艺概述</h3>
          </CardHeader>
          <CardBody>
            <div className="flex items-center space-x-3 mb-4">
              <Badge className={getCategoryColor(selectedTreatment.category)}>
                {getCategoryLabel(selectedTreatment.category)}
              </Badge>
            </div>
            <p className="text-gray-700">{selectedTreatment.description}</p>
          </CardBody>
        </Card>

        {/* 应用领域 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">应用领域</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTreatment.applications.map((app, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{app}</h4>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 优缺点 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-green-700">✓ 优点</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {selectedTreatment.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{advantage}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-red-700">✗ 局限性</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {selectedTreatment.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span className="text-gray-700">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* 工艺流程 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">典型工艺流程</h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap items-center gap-2">
              {selectedTreatment.processFlow.map((step, index) => (
                <div key={index} className="flex items-center">
                  <Badge variant="primary" className="px-3 py-2">
                    {step}
                  </Badge>
                  {index < selectedTreatment.processFlow.length - 1 && (
                    <span className="text-gray-400 mx-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 通常工艺参数 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">通常工艺参数</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {selectedTreatment.parameters.map((param, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">⚙️ 参数 {index + 1}</h4>
                  <p className="text-sm text-gray-700">{param}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* 注意事项 */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">注意事项</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {selectedTreatment.precautions.map((precaution, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">⚠️ 注意事项 {index + 1}</h4>
                  <p className="text-sm text-gray-700">{precaution}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">表面处理指南</h1>
        <p className="text-gray-600">根据材料和要求选择合适的表面处理方式</p>
      </div>

      {/* 表面处理分类 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {treatments.map((treatment) => (
          <div
            key={treatment.id}
            onClick={() => handleTreatmentClick(treatment)}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <Card className="h-full">
              <CardBody className="text-center">
                <div className="text-5xl mb-3">{treatment.icon || '🔧'}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{treatment.name}</h3>
                <Badge className={`${getCategoryColor(treatment.category)} mb-3`}>
                  {getCategoryLabel(treatment.category)}
                </Badge>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{treatment.description}</p>
                <div className="flex justify-between text-xs text-gray-500 border-t pt-3">
                  <span>{treatment.applications.length} 个应用领域</span>
                  <span>{treatment.advantages.length} 个优点</span>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {/* 说明 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">使用说明</h3>
        </CardHeader>
        <CardBody>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. 点击上方表面处理卡片，查看该工艺的详细信息</p>
            <p>2. 了解每种表面处理的应用领域和优缺点</p>
            <p>3. 参考工艺流程和参数，选择合适的处理方法</p>
            <p>4. 注意事项中的要点需要在实际操作中重点关注</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function SurfaceTreatmentPage() {
  return (
    <Suspense fallback={<div className="text-center py-12"><div className="text-gray-500">加载中...</div></div>}>
      <SurfaceTreatmentContent />
    </Suspense>
  );
}