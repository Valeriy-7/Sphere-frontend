import { partnersResponseDtoSchema } from '../partnersResponseDtoSchema'
import { z } from 'zod'

export const cabinetsGetAvailablePartnersQueryParamsSchema = z
  .object({
    search: z.string().describe('Поиск по названию компании').optional(),
    type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации').optional(),
    sortBy: z.enum(['createdAt', 'companyName', 'number1', 'type']).default('createdAt').describe('Поле для сортировки'),
    sortOrder: z.enum(['ASC', 'DESC']).default('DESC').describe('Порядок сортировки'),
    page: z.number().min(1).default(1).describe('Номер страницы'),
    limit: z.number().min(-1).max(100).default(10).describe('Количество элементов на странице. Используйте -1 для получения всех записей.'),
  })
  .optional()

/**
 * @description Список доступных кабинетов
 */
export const cabinetsGetAvailablePartners200Schema = z.lazy(() => partnersResponseDtoSchema)

export const cabinetsGetAvailablePartnersQueryResponseSchema = z.lazy(() => cabinetsGetAvailablePartners200Schema)