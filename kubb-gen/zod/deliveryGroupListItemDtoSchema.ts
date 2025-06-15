import { z } from 'zod'

export const deliveryGroupListItemDtoSchema = z.object({
  id: z.string().describe('ID группы поставок'),
  groupName: z.string().describe('Название группы').nullable(),
  status: z.enum(['new', 'reception', 'accepted', 'preparation', 'to_work', 'completed']).describe('Статус группы'),
  totalDeliveries: z.number().describe('Количество поставок в группе'),
  totalCargoPlaces: z.number().describe('Общее количество грузовых мест'),
  createdAt: z.date().describe('Дата создания группы'),
  sentToReceptionAt: z.date().describe('Дата отправки в приемку').nullable(),
  acceptedAt: z.date().describe('Дата принятия').nullable(),
  createdBy: z.object({}).describe('Информация о создателе группы').nullable(),
})