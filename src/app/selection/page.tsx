'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';

interface ApplicationDomain {
  id: string;
  name: string;
  description: string;
}

interface Material {
  id: string;
  name: string;
  designation: string | null;
  description: string | null;
  category: {
    name: string;
  };
  typicalUse: boolean;
  notes: string | null;
}

export default function SelectionGuidePage() {
  const [applications, setApplications] = useState<ApplicationDomain[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const fetchMaterialsByApplication = async (applicationId: string) => {
    if (!applicationId) {
      setMaterials([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/applications/${applicationId}/materials`);
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (applicationId: string) => {
    setSelectedApp(applicationId);
    fetchMaterialsByApplication(applicationId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">材料选型规范</h1>
        <p className="text-gray-600">根据应用领域选择合适的材料</p>
      </div>

      {/* 应用选择 */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">选择应用领域</h3>
        </CardHeader>
        <CardBody>
          <Select
            value={selectedApp}
            onChange={(e) => handleApplicationChange((e.target as HTMLSelectElement).value)}
            options={[
              { value: '', label: '请选择应用领域' },
              ...applications.map((app) => ({
                value: app.id,
                label: app.name,
              })),
            ]}
            className="w-full"
          />
          {selectedApp && applications.find((a) => a.id === selectedApp) && (
            <p className="text-sm text-gray-600 mt-2">
              {applications.find((a) => a.id === selectedApp)?.description}
            </p>
          )}
        </CardBody>
      </Card>

      {/* 推荐材料列表 */}
      {selectedApp && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">推荐材料</h3>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : materials.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">暂无该应用领域的材料数据</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 典型材料 */}
                {materials.filter((m) => m.typicalUse).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Badge variant="primary" className="mr-2">典型</Badge>
                      常用材料
                    </h4>
                    <div className="space-y-3">
                      {materials
                        .filter((m) => m.typicalUse)
                        .map((material) => (
                          <div
                            key={material.id}
                            className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 mb-1">
                                  {material.name}
                                </h5>
                                {material.designation && (
                                  <p className="text-sm text-gray-600 mb-1">
                                    牌号: {material.designation}
                                  </p>
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  {material.category.name}
                                </Badge>
                                {material.notes && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    {material.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 其他材料 */}
                {materials.filter((m) => !m.typicalUse).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">其他可用材料</h4>
                    <div className="space-y-3">
                      {materials
                        .filter((m) => !m.typicalUse)
                        .map((material) => (
                          <div
                            key={material.id}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 mb-1">
                                  {material.name}
                                </h5>
                                {material.designation && (
                                  <p className="text-sm text-gray-600 mb-1">
                                    牌号: {material.designation}
                                  </p>
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  {material.category.name}
                                </Badge>
                                {material.notes && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    {material.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* 应用领域说明 */}
      {!selectedApp && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">应用领域</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleApplicationChange(app.id)}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{app.name}</h4>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
