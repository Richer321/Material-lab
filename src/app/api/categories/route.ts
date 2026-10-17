import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/services/material.service';
import { formatErrorResponse } from '@/lib/utils/error-handler';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}
