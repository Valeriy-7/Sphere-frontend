import { z } from 'zod'

export const supplierSchema = z.object({
  id: z.string().describe('Уникальный идентификатор поставщика'),
  name: z.string().describe('Название компании поставщика'),
  contactName: z.string().describe('Имя контактного лица'),
  phone: z.string().describe('Номер телефона'),
  marketplaceName: z.string().describe('Название рынка'),
  address: z.string().describe('Адрес'),
  location: z.string().describe('Место (павильон, линия и т.д.)'),
  isTG: z.boolean().describe('Является ли поставщик ТГ').nullable().nullish(),
  cabinetId: z.string().describe('ID кабинета'),
  createdAt: z.date().describe('Дата создания'),
  updatedAt: z.date().describe('Дата обновления'),
})