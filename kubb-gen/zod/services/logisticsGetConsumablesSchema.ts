import { consumableSchema } from '../consumableSchema';
import { z } from 'zod';

/**
 * @description Список расходников
 */
export const logisticsGetConsumables200Schema = z.array(z.lazy(() => consumableSchema));

export const logisticsGetConsumablesQueryResponseSchema = z.lazy(
  () => logisticsGetConsumables200Schema,
);
