import { deliveryStatusSchema } from './deliveryStatusSchema';
import { supplierInfoDtoSchema } from './supplierInfoDtoSchema';
import { z } from 'zod';

export const FFDeliveryListItemDtoSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
  number: z.number().describe('Порядковый номер'),
  deliveryDate: z.string().describe('Дата поставки'),
  supplierName: z.string().describe('Название поставщика'),
  marketplaceName: z.string().describe('Название магазина/маркетплейса'),
  cargoPlaces: z.number().describe('Количество грузовых мест'),
  planQuantity: z.number().describe('Плановое количество товаров'),
  factQuantity: z.number().describe('Фактическое количество товаров'),
  defects: z.number().describe('Количество дефектов'),
  productsPrice: z.number().describe('Стоимость товаров'),
  ffServicesPrice: z.number().describe('Стоимость услуг ФФ'),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до ФФ'),
  status: z.lazy(() => deliveryStatusSchema).describe('Статус поставки'),
  supplierInfo: z.lazy(() => supplierInfoDtoSchema).describe('Информация о поставщике'),
});
