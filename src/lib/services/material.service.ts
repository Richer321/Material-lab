import { prisma } from '@/lib/db/prisma';
import { MaterialFilter } from '@/types';

export async function getMaterials(filter?: MaterialFilter) {
  try {
    const where: any = {};

    if (filter?.search) {
      // SQLite doesn't support case-insensitive search with mode parameter
      // Use contains without mode for SQLite compatibility
      where.OR = [
        { name: { contains: filter.search } },
        { designation: { contains: filter.search } },
      ];
    }

    if (filter?.categoryId) {
      where.categoryId = filter.categoryId;
    }

    console.log('Querying materials with filter:', where);

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
        dataSources: {
          include: {
            source: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`Found ${materials.length} materials`);
    return materials;
  } catch (error) {
    console.error('Error in getMaterials:', error);
    throw new Error(
      `Failed to fetch materials: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getMaterialById(id: string) {
  try {
    const material = await prisma.material.findUnique({
      where: { id },
      include: {
        category: true,
        properties: {
          include: {
            category: true,
          },
          orderBy: [
            { categoryId: 'asc' },
            { propertyName: 'asc' },
          ],
        },
        compositions: {
          orderBy: { element: 'asc' },
        },
        dataSources: {
          include: {
            source: true,
          },
        },
      },
    });

    if (!material) {
      throw new Error(`Material with id ${id} not found`);
    }

    return material;
  } catch (error) {
    console.error('Error in getMaterialById:', error);
    throw new Error(
      `Failed to fetch material: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function createMaterial(data: any) {
  try {
    const material = await prisma.material.create({
      data,
      include: {
        category: true,
      },
    });
    console.log('Created material:', material.id);
    return material;
  } catch (error) {
    console.error('Error in createMaterial:', error);
    throw new Error(
      `Failed to create material: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function updateMaterial(id: string, data: any) {
  try {
    const material = await prisma.material.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
    console.log('Updated material:', material.id);
    return material;
  } catch (error) {
    console.error('Error in updateMaterial:', error);
    throw new Error(
      `Failed to update material: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function deleteMaterial(id: string) {
  try {
    await prisma.material.delete({
      where: { id },
    });
    console.log('Deleted material:', id);
    return { success: true };
  } catch (error) {
    console.error('Error in deleteMaterial:', error);
    throw new Error(
      `Failed to delete material: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.materialCategory.findMany({
      include: {
        _count: {
          select: { materials: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    console.log(`Found ${categories.length} categories`);
    return categories;
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw new Error(
      `Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getMaterialsWithComparison(ids: string[]) {
  try {
    const materials = await prisma.material.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        category: true,
        properties: {
          include: {
            category: true,
          },
        },
      },
    });
    console.log(`Found ${materials.length} materials for comparison`);
    return materials;
  } catch (error) {
    console.error('Error in getMaterialsWithComparison:', error);
    throw new Error(
      `Failed to fetch materials for comparison: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
