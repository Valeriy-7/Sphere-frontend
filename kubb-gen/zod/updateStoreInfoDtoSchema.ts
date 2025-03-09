import { z } from 'zod';

export const updateStoreInfoDtoSchema = z.object({
  storeId: z.string().uuid().describe('ID магазина').optional(),
  storeName: z.string().describe('Название магазина').optional(),
  storeContactPerson: z.string().describe('Контактное лицо магазина').optional(),
  storeContactPhone: z.string().describe('Контактный телефон магазина').optional(),
  storeWorkingHours: z.string().describe('Время работы магазина').optional(),
  storeExternalId: z.string().describe('Идентификатор магазина в системе').optional(),
});
