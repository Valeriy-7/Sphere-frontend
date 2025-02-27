import { z } from 'zod';

export const supplierResponseExampleSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactName: z.string(),
  phone: z.string(),
  marketplaceName: z.string(),
  address: z.string(),
  location: z.string(),
  telegram: z.string().optional(),
  cabinetId: z.string(),
});
