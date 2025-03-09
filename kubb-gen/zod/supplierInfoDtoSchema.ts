import { z } from 'zod';

export const supplierInfoDtoSchema = z.object({
  id: z.string().uuid().describe('ID поставщика'),
  name: z.string().describe('Название поставщика'),
  address: z.string().describe('Адрес поставщика').optional(),
  contactPerson: z.string().describe('Контактное лицо').optional(),
  contactPhone: z.string().describe('Контактный телефон').optional(),
  location: z.string().describe('Местоположение').optional(),
  isTG: z.boolean().describe('Является ли поставщиком ТЯК').optional(),
});
