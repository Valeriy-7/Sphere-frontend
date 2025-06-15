import { z } from 'zod'

export const assignGroupResponsibleDtoSchema = z.object({
  deliveryIds: z.array(z.string()).describe('Список идентификаторов поставок'),
  responsiblePersonIds: z.array(z.string()).describe('Список идентификаторов ответственных сотрудников'),
})