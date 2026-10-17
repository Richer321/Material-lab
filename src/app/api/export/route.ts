import { NextRequest, NextResponse } from 'next/server';
import { exportMaterialsToCSV } from '@/lib/services/import-export.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId } = body;

    const csvContent = await exportMaterialsToCSV(categoryId);

    const filename = categoryId
      ? `materials-category-${categoryId}-${new Date().toISOString().split('T')[0]}.csv`
      : `materials-export-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Export failed:', error);
    return NextResponse.json(
      { error: 'Export failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
