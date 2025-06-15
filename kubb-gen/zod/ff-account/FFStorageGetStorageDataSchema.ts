import { z } from 'zod'

/**
 * @description Storage data successfully retrieved
 */
export const FFStorageGetStorageData200Schema = z.object({
  summary: z
    .object({
      currentStock: z
        .object({
          products: z.number().optional(),
          items: z.number().optional(),
          defects: z.number().optional(),
          returnsFromPickup: z.number().optional(),
        })
        .optional(),
      consumables: z
        .object({
          ff: z.number().optional(),
          stores: z.number().optional(),
        })
        .optional(),
      received: z
        .object({
          items: z.number().optional(),
          defects: z.number().optional(),
          consumables: z.number().optional(),
        })
        .optional(),
      shipped: z
        .object({
          toWB: z.number().optional(),
          otherMarketplaces: z.number().optional(),
          defects: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  suppliers: z
    .array(
      z.object({
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
      }),
    )
    .optional(),
})

/**
 * @description Unauthorized
 */
export const FFStorageGetStorageData401Schema = z.any()

export const FFStorageGetStorageDataQueryResponseSchema = z.lazy(() => FFStorageGetStorageData200Schema)