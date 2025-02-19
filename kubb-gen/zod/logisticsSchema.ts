import { z } from 'zod'

export const logisticsSchema = z.object({
  id: z.string().describe('ID записи логистики'),
  cabinetId: z.string().describe('ID кабинета'),
  number: z.number().describe('Порядковый номер'),
  fromLocation: z.string().describe('Пункт отправления'),
  fromAddress: z.string().describe('Адрес отправления'),
  toLocation: z.string().describe('Пункт назначения'),
  toAddress: z.string().describe('Адрес назначения'),
  priceUpTo1m3: z.number().describe('Цена за объем до 1 м³'),
  pricePer1m3: z.number().describe('Цена за 1 м³'),
  comment: z.string().describe('Комментарий'),
})