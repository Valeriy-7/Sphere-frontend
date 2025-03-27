import { FFDeliveryProductDtoSchema } from '../FFDeliveryProductDtoSchema';
import { z } from 'zod';

export const FFDeliveriesGetFFRouteSupplierProductsPathParamsSchema = z.object({
  routeId: z.string().uuid().describe('ID маршрута'),
  supplierId: z.string().uuid().describe('ID поставщика'),
});

/**
 * @description Список товаров по маршруту и поставщику успешно получен
 */
export const FFDeliveriesGetFFRouteSupplierProducts200Schema = z.array(
  z.lazy(() => FFDeliveryProductDtoSchema),
);

/**
 * @description Не авторизован
 */
export const FFDeliveriesGetFFRouteSupplierProducts401Schema = z.any();

/**
 * @description Товары не найдены
 */
export const FFDeliveriesGetFFRouteSupplierProducts404Schema = z.any();

export const FFDeliveriesGetFFRouteSupplierProductsQueryResponseSchema = z.lazy(
  () => FFDeliveriesGetFFRouteSupplierProducts200Schema,
);
