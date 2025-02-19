import { z } from 'zod'

export const createLogisticsDtoSchema = z.object({
  fromLocation: z.string().describe('Место отправления'),
  fromAddress: z.string().describe('Адрес отправления'),
  toLocation: z.string().describe('Место назначения'),
  toAddress: z.string().describe('Адрес назначения'),
  priceUpTo1m3: z.number().describe('Цена до 1м3'),
  pricePer1m3: z.number().describe('Цена за 1м3'),
  comment: z.string().describe('Комментарий').optional(),
  number: z.number().describe('Порядковый номер').optional(),
})