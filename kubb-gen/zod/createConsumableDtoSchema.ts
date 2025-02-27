import { z } from 'zod';

export const createConsumableDtoSchema = z.object({
  name: z.string().describe('Название расходника'),
  description: z.string().describe('Описание расходника'),
  price: z.number().describe('Цена расходника'),
  quantity: z.number().describe('Количество в наличии'),
  number: z.number().describe('Порядковый номер (генерируется автоматически)').optional(),
  image: z.instanceof(File).describe('Изображение расходника'),
});
