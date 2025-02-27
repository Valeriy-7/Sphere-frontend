import { z } from 'zod';

export const consumableResponseExampleSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});
