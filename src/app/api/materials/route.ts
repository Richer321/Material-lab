import { NextRequest, NextResponse } from 'next/server';
import { getMaterials, createMaterial } from '@/lib/services/material.service';
import { formatErrorResponse, DatabaseError, ValidationError } from '@/lib/utils/error-handler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;

    const filter: any = {};
    if (search) filter.search = search;
    if (categoryId) filter.categoryId = categoryId;

    console.log('Fetching materials with filter:', filter);

    const materials = await getMaterials(filter);
    console.log(`Found ${materials.length} materials`);

    return NextResponse.json(materials);
  } catch (error) {
    console.error('Failed to fetch materials:', error);

    // 返回标准化的错误响应
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 基本验证
    if (!data.name || !data.categoryId) {
      throw new ValidationError('Material name and category are required');
    }

    const material = await createMaterial(data);
    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error('Failed to create material:', error);

    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}
