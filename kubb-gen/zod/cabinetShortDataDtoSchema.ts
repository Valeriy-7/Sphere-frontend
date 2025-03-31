import { z } from 'zod'

export const cabinetShortDataDtoSchema = z.object({
  id: z.string().describe('Уникальный идентификатор кабинета'),
  type: z.string().describe('Тип кабинета (wildberries или fulfillment)'),
  isVerified: z.boolean().describe('Статус верификации кабинета'),
  companyName: z.string().describe('Название организации'),
  legalCompanyName: z.string().describe('Юридическое название организации').nullable().nullish(),
  avatarUrl: z.string().describe('URL аватарки кабинета').nullable(),
  isActive: z.boolean().describe('Признак активного кабинета'),
})