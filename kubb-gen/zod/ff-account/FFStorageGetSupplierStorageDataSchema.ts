import { z } from 'zod'

export const FFStorageGetSupplierStorageDataPathParamsSchema = z.object({
  supplierId: z.string().uuid().describe('Supplier ID'),
})

/**
 * @description Supplier storage data successfully retrieved
 */
export const FFStorageGetSupplierStorageData200Schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  imageUrl: z.string().nullable().nullish(),
  totalProducts: z.number().optional(),
  totalItems: z.number().optional(),
  totalDefects: z.number().optional(),
  totalConsumables: z.number().optional(),
  totalReturns: z.number().optional(),
  products: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
        article: z.string().optional(),
        storageLocation: z.string().optional(),
        totalQuantity: z.number().optional(),
        totalDefects: z.number().optional(),
        sizes: z
          .array(
            z.object({
              id: z.string().uuid().optional(),
              sizeKey: z.string().optional(),
              sizeDisplay: z.string().optional(),
              wbSize: z.string().optional(),
              techSize: z.string().optional(),
              storageLocation: z.string().optional(),
              factQuantity: z.number().optional(),
              defects: z.number().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
})

/**
 * @description Unauthorized
 */
export const FFStorageGetSupplierStorageData401Schema = z.any()

/**
 * @description Supplier not found
 */
export const FFStorageGetSupplierStorageData404Schema = z.any()

export const FFStorageGetSupplierStorageDataQueryResponseSchema = z.lazy(() => FFStorageGetSupplierStorageData200Schema)