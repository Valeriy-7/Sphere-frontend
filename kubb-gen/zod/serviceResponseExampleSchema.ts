import { z } from 'zod';

export const serviceResponseExampleSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
});
