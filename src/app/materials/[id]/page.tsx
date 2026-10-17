'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Material {
  id: string;
  name: string;
  designation: string | null;
  description: string | null;
  category: {
    name: string;
  };
  properties: PropertyData[];
  compositions: CompositionData[];
  dataSources: DataSourceData[];
}

interface PropertyData {
  id: string;
  category: {
    name: string;
  };
  propertyName: string;
  value: number | null;
  minValue: number | null;
  maxValue: number | null;
  unit: string | null;
  temperature: number | null;
  testCondition: string | null;
  testStandard: string | null;
  notes: string | null;
}

interface CompositionData {
  element: string;
  value: number | null;
  minValue: number | null;
  maxValue: number | null;
  unit: string | null;
  notes: string | null;
}

interface DataSourceData {
  source: {
    type: string;
    title: string;
    authors: string | null;
    year: number | null;
    publisher: string | null;
    url: string | null;
  };
  notes: string | null;
}

interface ManufacturingMethod {
  id: string;
  name: string;
  category: string;
  description: string | null;
  difficulty: string | null;
  notes: string | null;
}

interface SurfaceTreatmentMethod {
  id: string;
  treatment: {
    id: string;
    name: string;
    category: string;
    icon: string | null;
    description: string | null;
  };
  difficulty: string | null;
  cost: string | null;
  notes: string | null;
}

