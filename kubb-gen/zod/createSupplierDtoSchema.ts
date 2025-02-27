import { z } from 'zod';

export const createSupplierDtoSchema = z.object({
  name: z.string().describe('Название поставщика'),
  contactName: z.string().describe('Имя контактного лица'),
  phone: z.string().describe('Номер телефона'),
  marketplaceName: z.string().describe('Название рынка'),
  address: z.string().describe('Адрес'),
  location: z.string().describe('Место (павильон, линия и т.д.)'),
  telegram: z.string().describe('Telegram аккаунт').optional(),
});
