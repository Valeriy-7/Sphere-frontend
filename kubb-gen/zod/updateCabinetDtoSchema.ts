import { z } from 'zod';

export const updateCabinetDtoSchema = z.object({
  apiKey: z.string().describe('API ключ (только для Wildberries)').nullable().nullish(),
  inn: z.string().describe('ИНН организации').nullable().nullish(),
  ogrn: z.string().describe('ОГРН организации').nullable().nullish(),
  legalCompanyName: z.string().describe('Юридическое название организации').nullable().nullish(),
  legalAddress: z.string().describe('Юридический адрес').nullable().nullish(),
  companyName: z.string().describe('Название организации для отображения').nullable().nullish(),
  companyPhone: z.string().describe('Телефон организации').nullable().nullish(),
  companyEmail: z.string().describe('Email организации').nullable().nullish(),
  telegramUrl: z.string().describe('Ссылка на Telegram').nullable().nullish(),
  whatsappUrl: z.string().describe('Ссылка на WhatsApp').nullable().nullish(),
  actualAddress: z.string().describe('Фактический адрес').nullable().nullish(),
  managerFullName: z.string().describe('ФИО управляющего').nullable().nullish(),
  bankName: z.string().describe('Название банка').nullable().nullish(),
  bik: z.string().describe('БИК банка').nullable().nullish(),
  checkingAccount: z.string().describe('Расчетный счет').nullable().nullish(),
  correspondentAccount: z.string().describe('Корреспондентский счет').nullable().nullish(),
  registrationUrl: z.string().describe('Ссылка для регистрации контрагентов').nullable().nullish(),
  avatarUrl: z.string().describe('URL аватарки').nullable().nullish(),
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации').nullable().nullish(),
});
