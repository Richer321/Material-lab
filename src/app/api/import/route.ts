import { NextRequest, NextResponse } from 'next/server';
import { importMaterialsFromCSV } from '@/lib/services/import-export.service';

export async function POST(request: NextRequest) {
  try {
    const { csvContent } = await request.json();

    if (!csvContent) {
      return NextResponse.json({ error: 'CSV content is required' }, { status: 400 });
    }

    const result = await importMaterialsFromCSV(csvContent);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Import failed:', error);
    return NextResponse.json(
      { error: 'Import failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
