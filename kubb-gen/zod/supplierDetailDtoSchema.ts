import { productDtoSchema } from './productDtoSchema'
import { z } from 'zod'

export const supplierDetailDtoSchema = z.object({
  id: z.string().uuid().describe('ID поставщика'),
  name: z.string().describe('Название поставщика'),
  address: z.string().describe('Адрес поставщика').nullable(),
  contactPerson: z.string().describe('Контактное лицо').nullable(),
  contactPhone: z.string().describe('Контактный телефон'),
  marketPlace: z.string().describe('Место на рынке / Секция').nullable(),
  products: z.array(z.lazy(() => productDtoSchema)).describe('Список продуктов поставщика'),
  totalItemTypes: z.number().describe('Кол-во типов товаров (уникальных артикулов)').optional(),
  totalItemUnits: z.number().describe('Кол-во товаров в единицах (сумма quantity)'),
})