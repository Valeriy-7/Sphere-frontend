import { z } from 'zod';

export const logisticsProviderListItemDtoSchema = z.object({
  id: z.string().uuid().describe('ID логиста'),
  name: z.string().describe('Название компании логиста'),
  contactName: z.string().describe('Имя контактного лица'),
  phone: z.string().describe('Контактный телефон'),
  carModel: z.string().describe('Модель автомобиля').optional(),
  carNumber: z.string().describe('Номер автомобиля').optional(),
  telegram: z.string().describe('Telegram аккаунт').optional(),
});
