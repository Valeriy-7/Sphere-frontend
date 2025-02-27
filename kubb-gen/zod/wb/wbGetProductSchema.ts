import { productDetailsDtoSchema } from '../productDetailsDtoSchema';
import { z } from 'zod';

export const wbGetProductPathParamsSchema = z.object({
  id: z.string().describe('ID продукта'),
});

export const wbGetProductQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
});

/**
 * @description Информация о продукте успешно получена
 */
export const wbGetProduct200Schema = z.lazy(() => productDetailsDtoSchema);

export const wbGetProductQueryResponseSchema = z.lazy(() => wbGetProduct200Schema);
