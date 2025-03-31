import { z } from 'zod'

export const partnerStatsDtoSchema = z.object({
  totalIncome: z.number().describe('Общий доход'),
  totalFfDeliveries: z.number().describe('Общее количество поставок на ФФ'),
  totalProductsCount: z.number().describe('Общее количество товара'),
  totalDefectsCount: z.number().describe('Общее количество брака'),
  totalConsumablesAmount: z.number().describe('Общая сумма расходников'),
  totalPvzReturnsCount: z.number().describe('Общее количество возвратов с ПВЗ'),
  totalWbDeliveries: z.number().describe('Общее количество поставок на ВБ'),
  totalProductAmount: z.number().describe('Общая сумма продукта'),
})