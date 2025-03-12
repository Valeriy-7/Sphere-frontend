import { z } from 'zod';

export const logisticsSchema = z.object({
  id: z.string().describe('ID записи логистики'),
  number: z.number().describe('Номер записи логистики'),
  cabinetId: z.string().describe('ID кабинета'),
  fromPointId: z.string().describe('ID точки отправления'),
  toPointId: z.string().describe('ID точки назначения'),
  fromPointType: z
    .enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE'])
    .describe('Тип точки отправления'),
  toPointType: z
    .enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE'])
    .describe('Тип точки назначения'),
  priceUpTo1m3: z.number().describe('Цена за объем до 1 м³'),
  pricePer1m3: z.number().describe('Цена за 1 м³'),
  description: z.string().describe('Описание маршрута'),
  createdAt: z.date().describe('Дата создания'),
  updatedAt: z.date().describe('Дата обновления'),
});
