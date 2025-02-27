import { listResponseDtoSchema } from '../listResponseDtoSchema';
import { z } from 'zod';

export const adminGetListQueryParamsSchema = z
  .object({
    mode: z.enum(['all', 'requests', 'blocked']).describe('Режим отображения').optional(),
    search: z.string().describe('Поисковый запрос (ФИО, ИНН, название организации)').optional(),
    type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации').optional(),
    dateFrom: z.string().describe('Дата начала периода').optional(),
    dateTo: z.string().describe('Дата конца периода').optional(),
    page: z.number().describe('Номер страницы').optional(),
    limit: z
      .number()
      .describe('Количество элементов на странице. Значение -1 вернет все элементы без пагинации.')
      .optional(),
    sortField: z
      .enum(['createdAt', 'type', 'companyName', 'isVerified'])
      .describe('Поле для сортировки')
      .optional(),
    sortDesc: z.boolean().describe('Направление сортировки (по убыванию)').optional(),
  })
  .optional();

/**
 * @description Список успешно получен
 */
export const adminGetList200Schema = z.lazy(() => listResponseDtoSchema);

export const adminGetListQueryResponseSchema = z.lazy(() => adminGetList200Schema);
