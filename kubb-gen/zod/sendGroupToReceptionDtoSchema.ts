import { z } from 'zod'

export const sendGroupToReceptionDtoSchema = z.object({
  deliveryIds: z.array(z.string()).describe('Список идентификаторов поставок'),
  responsiblePersonIds: z.array(z.string()).describe('Список идентификаторов ответственных сотрудников (опционально)').optional(),
  logisticsTypeId: z.string().describe('Идентификатор типа логистики (опционально)').optional(),
})