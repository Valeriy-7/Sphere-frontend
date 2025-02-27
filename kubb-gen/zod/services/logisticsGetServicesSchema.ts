import { serviceSchema } from '../serviceSchema';
import { z } from 'zod';

/**
 * @description Список услуг
 */
export const logisticsGetServices200Schema = z.array(z.lazy(() => serviceSchema));

export const logisticsGetServicesQueryResponseSchema = z.lazy(() => logisticsGetServices200Schema);
