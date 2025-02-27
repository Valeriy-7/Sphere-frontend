import { logisticsSchema } from '../logisticsSchema';
import { z } from 'zod';

/**
 * @description Список логистики
 */
export const logisticsGetLogistics200Schema = z.array(z.lazy(() => logisticsSchema));

export const logisticsGetLogisticsQueryResponseSchema = z.lazy(
  () => logisticsGetLogistics200Schema,
);
