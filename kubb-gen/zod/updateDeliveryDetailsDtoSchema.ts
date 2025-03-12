import { z } from 'zod';

export const updateDeliveryDetailsDtoSchema = z.object({
  responsiblePerson: z.string().describe('ФИО ответственного сотрудника').optional(),
  logisticsProviderId: z.string().uuid().describe('ID логиста').optional(),
});
