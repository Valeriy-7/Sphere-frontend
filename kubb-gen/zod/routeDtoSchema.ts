import { supplierDetailDtoSchema } from './supplierDetailDtoSchema'
import { z } from 'zod'

export const routeDtoSchema = z.object({
  marketName: z.string().describe('Название рынка/места отправления'),
  marketAddress: z.string().describe('Адрес рынка/места отправления').nullable(),
  ffName: z.string().describe('Название ФФ (куда доставляют)').nullable(),
  ffAddress: z.string().describe('Адрес ФФ').nullable(),
  totalItems: z.number().describe('Итоговое (суммарное) значение кол-ва товаров по данному маршруту'),
  suppliers: z.array(z.lazy(() => supplierDetailDtoSchema)).describe('Список поставщиков на этом маршруте'),
})