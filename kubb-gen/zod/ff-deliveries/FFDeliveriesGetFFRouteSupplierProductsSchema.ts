import { FFDeliveryProductDtoSchema } from '../FFDeliveryProductDtoSchema';
import { z } from 'zod';

export const FFDeliveriesGetFFRouteSupplierProductsPathParamsSchema = z.object({
  routeId: z.string().uuid().describe('ID маршрута'),
  supplierId: z.string().uuid().describe('ID поставщика'),
});

/**
 * @description Список товаров поставщика по маршруту успешно получен
 */
export const FFDeliveriesGetFFRouteSupplierProducts200Schema = z.array(
  z.lazy(() => FFDeliveryProductDtoSchema),
);

/**
 * @description Неверный запрос (например, неверный формат UUID)
 */
export const FFDeliveriesGetFFRouteSupplierProducts400Schema = z.any();

/**
 * @description Не авторизован
 */
export const FFDeliveriesGetFFRouteSupplierProducts401Schema = z.any();

/**
 * @description Маршрут или поставщик не найден
 */
export const FFDeliveriesGetFFRouteSupplierProducts404Schema = z.any();

export const FFDeliveriesGetFFRouteSupplierProductsQueryResponseSchema = z.lazy(
  () => FFDeliveriesGetFFRouteSupplierProducts200Schema,
);
