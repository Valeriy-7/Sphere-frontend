import { z } from 'zod'

export const partnerCabinetDtoSchema = z.object({
  id: z.string().describe('ID кабинета'),
  number1: z.string().describe('Номер первого уровня'),
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации'),
  companyName: z.string().describe('Название компании'),
  legalCompanyName: z.string().describe('Юридическое название компании'),
  avatarUrl: z.string().describe('URL аватарки'),
  isVerified: z.boolean().describe('Статус верификации'),
  companyPhone: z.string().describe('Контактный телефон'),
  telegramUrl: z.string().describe('Telegram'),
  createdAt: z.string().datetime().describe('Дата создания'),
  income: z.number().describe('Общий доход'),
  ffDeliveries: z.number().describe('Количество поставок на ФФ'),
  productsCount: z.number().describe('Количество товара'),
  defectsCount: z.number().describe('Количество брака'),
  consumablesAmount: z.number().describe('Сумма расходников'),
  pvzReturnsCount: z.number().describe('Количество возвратов с ПВЗ'),
  wbDeliveries: z.number().describe('Количество поставок на ВБ'),
  productAmount: z.number().describe('Сумма продукта'),
})