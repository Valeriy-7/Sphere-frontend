import { z } from 'zod';

export const deliverySchema = z.object({
  id: z.string().describe('Уникальный идентификатор поставки'),
  cabinetId: z.string().describe('ID кабинета'),
  deliveryDate: z.date().describe('Дата поставки'),
  cargoPlaces: z.number().describe('Количество грузовых мест').optional(),
  cargoWidth: z.number().describe('Ширина груза (см)').optional(),
  cargoLength: z.number().describe('Длина груза (см)').optional(),
  cargoHeight: z.number().describe('Высота груза (см)').optional(),
  cargoVolume: z.number().describe('Объем груза (м³)').optional(),
  responsiblePerson: z.string().describe('Ответственный сотрудник').optional(),
  logisticsProviderId: z.string().describe('ID логиста').optional(),
  status: z
    .enum(['CREATED', 'IN_PROGRESS', 'ACCEPTED', 'PREPARATION', 'COMPLETED'])
    .describe('Статус поставки'),
  storeId: z.string().describe('ID магазина').optional(),
  storeName: z.string().describe('Название магазина').optional(),
  storeContactPerson: z.string().describe('Контактное лицо магазина').optional(),
  storeContactPhone: z.string().describe('Контактный телефон магазина').optional(),
  storeWorkingHours: z.string().describe('Время работы магазина').optional(),
  storeExternalId: z.string().describe('Идентификатор магазина в системе').optional(),
  totalProductsPrice: z.number().describe('Общая стоимость товаров'),
  logisticsToFFPrice: z.number().describe('Стоимость логистики до фулфилмента'),
  ffServicesPrice: z.number().describe('Стоимость услуг фулфилмента'),
  totalAmount: z.number().describe('Итоговая сумма'),
  createdAt: z.date().describe('Дата создания записи'),
  updatedAt: z.date().describe('Дата последнего обновления записи'),
});
