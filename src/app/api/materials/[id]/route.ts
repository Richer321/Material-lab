import { NextRequest, NextResponse } from 'next/server';
import { getMaterialById, updateMaterial, deleteMaterial } from '@/lib/services/material.service';
import { formatErrorResponse } from '@/lib/utils/error-handler';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const material = await getMaterialById(id);
    return NextResponse.json(material);
  } catch (error) {
    console.error('Failed to fetch material:', error);
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const material = await updateMaterial(id, data);
    return NextResponse.json(material);
  } catch (error) {
    console.error('Failed to update material:', error);
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteMaterial(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to delete material:', error);
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}