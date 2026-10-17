'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export default function ExportPage() {
  const [exporting, setExporting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        // 只显示顶级类别（没有父类别的）
        const topCategories = data.filter((cat: Category) => !cat.parentId);
        setCategories(topCategories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const categoryName = selectedCategory === 'all' ? 'all' : categories.find(c => c.id === selectedCategory)?.name || 'category';
        a.download = `materials-${categoryName}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('导出失败，请重试');
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">导出材料数据</h1>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">导出选项</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">选择材料类别</h4>
              {loading ? (
                <p className="text-sm text-gray-600">加载类别中...</p>
              ) : (
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory((e.target as HTMLSelectElement).value)}
                  options={[
                    { value: 'all', label: '所有材料' },
                    ...categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    })),
                  ]}
                  className="w-full"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">
                {selectedCategory === 'all' ? '将导出所有类别的材料' : `仅导出 "${categories.find(c => c.id === selectedCategory)?.name}" 类别的材料`}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">导出内容</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>材料基本信息（名称、牌号、类别、描述）</li>
                <li>性能数据统计</li>
                <li>成分数据统计</li>
                <li>创建时间</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">导出格式</h4>
              <p className="text-sm text-gray-600">CSV 格式，可用 Excel 或其他表格软件打开</p>
            </div>

            <Button onClick={handleExport} disabled={exporting} className="w-full">
              {exporting ? '导出中...' : selectedCategory === 'all' ? '导出所有材料数据' : '导出选定类别材料'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">使用说明</h3>
        </CardHeader>
        <CardBody>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. 选择要导出的材料类别（默认导出所有材料）</p>
            <p>2. 点击导出按钮开始导出</p>
            <p>3. 导出的 CSV 文件将自动下载到您的下载文件夹</p>
            <p>4. 使用 Excel 打开时，中文将正常显示</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
