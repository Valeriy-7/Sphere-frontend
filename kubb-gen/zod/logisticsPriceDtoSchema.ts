import { deliveryPointDtoSchema } from './deliveryPointDtoSchema'
import { z } from 'zod'

export const logisticsPriceDtoSchema = z.object({
  fromPoint: z.lazy(() => deliveryPointDtoSchema).describe('Точка отправления'),
  toPoint: z.lazy(() => deliveryPointDtoSchema).describe('Точка назначения'),
  priceUpTo1m3: z.number().describe('Цена за объем до 1 м³'),
  pricePer1m3: z.number().describe('Цена за 1 м³'),
  description: z.string().describe('Описание маршрута').optional(),
})