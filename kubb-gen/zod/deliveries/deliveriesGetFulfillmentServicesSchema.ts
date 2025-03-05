import { serviceSchema } from '../serviceSchema';
import { z } from 'zod';

/**
 * @description Список услуг успешно получен
 */
export const deliveriesGetFulfillmentServices200Schema = z.array(z.lazy(() => serviceSchema));

/**
 * @description Не авторизован
 */
export const deliveriesGetFulfillmentServices401Schema = z.any();

export const deliveriesGetFulfillmentServicesQueryResponseSchema = z.lazy(
  () => deliveriesGetFulfillmentServices200Schema,
);
