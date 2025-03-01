import { createDeliveryDtoSchema } from '../createDeliveryDtoSchema';
import { z } from 'zod';

export const deliveriesCreateDelivery201Schema = z.any();

export const deliveriesCreateDeliveryMutationRequestSchema = z.lazy(() => createDeliveryDtoSchema);

export const deliveriesCreateDeliveryMutationResponseSchema = z.lazy(
  () => deliveriesCreateDelivery201Schema,
);
