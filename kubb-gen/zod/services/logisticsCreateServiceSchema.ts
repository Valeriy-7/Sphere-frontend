import { createServiceDtoSchema } from '../createServiceDtoSchema';
import { serviceSchema } from '../serviceSchema';
import { z } from 'zod';

/**
 * @description Услуга успешно создана
 */
export const logisticsCreateService201Schema = z.lazy(() => serviceSchema);

export const logisticsCreateServiceMutationRequestSchema = z.lazy(() => createServiceDtoSchema);

export const logisticsCreateServiceMutationResponseSchema = z.lazy(
  () => logisticsCreateService201Schema,
);
