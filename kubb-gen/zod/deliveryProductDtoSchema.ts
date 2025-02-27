import { selectedConsumableDtoSchema } from './selectedConsumableDtoSchema';
import { selectedServiceDtoSchema } from './selectedServiceDtoSchema';
import { z } from 'zod';

export const deliveryProductDtoSchema = z.object({
  wbProductId: z.string().describe('ID товара в Wildberries'),
  quantity: z.number().describe('Количество единиц товара'),
  price: z.number().describe('Цена за единицу товара'),
  selectedServices: z
    .array(z.lazy(() => selectedServiceDtoSchema))
    .describe('Выбранные услуги для товара'),
  selectedConsumables: z
    .array(z.lazy(() => selectedConsumableDtoSchema))
    .describe('Выбранные расходники для товара'),
  supplierId: z.string().describe('ID поставщика товара').optional(),
});
