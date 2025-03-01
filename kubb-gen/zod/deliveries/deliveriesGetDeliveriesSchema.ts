import { z } from 'zod';

export const deliveriesGetDeliveriesQueryParamsSchema = z
  .object({
    startDate: z.string().describe('Дата начала периода').optional(),
    endDate: z.string().describe('Дата окончания периода').optional(),
  })
  .optional();

export const deliveriesGetDeliveries200Schema = z.any();

export const deliveriesGetDeliveriesQueryResponseSchema = z.lazy(
  () => deliveriesGetDeliveries200Schema,
);
