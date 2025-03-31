import type { DeliveryStatusType } from './DeliveryStatusType'

export type UpdateDeliveryStatusDtoType = {
  /**
   * @description Новый статус поставки
   */
  status: DeliveryStatusType
}