import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { formatErrorResponse } from '@/lib/utils/error-handler';

export async function GET() {
  try {
    const treatments = await prisma.surfaceTreatment.findMany({
      orderBy: { name: 'asc' },
    });

    // 将JSON字符串转换回数组
    const processedTreatments = treatments.map(treatment => ({
      ...treatment,
      applications: treatment.applications ? JSON.parse(treatment.applications) : [],
      advantages: treatment.advantages ? JSON.parse(treatment.advantages) : [],
      limitations: treatment.limitations ? JSON.parse(treatment.limitations) : [],
      processFlow: treatment.processFlow ? JSON.parse(treatment.processFlow) : [],
      parameters: treatment.parameters ? JSON.parse(treatment.parameters) : [],
      precautions: treatment.precautions ? JSON.parse(treatment.precautions) : []
    }));

    return NextResponse.json(processedTreatments);
  } catch (error) {
    console.error('Failed to fetch surface treatments:', error);
    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode || 500 });
  }
}