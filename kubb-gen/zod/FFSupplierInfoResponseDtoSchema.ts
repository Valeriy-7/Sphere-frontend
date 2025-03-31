import { z } from 'zod'

export const FFSupplierInfoResponseDtoSchema = z.object({
  id: z.string().describe('ID поставщика'),
  name: z.string().describe('Название поставщика'),
  address: z.string().describe('Адрес поставщика').optional(),
  contactPerson: z.string().describe('Контактное лицо').optional(),
  contactPhone: z.string().describe('Контактный телефон').optional(),
  location: z.string().describe('Местоположение').optional(),
  isTG: z.boolean().describe('Является ли поставщик ТГ').optional(),
  number: z.number().describe('Порядковый номер поставщика').optional(),
  planQuantity: z.number().describe('Плановое количество товаров поставщика').optional(),
  factQuantity: z.number().describe('Фактическое количество товаров поставщика').optional(),
  defects: z.number().describe('Количество дефектов у поставщика').optional(),
  productsPrice: z.number().describe('Стоимость товаров поставщика').optional(),
  ffServicesPrice: z.number().describe('Стоимость услуг фулфилмента для поставщика').optional(),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до фулфилмента для поставщика').optional(),
  totalPrice: z.number().describe('Общая сумма для поставщика (товары + услуги + логистика)').optional(),
})