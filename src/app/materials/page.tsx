'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface Material {
  id: string;
  name: string;
  designation: string | null;
  description: string | null;
  category: {
    id: string;
    name: string;
  };
  properties: any[];
  compositions: any[];
}

interface Category {
  id: string;
  name: string;
  _count: {
    materials: number;
  };
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [materialsRes, categoriesRes] = await Promise.all([
        fetch('/api/materials'),
        fetch('/api/categories'),
      ]);

      // 检查响应状态
      if (!materialsRes.ok) {
        const errorData = await materialsRes.json();
        throw new Error(errorData.details || errorData.error || 'Failed to fetch materials');
      }

      if (!categoriesRes.ok) {
        const errorData = await categoriesRes.json();
        throw new Error(errorData.details || errorData.error || 'Failed to fetch categories');
      }

      const materialsData = await materialsRes.json();
      const categoriesData = await categoriesRes.json();

      setMaterials(materialsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (categoryId) params.append('categoryId', categoryId);

      const res = await fetch(`/api/materials?${params.toString()}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.error || 'Search request failed');
      }

      const data = await res.json();
      setMaterials(data);
    } catch (error) {
      console.error('Failed to search materials:', error);
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个材料吗？')) return;

    try {
      await fetch(`/api/materials/${id}`, { method: 'DELETE' });
      setMaterials(materials.filter(m => m.id !== id));
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  const categoryOptions = [
    { value: '', label: '全部类别' },
    ...categories.map(c => ({ value: c.id, label: `${c.name} (${c._count.materials})` })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">材料列表</h1>
        <Link href="/materials/new">
          <Button>新增材料</Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="搜索材料名称或牌号..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Select
              options={categoryOptions}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? '搜索中...' : '搜索'}
            </Button>
          </div>

          {/* 错误信息显示 */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                <strong>错误：</strong>{error}
              </p>
              <p className="text-xs text-red-500 mt-1">
                请检查控制台获取更多详细信息
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Materials Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">加载中...</div>
        </div>
      ) : materials.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-gray-500 mb-4">没有找到材料</p>
            <Link href="/materials/new">
              <Button variant="primary">添加第一个材料</Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Link href={`/materials/${material.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        {material.name}
                      </h3>
                    </Link>
                    {material.designation && (
                      <p className="text-sm text-gray-600">{material.designation}</p>
                    )}
                  </div>
                  <Badge variant="primary">{material.category.name}</Badge>
                </div>
              </CardHeader>
              <CardBody>
                {material.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {material.description}
                  </p>
                )}
                <div className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">性能数据:</span> {material.properties.length} 条 |
                  <span className="font-medium ml-2">成分:</span> {material.compositions.length} 项
                </div>
                <div className="flex space-x-2">
                  <Link href={`/materials/${material.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      查看详情
                    </Button>
                  </Link>
                  <Link href={`/materials/${material.id}/edit`} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full">
                      编辑
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(material.id)}
                  >
                    删除
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
