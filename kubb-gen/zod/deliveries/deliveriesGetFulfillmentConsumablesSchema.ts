import { consumableSchema } from '../consumableSchema'
import { z } from 'zod'

/**
 * @description Список расходных материалов успешно получен
 */
export const deliveriesGetFulfillmentConsumables200Schema = z.array(z.lazy(() => consumableSchema))

/**
 * @description Не авторизован
 */
export const deliveriesGetFulfillmentConsumables401Schema = z.any()

export const deliveriesGetFulfillmentConsumablesQueryResponseSchema = z.lazy(() => deliveriesGetFulfillmentConsumables200Schema)