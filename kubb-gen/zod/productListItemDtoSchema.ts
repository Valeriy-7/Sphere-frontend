import { productCityDtoSchema } from './productCityDtoSchema';
import { z } from 'zod';

export const productListItemDtoSchema = z.object({
  id: z.string().describe('ID продукта'),
  article: z.string().describe('Артикул товара'),
  name: z.string().describe('Название товара'),
  color: z.string().describe('Цвет товара'),
  category: z.string().describe('Категория товара'),
  total: z.number().describe('Общее количество товара'),
  inStock: z.number().describe('Количество товара на складе'),
  inTransitToClient: z.number().describe('Количество товара в пути к клиенту'),
  inTransitFromClient: z.number().describe('Количество товара в пути от клиента'),
  sizes: z.array(z.string()).describe('Размеры товара'),
  numericSizes: z.array(z.string()).describe('Числовые размеры товара'),
  volume: z.number().describe('Объем товара'),
  volumeUnit: z.string().describe('Единица измерения объема'),
  totalSupplied: z.number().describe('Всего поставлено товара'),
  totalSold: z.number().describe('Всего продано товара'),
  salesPercentage: z.number().describe('Процент продаж'),
  totalOrders: z.number().describe('Всего заказов'),
  totalCancellations: z.number().describe('Всего отмен'),
  totalReturns: z.number().describe('Всего возвратов'),
  cities: z.array(z.lazy(() => productCityDtoSchema)).describe('Распределение по городам'),
  imageUrl: z.string().describe('URL изображения товара'),
});
