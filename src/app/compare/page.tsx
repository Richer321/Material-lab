'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Material {
  id: string;
  name: string;
  designation: string | null;
  category: {
    name: string;
  };
}

interface ComparisonData {
  id: string;
  name: string;
  designation: string | null;
  category: {
    name: string;
  };
  properties: PropertyData[];
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
}

export default function ComparePage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/materials');
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    if (selectedIds.length < 2 || selectedIds.length > 4) {
      alert('请选择 2-4 个材料进行对比');
      return;
    }

    try {
      setComparing(true);
      const promises = selectedIds.map(id => fetch(`/api/materials/${id}`));
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map(r => r.json()));
      setComparisonData(data);
    } catch (error) {
      console.error('Failed to fetch comparison data:', error);
    } finally {
      setComparing(false);
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

  // Get all unique properties from all materials
  const allProperties = comparisonData.length > 0
    ? Array.from(
        new Set(
          comparisonData.flatMap(m =>
            m.properties.map(p => `${p.category.name}:${p.propertyName}`)
          )
        )
      ).map(key => {
        const [category, name] = key.split(':');
        return { category, name };
      })
    : [];

  // Group properties by category
  const propertiesByCategory = allProperties.reduce((acc, prop) => {
    if (!acc[prop.category]) {
      acc[prop.category] = [];
    }
    acc[prop.category].push(prop.name);
    return acc;
  }, {} as Record<string, string[]>);

  const materialOptions = materials.map(m => ({
    value: m.id,
    label: `${m.name}${m.designation ? ` (${m.designation})` : ''}`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">材料对比</h1>
        <p className="text-gray-600">选择 2-4 个材料进行性能对比</p>
      </div>

      {/* Selection */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">选择材料</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Select
                key={index}
                options={[
                  { value: '', label: '请选择材料' },
                  ...materialOptions,
                ]}
                value={selectedIds[index] || ''}
                onChange={(e) => {
                  const newIds = [...selectedIds];
                  newIds[index] = e.target.value;
                  setSelectedIds(newIds.filter(id => id));
                }}
              />
            ))}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                已选择 {selectedIds.length} 个材料
              </span>
              <Button onClick={handleCompare} disabled={comparing || selectedIds.length < 2}>
                {comparing ? '对比中...' : '开始对比'}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Comparison Results */}
      {comparisonData.length > 0 && (
        <div className="space-y-6">
          {/* Material Headers */}
          <Card>
            <CardBody>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {comparisonData.map(material => (
                  <div key={material.id} className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">{material.name}</h3>
                    {material.designation && (
                      <p className="text-sm text-gray-600 mb-2">{material.designation}</p>
                    )}
                    <Badge variant="primary">{material.category.name}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Properties Comparison */}
          {Object.entries(propertiesByCategory).map(([category, propertyNames]) => (
            <Card key={category}>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
              </CardHeader>
              <CardBody>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          属性名称
                        </th>
                        {comparisonData.map(material => (
                          <th key={material.id} className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                            {material.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {propertyNames.map(propertyName => (
                        <tr key={propertyName} className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {propertyName}
                          </td>
                          {comparisonData.map(material => {
                            const prop = material.properties.find(
                              p => p.propertyName === propertyName &&
                                   p.category.name === category
                            );
                            return (
                              <td key={material.id} className="px-4 py-2 text-center text-sm">
                                {prop ? formatValue(prop) : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
