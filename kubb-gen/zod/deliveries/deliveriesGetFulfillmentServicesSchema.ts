import { z } from 'zod';

export const deliveriesGetFulfillmentServices200Schema = z.any();

export const deliveriesGetFulfillmentServicesQueryResponseSchema = z.lazy(
  () => deliveriesGetFulfillmentServices200Schema,
);
