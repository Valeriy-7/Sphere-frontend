import { z } from 'zod'

export const FFStorageSearchStorageDataQueryParamsSchema = z
  .object({
    search: z.string().describe('Search by supplier name or ID').optional(),
    minQuantity: z.number().describe('Minimum total quantity filter').optional(),
    maxQuantity: z.number().describe('Maximum total quantity filter').optional(),
    minDefects: z.number().describe('Minimum defects filter').optional(),
    maxDefects: z.number().describe('Maximum defects filter').optional(),
    sortBy: z.enum(['name', 'totalQuantity', 'totalDefects', 'totalProducts']).describe('Sort field').optional(),
    sortOrder: z.enum(['asc', 'desc']).describe('Sort order').optional(),
  })
  .optional()

/**
 * @description Filtered storage data
 */
export const FFStorageSearchStorageData200Schema = z.any()

export const FFStorageSearchStorageDataQueryResponseSchema = z.lazy(() => FFStorageSearchStorageData200Schema)