import { prisma } from '@/lib/db/prisma';

export async function exportMaterialsToCSV(categoryId?: string) {
  const where = categoryId ? { categoryId } : {};

  const materials = await prisma.material.findMany({
    where,
    include: {
      category: true,
      properties: {
        include: {
          category: true,
        },
      },
      compositions: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  const headers = [
    'ID',
    '材料名称',
    '牌号',
    '类别',
    '描述',
    '性能数量',
    '成分数量',
    '创建时间',
  ];

  const rows = materials.map((m) => [
    m.id,
    m.name,
    m.designation || '',
    m.category.name,
    m.description || '',
    m.properties.length.toString(),
    m.compositions.length.toString(),
    m.createdAt.toISOString(),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  // 添加 UTF-8 BOM 以解决 Excel 中文乱码问题
  return '﻿' + csvContent;
}

export async function parseCSVData(csvContent: string) {
  const lines = csvContent.split('\n').filter((line) => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV 文件为空或格式不正确');
  }

  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''));
  const data: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim().replace(/"/g, ''));
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
}

export async function importMaterialsFromCSV(csvContent: string) {
  const data = await parseCSVData(csvContent);
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const row of data) {
    try {
      // Check if category exists
      let category = await prisma.materialCategory.findFirst({
        where: { name: row['类别'] },
      });

      if (!category) {
        // Create category if it doesn't exist
        category = await prisma.materialCategory.create({
          data: { name: row['类别'] },
        });
      }

      // Create material
      await prisma.material.create({
        data: {
          name: row['材料名称'],
          designation: row['牌号'] || null,
          categoryId: category.id,
          description: row['描述'] || null,
        },
      });

      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push(`材料 "${row['材料名称']}" 导入失败: ${error}`);
    }
  }

  return results;
}
