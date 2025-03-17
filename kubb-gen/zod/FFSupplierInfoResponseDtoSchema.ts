import { z } from 'zod';

export const FFSupplierInfoResponseDtoSchema = z.object({
  id: z.string().describe('ID поставщика'),
  name: z.string().describe('Название поставщика'),
  address: z.string().describe('Адрес поставщика').optional(),
  contactPerson: z.string().describe('Контактное лицо').optional(),
  contactPhone: z.string().describe('Контактный телефон').optional(),
  location: z.string().describe('Местоположение').optional(),
  isTG: z.boolean().describe('Является ли поставщик ТГ').optional(),
});
