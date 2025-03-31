import { createDeliveryDtoSchema } from '../createDeliveryDtoSchema'
import { deliverySchema } from '../deliverySchema'
import { z } from 'zod'

/**
 * @description Поставка успешно создана
 */
export const deliveriesCreateDelivery201Schema = z.lazy(() => deliverySchema)

/**
 * @description Некорректные данные в запросе
 */
export const deliveriesCreateDelivery400Schema = z.any()

/**
 * @description Кабинет не найден
 */
export const deliveriesCreateDelivery404Schema = z.any()

export const deliveriesCreateDeliveryMutationRequestSchema = z.lazy(() => createDeliveryDtoSchema)

export const deliveriesCreateDeliveryMutationResponseSchema = z.lazy(() => deliveriesCreateDelivery201Schema)