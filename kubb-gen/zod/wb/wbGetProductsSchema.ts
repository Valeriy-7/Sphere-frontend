import { productListResponseDtoSchema } from '../productListResponseDtoSchema'
import { z } from 'zod'

export const wbGetProductsQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
  search: z.string().describe('Поисковый запрос для фильтрации по названию продукта').optional(),
})

/**
 * @description Список продуктов успешно получен
 */
export const wbGetProducts200Schema = z.lazy(() => productListResponseDtoSchema)

export const wbGetProductsQueryResponseSchema = z.lazy(() => wbGetProducts200Schema)