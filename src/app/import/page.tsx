'use client';

import { useState, useRef } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('请选择 CSV 文件');
      setFile(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      alert('请先选择文件');
      return;
    }

    try {
      setImporting(true);
      const content = await file.text();

      const response = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent: content }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success > 0) {
        alert(`成功导入 ${data.success} 个材料${data.failed > 0 ? `，失败 ${data.failed} 个` : ''}`);
      }
    } catch (error) {
      console.error('Import failed:', error);
      alert('导入失败，请检查文件格式');
    } finally {
      setImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const template = `材料名称,牌号,类别,描述
6061-T6 铝合金,6061-T6,金属材料,6061铝合金是热处理可强化的铝合金
304 不锈钢,SUS304,金属材料,304不锈钢是最常用的不锈钢型号`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'materials-template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">导入材料数据</h1>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">选择文件</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSV 文件
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  已选择: {file.name}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleImport} disabled={!file || importing}>
                {importing ? '导入中...' : '开始导入'}
              </Button>
              <Button
                variant="secondary"
                onClick={handleDownloadTemplate}
              >
                下载模板
              </Button>
            </div>

            {result && (
              <div className={`p-4 rounded-md ${
                result.failed === 0 ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                <p className="font-medium mb-2">
                  导入结果：成功 {result.success} 个，失败 {result.failed} 个
                </p>
                {result.errors.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium mb-1">错误详情：</p>
                    <ul className="list-disc list-inside space-y-1 text-red-600">
                      {result.errors.slice(0, 5).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                      {result.errors.length > 5 && (
                        <li>...还有 {result.errors.length - 5} 个错误</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">使用说明</h3>
        </CardHeader>
        <CardBody>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. 下载 CSV 模板文件</p>
            <p>2. 按照模板格式填写材料数据</p>
            <p>3. 上传填写好的 CSV 文件</p>
            <p>4. 点击"开始导入"进行导入</p>
            <p className="font-medium text-gray-700 mt-4">CSV 格式要求：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>第一行为标题行：材料名称,牌号,类别,描述</li>
              <li>材料名称和类别为必填项</li>
              <li>牌号和描述为可选项</li>
              <li>使用逗号分隔各字段</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
