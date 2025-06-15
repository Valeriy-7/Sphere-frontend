import { z } from 'zod'

export const wbStorageSearchWbStorageDataQueryParamsSchema = z
  .object({
    sortOrder: z.enum(['asc', 'desc']).describe('Sort order').optional(),
    sortBy: z.enum(['name', 'totalQuantity', 'totalDefects', 'totalProducts']).describe('Sort field').optional(),
    maxDefects: z.number().describe('Maximum defects filter').optional(),
    minDefects: z.number().describe('Minimum defects filter').optional(),
    maxQuantity: z.number().describe('Maximum total quantity filter').optional(),
    minQuantity: z.number().describe('Minimum total quantity filter').optional(),
    search: z.string().describe('Search by product name or article').optional(),
  })
  .optional()

/**
 * @description Filtered WB storage data
 */
export const wbStorageSearchWbStorageData200Schema = z.any()

export const wbStorageSearchWbStorageDataQueryResponseSchema = z.lazy(() => wbStorageSearchWbStorageData200Schema)