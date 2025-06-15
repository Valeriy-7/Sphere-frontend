import { z } from 'zod'

export const assignGroupLogisticsDtoSchema = z.object({
  deliveryIds: z.array(z.string()).describe('Список идентификаторов поставок'),
  logisticsTypeId: z.string().describe('Идентификатор типа логистики'),
})