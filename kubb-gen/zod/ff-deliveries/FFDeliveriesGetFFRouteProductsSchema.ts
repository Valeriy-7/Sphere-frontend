import { FFDeliveryProductDtoSchema } from '../FFDeliveryProductDtoSchema';
import { z } from 'zod';

export const FFDeliveriesGetFFRouteProductsPathParamsSchema = z.object({
  id: z.string().uuid().describe('ID маршрута'),
});

/**
 * @description Список товаров по маршруту успешно получен
 */
export const FFDeliveriesGetFFRouteProducts200Schema = z.array(
  z.lazy(() => FFDeliveryProductDtoSchema),
);

/**
 * @description Неверный запрос (например, неверный формат UUID)
 */
export const FFDeliveriesGetFFRouteProducts400Schema = z.any();

/**
 * @description Не авторизован
 */
export const FFDeliveriesGetFFRouteProducts401Schema = z.any();

/**
 * @description Маршрут не найден
 */
export const FFDeliveriesGetFFRouteProducts404Schema = z.any();

export const FFDeliveriesGetFFRouteProductsQueryResponseSchema = z.lazy(
  () => FFDeliveriesGetFFRouteProducts200Schema,
);
