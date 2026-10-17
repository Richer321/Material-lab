import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const manufacturingMethods = await prisma.materialManufacturingMethod.findMany({
      where: {
        materialId: id,
      },
      include: {
        method: true,
      },
    });

    const result = manufacturingMethods.map((mm) => ({
      id: mm.method.id,
      name: mm.method.name,
      category: mm.method.category,
      description: mm.method.description,
      difficulty: mm.difficulty,
      notes: mm.notes,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch manufacturing methods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch manufacturing methods' },
      { status: 500 }
    );
  }
}
