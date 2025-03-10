import { consumableDtoSchema } from './consumableDtoSchema';
import { serviceDtoSchema } from './serviceDtoSchema';
import { z } from 'zod';

export const productDtoSchema = z.object({
  wbProductId: z.string().describe('ID товара в WB'),
  quantity: z.number().min(1).describe('Количество товара'),
  planQuantity: z.number().min(1).describe('Плановое количество товара').optional(),
  price: z.number().min(0.01).describe('Цена товара'),
  selectedServices: z.array(z.lazy(() => serviceDtoSchema)).describe('Выбранные услуги'),
  selectedConsumables: z.array(z.lazy(() => consumableDtoSchema)).describe('Выбранные расходники'),
  supplierId: z.string().describe('ID поставщика'),
});
