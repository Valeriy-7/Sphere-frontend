import { consumableDtoSchema } from './consumableDtoSchema';
import { serviceDtoSchema } from './serviceDtoSchema';
import { z } from 'zod';

export const productDtoSchema = z.object({
  wbProductId: z.string().describe('ID товара в WB'),
  quantity: z.number().describe('Количество товара'),
  price: z.number().describe('Цена товара'),
  selectedServices: z.array(z.lazy(() => serviceDtoSchema)).describe('Выбранные услуги'),
  selectedConsumables: z.array(z.lazy(() => consumableDtoSchema)).describe('Выбранные расходники'),
  supplierId: z.string().describe('ID поставщика'),
});
