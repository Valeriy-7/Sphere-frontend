import { z } from 'zod'

export const listItemDtoSchema = z.object({
  id: z.string().describe('ID записи (кабинета или пользователя)'),
  userId: z.string().describe('ID пользователя'),
  number1: z.string().describe('Номер первого уровня'),
  fullName: z.string().describe('ФИО'),
  phone: z.string().describe('Номер телефона'),
  number2: z.string().describe('Номер второго уровня'),
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации'),
  inn: z.string().describe('ИНН'),
  companyName: z.string().describe('Название организации'),
  createAt: z.string().describe('Дата создания'),
  status: z.enum(['VERIFIED', 'UNVERIFIED', 'PENDING', 'BLOCKED']).describe('Статус'),
})