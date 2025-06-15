import { z } from 'zod'

/**
 * @description Storage data successfully retrieved
 */
export const FFStorageGetAllStorageData200Schema = z.array(
  z.object({
    supplier: z.string().optional(),
    sizeList: z
      .array(
        z.object({
          id: z.string().optional(),
          number: z.number().optional(),
          key2: z.string().optional(),
          key3: z.string().optional(),
          key4: z.string().optional(),
          key5: z.number().optional(),
          key14: z.string().optional(),
          factQuantity: z.number().optional(),
          defects: z.number().optional(),
        }),
      )
      .optional(),
    productList: z
      .array(
        z.object({
          id: z.string().uuid().optional(),
          number: z.number().optional(),
          key2: z.string().optional(),
          key3: z.string().optional(),
          key4: z.string().optional(),
          key5: z.number().optional(),
          key14: z.string().optional(),
          sizeList: z
            .array(
              z.object({
                id: z.string().optional(),
                number: z.number().optional(),
                key2: z.string().optional(),
                key3: z.string().optional(),
                key4: z.string().optional(),
                key5: z.number().optional(),
                key14: z.string().optional(),
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

/**
 * @description Unauthorized
 */
export const FFStorageGetAllStorageData401Schema = z.any()

export const FFStorageGetAllStorageDataQueryResponseSchema = z.lazy(() => FFStorageGetAllStorageData200Schema)