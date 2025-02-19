import { z } from 'zod'

export const partnerCabinetDtoSchema = z.object({
  id: z.string().describe('ID кабинета'),
  number1: z.string().describe('Номер первого уровня'),
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации'),
  companyName: z.string().describe('Название компании'),
  avatarUrl: z.string().describe('URL аватарки'),
  isVerified: z.boolean().describe('Статус верификации'),
  companyPhone: z.string().describe('Контактный телефон'),
  telegramUrl: z.string().describe('Telegram'),
  createdAt: z.string().datetime().describe('Дата создания'),
})