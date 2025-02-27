import { serviceResponseExampleSchema } from '../serviceResponseExampleSchema';
import { z } from 'zod';

/**
 * @description Список услуг успешно получен
 */
export const deliveriesGetFulfillmentServices200Schema = z.array(
  z.lazy(() => serviceResponseExampleSchema),
);

/**
 * @description Не авторизован
 */
export const deliveriesGetFulfillmentServices401Schema = z.any();

/**
 * @description Фулфилмент кабинет не найден
 */
export const deliveriesGetFulfillmentServices404Schema = z.any();

export const deliveriesGetFulfillmentServicesQueryResponseSchema = z.lazy(
  () => deliveriesGetFulfillmentServices200Schema,
);
