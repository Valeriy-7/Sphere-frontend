import { z } from 'zod';

export const cabinetInfoDtoSchema = z.object({
  id: z.string().describe('ID кабинета'),
  companyName: z.string().describe('Название компании'),
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации'),
  avatarUrl: z.string().describe('URL аватарки кабинета').optional(),
});