export default function MaterialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [material, setMaterial] = useState<Material | null>(null);
  const [manufacturingMethods, setManufacturingMethods] = useState<ManufacturingMethod[]>([]);
  const [surfaceTreatments, setSurfaceTreatments] = useState<SurfaceTreatmentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterial();
    fetchManufacturingMethods();
    fetchSurfaceTreatments();
  }, [params.id]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/materials/${params.id}`);
      const data = await res.json();
      setMaterial(data);
    } catch (error) {
      console.error('Failed to fetch material:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchManufacturingMethods = async () => {
    try {
      const res = await fetch(`/api/materials/${params.id}/manufacturing`);
      if (res.ok) {
        const data = await res.json();
        setManufacturingMethods(data);
      }
    } catch (error) {
      console.error('Failed to fetch manufacturing methods:', error);
    }
  };

  const fetchSurfaceTreatments = async () => {
    try {
      const res = await fetch(`/api/materials/${params.id}/surface-treatments`);
      if (res.ok) {
        const data = await res.json();
        setSurfaceTreatments(data);
      }
    } catch (error) {
      console.error('Failed to fetch surface treatments:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('确定要删除这个材料吗？此操作不可撤销。')) return;

    try {
      await fetch(`/api/materials/${params.id}`, { method: 'DELETE' });
      router.push('/materials');
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  const formatValue = (prop: PropertyData) => {
    if (prop.value !== null) {
      return `${prop.value} ${prop.unit || ''}`.trim();
    }
    if (prop.minValue !== null && prop.maxValue !== null) {
      return `${prop.minValue} - ${prop.maxValue} ${prop.unit || ''}`.trim();
    }
    if (prop.minValue !== null) {
      return `≥ ${prop.minValue} ${prop.unit || ''}`.trim();
    }
    if (prop.maxValue !== null) {
      return `≤ ${prop.maxValue} ${prop.unit || ''}`.trim();
    }
    return '-';
  };

  const formatComposition = (comp: CompositionData) => {
    if (comp.value !== null) {
      return `${comp.value} ${comp.unit || ''}`.trim();
    }
    if (comp.minValue !== null && comp.maxValue !== null) {
      return `${comp.minValue} - ${comp.maxValue} ${comp.unit || ''}`.trim();
    }
    if (comp.minValue !== null) {
      return `≥ ${comp.minValue} ${comp.unit || ''}`.trim();
    }
    if (comp.maxValue !== null) {
      return `≤ ${comp.maxValue} ${comp.unit || ''}`.trim();
    }
    return '-';
  };

  const getDataSourceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      LITERATURE: '文献',
      HANDBOOK: '手册',
      EXPERIMENT: '实验',
      SUPPLIER: '供应商',
      WEBSITE: '网站',
      OTHER: '其他',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">材料不存在</p>
        <Button onClick={() => router.push('/materials')}>返回列表</Button>
      </div>
    );
  }

  // Group properties by category
  const propertiesByCategory = material.properties.reduce((acc, prop) => {
    const categoryName = prop.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(prop);
    return acc;
  }, {} as Record<string, PropertyData[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{material.name}</h1>
          {material.designation && (
            <p className="text-xl text-gray-600 mb-2">{material.designation}</p>
          )}
          <Badge variant="primary">{material.category.name}</Badge>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => router.push('/compare')}>
            对比
          </Button>
          <Button onClick={() => router.push(`/materials/${material.id}/edit`)} variant="secondary">
            编辑
          </Button>
          <Button onClick={handleDelete} variant="danger">
            删除
          </Button>
        </div>
      </div>

      {/* Description */}
      {material.description && (
        <Card>
          <CardBody>
            <h3 className="font-semibold text-gray-900 mb-2">材料描述</h3>
            <p className="text-gray-700">{material.description}</p>
          </CardBody>
        </Card>
      )}

      {/* Properties */}
      {Object.entries(propertiesByCategory).map(([categoryName, props]) => (
        <Card key={categoryName}>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">{categoryName}</h3>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>属性名称</TableCell>
                  <TableCell isHeader>数值</TableCell>
                  <TableCell isHeader>单位</TableCell>
                  <TableCell isHeader>温度 (°C)</TableCell>
                  <TableCell isHeader>测试条件</TableCell>
                  <TableCell isHeader>测试标准</TableCell>
                  <TableCell isHeader>备注</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop) => (
                  <TableRow key={prop.id}>
                    <TableCell>{prop.propertyName}</TableCell>
                    <TableCell>{formatValue(prop)}</TableCell>
                    <TableCell>{prop.unit || '-'}</TableCell>
                    <TableCell>{prop.temperature || '-'}</TableCell>
                    <TableCell>{prop.testCondition || '-'}</TableCell>
                    <TableCell>{prop.testStandard || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate">{prop.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ))}

      {/* Composition */}
      {material.compositions.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">化学成分</h3>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>元素/组分</TableCell>
                  <TableCell isHeader>含量</TableCell>
                  <TableCell isHeader>单位</TableCell>
                  <TableCell isHeader>备注</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {material.compositions.map((comp, index) => (
                  <TableRow key={index}>
                    <TableCell>{comp.element}</TableCell>
                    <TableCell>{formatComposition(comp)}</TableCell>
                    <TableCell>{comp.unit || '-'}</TableCell>
                    <TableCell>{comp.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Manufacturing Methods */}
      {manufacturingMethods.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">加工方式</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {['primary', 'secondary', 'forming', 'joining'].map((category) => {
                const methodsInCategory = manufacturingMethods.filter((m) => m.category === category);
                if (methodsInCategory.length === 0) return null;

                const categoryLabels: Record<string, string> = {
                  primary: '一次加工（成型）',
                  secondary: '二次加工（机加工）',
                  forming: '成型工艺',
                  joining: '连接工艺',
                };

                const difficultyLabels: Record<string, string> = {
                  easy: '容易',
                  medium: '中等',
                  hard: '困难',
                };

                const methodNameToGuideId: Record<string, string> = {
                  '机加': 'machining',
                  '机加工': 'machining',
                  '注塑': 'injection',
                  '注塑成型': 'injection',
                  '模压': 'compression',
                  '模压成型': 'compression',
                  '挤出': 'extrusion',
                  '挤出成型': 'extrusion',
                  '金属注射成型': 'mim',
                  'MIM': 'mim',
                  '3D打印': '3dprinting',
                  '增材制造': '3dprinting',
                  '铸造': 'casting',
                  '锻压': 'forging',
                  '锻造': 'forging',
                };

                return (
                  <div key={category} className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {categoryLabels[category]}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {methodsInCategory.map((method) => {
                        const guideId = methodNameToGuideId[method.name];
                        return (
                          <Link
                            key={method.id}
                            href={guideId ? `/manufacturing?category=${guideId}` : '#'}
                            className="block"
                          >
                            <div className="border border-gray-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-900">{method.name}</h5>
                                <div className="flex items-center space-x-2">
                                  {guideId && (
                                    <span className="text-xs text-blue-500">查看详情 →</span>
                                  )}
                                  {method.difficulty && (
                                    <Badge variant="secondary" className="text-xs">
                                      难度: {difficultyLabels[method.difficulty] || method.difficulty}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {method.description && (
                                <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                              )}
                              {method.notes && (
                                <p className="text-xs text-gray-500">{method.notes}</p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Surface Treatments */}
      {surfaceTreatments.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">表面处理</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {['chemical', 'coating', 'thermal', 'mechanical'].map((category) => {
                const treatmentsInCategory = surfaceTreatments.filter((st) => st.treatment.category === category);
                if (treatmentsInCategory.length === 0) return null;

                const categoryLabels: Record<string, string> = {
                  chemical: '化学处理',
                  coating: '涂层处理',
                  thermal: '热处理',
                  mechanical: '机械处理'
                };

                const categoryColors: Record<string, string> = {
                  chemical: 'bg-blue-100 text-blue-800',
                  coating: 'bg-green-100 text-green-800',
                  thermal: 'bg-orange-100 text-orange-800',
                  mechanical: 'bg-purple-100 text-purple-800'
                };

                const difficultyLabels: Record<string, string> = {
                  easy: '容易',
                  medium: '中等',
                  hard: '困难'
                };

                const costLabels: Record<string, string> = {
                  low: '低成本',
                  medium: '中等成本',
                  high: '高成本'
                };

                return (
                  <div key={category} className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {categoryLabels[category]}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {treatmentsInCategory.map((surfaceTreatment) => {
                        return (
                          <Link
                            key={surfaceTreatment.id}
                            href={`/surface-treatment?treatment=${surfaceTreatment.treatment.id}`}
                            className="block"
                          >
                            <div className="border border-gray-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl">{surfaceTreatment.treatment.icon || '🔧'}</span>
                                  <h5 className="font-medium text-gray-900">{surfaceTreatment.treatment.name}</h5>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-blue-500">查看详情 →</span>
                                </div>
                              </div>
                              {surfaceTreatment.treatment.description && (
                                <p className="text-sm text-gray-600 mb-1">{surfaceTreatment.treatment.description}</p>
                              )}
                              <div className="flex items-center space-x-2 text-xs">
                                {surfaceTreatment.difficulty && (
                                  <Badge variant="secondary" className="text-xs">
                                    难度: {difficultyLabels[surfaceTreatment.difficulty] || surfaceTreatment.difficulty}
                                  </Badge>
                                )}
                                {surfaceTreatment.cost && (
                                  <Badge variant="secondary" className="text-xs">
                                    {costLabels[surfaceTreatment.cost] || surfaceTreatment.cost}
                                  </Badge>
                                )}
                              </div>
                              {surfaceTreatment.notes && (
                                <p className="text-xs text-gray-500 mt-2">{surfaceTreatment.notes}</p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Data Sources */}
      {material.dataSources.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">数据来源</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {material.dataSources.map((ds, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge>{getDataSourceTypeLabel(ds.source.type)}</Badge>
                    <h4 className="font-semibold text-gray-900">{ds.source.title}</h4>
                  </div>
                  {ds.source.authors && (
                    <p className="text-sm text-gray-600">作者: {ds.source.authors}</p>
                  )}
                  {(ds.source.year || ds.source.publisher) && (
                    <p className="text-sm text-gray-600">
                      {ds.source.year && <span>{ds.source.year}年</span>}
                      {ds.source.year && ds.source.publisher && ' · '}
                      {ds.source.publisher && <span>{ds.source.publisher}</span>}
                    </p>
                  )}
                  {ds.source.url && (
                    <a
                      href={ds.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      查看来源
                    </a>
                  )}
                  {ds.notes && (
                    <p className="text-sm text-gray-500 mt-2">备注: {ds.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
