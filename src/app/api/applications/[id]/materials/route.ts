import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const materials = await prisma.materialApplication.findMany({
      where: {
        applicationId: id,
      },
      include: {
        material: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        typicalUse: 'desc',
      },
    });

    const result = materials.map((ma) => ({
      id: ma.material.id,
      name: ma.material.name,
      designation: ma.material.designation,
      description: ma.material.description,
      category: ma.material.category,
      typicalUse: ma.typicalUse,
      notes: ma.notes,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch materials by application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}
