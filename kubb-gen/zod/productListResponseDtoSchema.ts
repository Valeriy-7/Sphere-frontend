import { productListItemDtoSchema } from './productListItemDtoSchema';
import { productStatsDtoSchema } from './productStatsDtoSchema';
import { z } from 'zod';

export const productListResponseDtoSchema = z.object({
  stats: z.lazy(() => productStatsDtoSchema).describe('Общая статистика'),
  items: z.array(z.lazy(() => productListItemDtoSchema)).describe('Список товаров'),
});
