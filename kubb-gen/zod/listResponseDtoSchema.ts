import { listItemDtoSchema } from './listItemDtoSchema';
import { z } from 'zod';

export const listResponseDtoSchema = z.object({
  items: z.array(z.lazy(() => listItemDtoSchema)).describe('Элементы списка'),
  total: z.number().describe('Общее количество записей'),
  page: z.number().describe('Текущая страница'),
  pages: z.number().describe('Всего страниц'),
});
