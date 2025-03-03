import { z } from 'zod';

export const deliverySchema = z.object({
  id: z.string().describe('Уникальный идентификатор поставки'),
  cabinetId: z.string().describe('ID кабинета'),
  deliveryDate: z.string().datetime().describe('Дата поставки'),
  cargoPlaces: z.number().describe('Количество грузовых мест').optional(),
  totalProductsPrice: z.number().describe('Общая стоимость товаров'),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до фулфилмента'),
  ffServicesPrice: z.number().describe('Стоимость услуг фулфилмента'),
  totalAmount: z.number().describe('Итоговая сумма'),
  createdAt: z.string().datetime().describe('Дата создания записи'),
  updatedAt: z.string().datetime().describe('Дата последнего обновления записи'),
});
