import { z } from 'zod';

export const deliveriesGetFulfillmentConsumables200Schema = z.any();

export const deliveriesGetFulfillmentConsumablesQueryResponseSchema = z.lazy(
  () => deliveriesGetFulfillmentConsumables200Schema,
);
