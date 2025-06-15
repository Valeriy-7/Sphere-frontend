import { z } from 'zod'

export const updateDeliveryGroupDtoSchema = z.object({
  groupName: z.string().describe('Название группы поставок').optional(),
  deliveryIds: z.array(z.string()).describe('Массив ID поставок в группе').optional(),
})