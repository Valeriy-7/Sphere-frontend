import { z } from 'zod';

export const assignLogisticsProviderDtoSchema = z.object({
  logisticsProviderId: z.string().uuid().describe('ID логиста'),
});
