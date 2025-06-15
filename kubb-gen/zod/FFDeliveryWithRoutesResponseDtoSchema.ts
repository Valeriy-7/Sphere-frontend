import { FFRouteInfoResponseDtoSchema } from './FFRouteInfoResponseDtoSchema'
import { z } from 'zod'

export const FFDeliveryWithRoutesResponseDtoSchema = z.object({
  id: z.string().describe('ID поставки'),
  number: z.number().describe('Номер поставки'),
  status: z.string().describe('Статус поставки'),
  deliveryDate: z.date().describe('Дата поставки'),
  acceptedAt: z.date().describe('Дата и время принятия поставки').optional(),
  cargoPlaces: z.number().describe('Количество грузовых мест'),
  cargoVolume: z.number().describe('Объем груза (м³)'),
  planQuantity: z.number().describe('Плановое количество товаров'),
  factQuantity: z.number().describe('Фактическое количество товаров').nullable(),
  defects: z.number().describe('Количество дефектов').nullable(),
  productsPrice: z.number().describe('Стоимость товаров'),
  ffServicesPrice: z.number().describe('Стоимость услуг фулфилмента'),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до фулфилмента'),
  totalPrice: z.number().describe('Общая сумма (товары + услуги + логистика)'),
  deliveryNumber: z.string().describe('Номер поставки для отображения (последние 5 символов ID)'),
  responsiblePerson: z.string().describe('Ответственный сотрудник').optional(),
  logisticsProviderId: z.string().describe('ID логиста').optional(),
  routes: z.array(z.lazy(() => FFRouteInfoResponseDtoSchema)).describe('Маршруты поставки'),
})