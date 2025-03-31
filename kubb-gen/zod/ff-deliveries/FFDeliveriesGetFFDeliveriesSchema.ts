import { deliveryStatusSchema } from '../deliveryStatusSchema'
import { FFDeliveryWithRoutesListResponseDtoSchema } from '../FFDeliveryWithRoutesListResponseDtoSchema'
import { z } from 'zod'

export const FFDeliveriesGetFFDeliveriesQueryParamsSchema = z
  .object({
    page: z.number().min(1).default(1).describe('Номер страницы'),
    limit: z.number().min(-1).max(100).default(10).describe('Количество записей на странице. Для получения всех записей установите значение -1.'),
    status: z.lazy(() => deliveryStatusSchema).optional(),
    startDate: z.date().describe('Дата начала периода в формате ISO (YYYY-MM-DD)').optional(),
    endDate: z.date().describe('Дата окончания периода в формате ISO (YYYY-MM-DD)').optional(),
    deliveryDate: z.date().describe('Конкретная дата поставки в формате ISO (YYYY-MM-DD). Если указана, то startDate и endDate игнорируются.').optional(),
    deliveryNumber: z.string().describe('Номер поставки (последние 5 символов ID)').optional(),
  })
  .optional()

/**
 * @description Список поставок с маршрутами, поставщиками и статистикой
 */
export const FFDeliveriesGetFFDeliveries200Schema = z.lazy(() => FFDeliveryWithRoutesListResponseDtoSchema)

/**
 * @description Не авторизован
 */
export const FFDeliveriesGetFFDeliveries401Schema = z.any()

export const FFDeliveriesGetFFDeliveriesQueryResponseSchema = z.lazy(() => FFDeliveriesGetFFDeliveries200Schema)