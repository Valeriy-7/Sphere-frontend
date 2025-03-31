import { z } from 'zod'

export const createCabinetDtoSchema = z.object({
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации').nullable().nullish(),
  inn: z.string().describe('ИНН компании'),
  apiKey: z.string().describe('API ключ (обязателен для Wildberries)').optional(),
  isManualFilling: z.boolean().describe('Флаг ручного заполнения данных').optional(),
  companyName: z.string().describe('Название компании для отображения').optional(),
  legalCompanyName: z.string().describe('Юридическое название компании').optional(),
  ogrn: z.string().describe('ОГРН компании').optional(),
  legalAddress: z.string().describe('Юридический адрес').optional(),
  actualAddress: z.string().describe('Фактический адрес').optional(),
  managerFullName: z.string().describe('ФИО управляющего').optional(),
  companyPhone: z.string().describe('Телефон компании').optional(),
  companyEmail: z.string().describe('Email компании').optional(),
  partnerToken: z.string().describe('Токен партнера (из ссылки регистрации)').optional(),
})