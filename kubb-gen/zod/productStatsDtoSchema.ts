import { z } from 'zod';

export const productStatsDtoSchema = z.object({
  totalProducts: z.number().describe('Общее количество товаров'),
  totalInStock: z.number().describe('Общее количество товаров на складе'),
  totalInTransitToClient: z.number().describe('Общее количество товаров в пути к клиенту'),
  totalInTransitFromClient: z.number().describe('Общее количество товаров в пути от клиента'),
  totalSupplied: z.number().describe('Общее количество поставленных товаров'),
  totalSold: z.number().describe('Общее количество проданных товаров'),
  totalSalesPercentage: z.number().describe('Общий процент продаж'),
  totalOrders: z.number().describe('Общее количество заказов'),
  totalCancellations: z.number().describe('Общее количество отмен'),
  totalReturns: z.number().describe('Общее количество возвратов'),
});
