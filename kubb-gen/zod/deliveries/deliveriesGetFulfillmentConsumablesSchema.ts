import { consumableResponseExampleSchema } from '../consumableResponseExampleSchema';
import { z } from 'zod';

/**
 * @description Список расходников успешно получен
 */
export const deliveriesGetFulfillmentConsumables200Schema = z.array(
  z.lazy(() => consumableResponseExampleSchema),
);

/**
 * @description Не авторизован
 */
export const deliveriesGetFulfillmentConsumables401Schema = z.any();

/**
 * @description Фулфилмент кабинет не найден
 */
export const deliveriesGetFulfillmentConsumables404Schema = z.any();

export const deliveriesGetFulfillmentConsumablesQueryResponseSchema = z.lazy(
  () => deliveriesGetFulfillmentConsumables200Schema,
);
