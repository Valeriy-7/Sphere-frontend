import { z } from 'zod';

export const deliveryResponseExampleSchema = z.object({
  id: z.string(),
  deliveryDate: z.string().datetime(),
  cargoPlaces: z.number(),
  totalProductsPrice: z.number(),
  logisticsToFFPrice: z.number(),
  ffServicesPrice: z.number(),
  totalAmount: z.number(),
  cabinetId: z.string(),
  products: z.array(z.string()),
});
