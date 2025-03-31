import { z } from 'zod'

export const FFDeliveryProductDtoSchema = z.object({
  id: z.string().uuid().describe('ID продукта'),
  number: z.number().describe('Порядковый номер'),
  name: z.string().describe('Название продукта'),
  article: z.string().describe('Артикул товара'),
  imageUrl: z.string().describe('URL изображения продукта'),
  planQuantity: z.number().describe('Плановое количество'),
  factQuantity: z.number().describe('Фактическое количество (может быть null или "-" после создания поставки)').nullable(),
  defects: z.number().describe('Количество дефектов (может быть null или "-" после создания поставки)').nullable(),
  price: z.number().describe('Цена за единицу'),
  logisticsPrice: z.number().describe('Стоимость логистики за единицу'),
  consumablesPrice: z.number().describe('Стоимость расходников за единицу'),
  supplierId: z.string().uuid().describe('ID поставщика'),
  supplierName: z.string().describe('Название поставщика'),
})