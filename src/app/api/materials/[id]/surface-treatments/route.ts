import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { formatErrorResponse } from '@/lib/utils/error-handler';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const materialSurfaceTreatments = await prisma.materialSurfaceTreatment.findMany({
      where: { materialId: id },
      include: {
        treatment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // 将JSON字符串转换回数组
    const processedTreatments = materialSurfaceTreatments.map(item => ({
      ...item,
      treatment: {
        ...item.treatment,
        applications: item.treatment.applications ? JSON.parse(item.treatment.applications) : [],
        advantages: item.treatment.advantages ? JSON.parse(item.treatment.advantages) : [],
        limitations: item.treatment.limitations ? JSON.parse(item.treatment.limitations) : [],
        processFlow: item.treatment.processFlow ? JSON.parse(item.treatment.processFlow) : [],
        parameters: item.treatment.parameters ? JSON.parse(item.treatment.parameters) : [],
        precautions: item.treatment.precautions ? JSON.parse(item.treatment.precautions) : []
      }
    }));

    return NextResponse.json(processedTreatments);
  } catch (error) {
    console.error('Failed to fetch material surface treatments:', error);
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}