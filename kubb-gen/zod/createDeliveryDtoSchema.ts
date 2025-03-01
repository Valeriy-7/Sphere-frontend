import { productDtoSchema } from './productDtoSchema';
import { z } from 'zod';

export const createDeliveryDtoSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
  deliveryDate: z.string().describe('Дата поставки'),
  cargoPlaces: z.number().describe('Количество грузовых мест').optional(),
  products: z.array(z.lazy(() => productDtoSchema)).describe('Товары в поставке'),
});
