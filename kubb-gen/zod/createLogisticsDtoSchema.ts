import { z } from 'zod';

export const createLogisticsDtoSchema = z.object({
  fromPointId: z.string().describe('ID точки отправления'),
  fromPointType: z
    .enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE'])
    .describe('Тип точки отправления'),
  toPointId: z.string().describe('ID точки назначения'),
  toPointType: z
    .enum(['WILDBERRIES', 'FULFILLMENT', 'MARKETPLACE'])
    .describe('Тип точки назначения'),
  priceUpTo1m3: z.number().describe('Цена за объем до 1 м³'),
  pricePer1m3: z.number().describe('Цена за 1 м³'),
  description: z.string().describe('Описание маршрута').optional(),
});
