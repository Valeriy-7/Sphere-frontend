import { z } from 'zod'

export const createDeliveryGroupDtoSchema = z.object({
  groupName: z.string().describe('Название группы поставок').optional(),
  deliveryIds: z.array(z.string()).describe('Массив ID поставок для группировки'),
})