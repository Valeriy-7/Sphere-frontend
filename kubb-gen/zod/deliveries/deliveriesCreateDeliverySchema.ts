import { createDeliveryDtoSchema } from '../createDeliveryDtoSchema';
import { deliveryResponseExampleSchema } from '../deliveryResponseExampleSchema';
import { z } from 'zod';

/**
 * @description Поставка успешно создана
 */
export const deliveriesCreateDelivery201Schema = z.lazy(() => deliveryResponseExampleSchema);

/**
 * @description Некорректные данные запроса
 */
export const deliveriesCreateDelivery400Schema = z.any();

/**
 * @description Не авторизован
 */
export const deliveriesCreateDelivery401Schema = z.any();

export const deliveriesCreateDeliveryMutationRequestSchema = z.lazy(() => createDeliveryDtoSchema);

export const deliveriesCreateDeliveryMutationResponseSchema = z.lazy(
  () => deliveriesCreateDelivery201Schema,
);
