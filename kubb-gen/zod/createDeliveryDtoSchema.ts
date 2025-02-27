import { deliveryProductDtoSchema } from './deliveryProductDtoSchema';
import { z } from 'zod';

export const createDeliveryDtoSchema = z.object({
  deliveryDate: z.string().datetime().describe('Дата поставки'),
  cargoPlaces: z.number().describe('Количество грузовых мест'),
  products: z.array(z.lazy(() => deliveryProductDtoSchema)).describe('Список товаров в поставке'),
});
