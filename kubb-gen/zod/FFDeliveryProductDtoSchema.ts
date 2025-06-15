import { z } from 'zod'

export const FFDeliveryProductDtoSchema = z.object({
  id: z.string().uuid().describe('ID продукта'),
  number: z.number().describe('Порядковый номер'),
  name: z.string().describe('Название продукта'),
  article: z.string().describe('Артикул товара'),
  imageUrl: z.string().describe('URL изображения продукта'),
  color: z.string().describe('Цвет товара').optional(),
  category: z.string().describe('Категория товара').optional(),
  brand: z.string().describe('Бренд товара').optional(),
  size: z.string().describe('Размер товара').optional(),
  numericSize: z.string().describe('Числовой размер товара').optional(),
  volume: z.number().describe('Объем товара').optional(),
  volumeUnit: z.string().describe('Единица измерения объема').optional(),
  sizes: z.array(z.string()).describe('Доступные размеры товара').optional(),
  colors: z.array(z.string()).describe('Доступные цвета товара').optional(),
  characteristics: z.object({}).describe('Характеристики товара').optional(),
  planQuantity: z.number().describe('Плановое количество'),
  factQuantity: z.number().describe('Фактическое количество (может быть null или "-" после создания поставки)').nullable(),
  defects: z.number().describe('Количество дефектов (может быть null или "-" после создания поставки)').nullable(),
  price: z.number().describe('Цена за единицу'),
  logisticsPrice: z.number().describe('Стоимость логистики за единицу'),
  consumablesPrice: z.number().describe('Стоимость расходников за единицу'),
  supplierId: z.string().uuid().describe('ID поставщика'),
  supplierName: z.string().describe('Название поставщика'),
  warehousePlace: z.string().describe('Место на складе').optional(),
  sizeQuantities: z
    .array(
      z.object({
        id: z.string().describe('ID размера'),
        sizeKey: z.string().describe('Ключ размера'),
        sizeDisplay: z.string().describe('Отображаемый размер'),
        wbSize: z.string().describe('Размер WB').optional(),
        techSize: z.string().describe('Технический размер').optional(),
        storageLocation: z.string().describe('Место хранения').optional(),
        factQuantity: z.number().describe('Фактическое количество'),
        defects: z.number().describe('Количество дефектов'),
      }),
    )
    .describe('Индивидуальные количества по размерам')
    .optional(),
})