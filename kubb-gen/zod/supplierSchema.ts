import { z } from 'zod';

export const supplierSchema = z.object({
  id: z.string().describe('Уникальный идентификатор поставщика'),
  name: z.string().describe('Название компании поставщика'),
  contactName: z.string().describe('ФИО контактного лица'),
  phone: z.string().describe('Номер телефона'),
  marketplaceName: z.string().describe('Название маркетплейса'),
  address: z.string().describe('Адрес'),
  location: z.string().describe('Местоположение (павильон, линия и т.д.)'),
  telegram: z.string().describe('Telegram аккаунт').nullable().nullish(),
  cabinetId: z.string().describe('ID кабинета'),
  createdAt: z.string().datetime().describe('Дата создания'),
  updatedAt: z.string().datetime().describe('Дата обновления'),
});
