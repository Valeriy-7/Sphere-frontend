import { routeDtoSchema } from './routeDtoSchema'
import { z } from 'zod'

export const FFDeliveryDetailWithRoutesDtoSchema = z.object({
  id: z.string().uuid().describe('ID поставки'),
  deliveryNumber: z.string().describe('Номер поставки (уникальный от ВБ)'),
  storeManagerName: z.string().describe('Имя управляющего магазином').optional(),
  deliveryDate: z.date().describe('Дата поставки'),
  status: z.enum(['new', 'reception', 'accepted', 'preparation', 'to_work', 'completed']),
  cabinet: z.object({}).describe('Информация о кабинете'),
  responsiblePersons: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().optional(),
      }),
    )
    .describe('Ответственные сотрудники')
    .nullable(),
  logisticsProvider: z.object({}).describe('Тип логистики').nullable(),
  routes: z.array(z.lazy(() => routeDtoSchema)).describe('Маршруты поставки'),
  totalProductsCount: z.number().describe('Общее количество товаров').optional(),
  cargoPlaces: z.number().describe('Количество грузовых мест').optional(),
  totalVolume: z.number().describe('Общий объем').optional(),
  acceptedAt: z.date().describe('Дата и время завершения приемки (перевода в статус "Принято")').nullable().nullish(),
})