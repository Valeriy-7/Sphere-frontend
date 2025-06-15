import type { UpdateProductStorageDataDtoType } from './UpdateProductStorageDataDtoType'

export type PreparationEventDtoType = {
  /**
   * @description Delivery ID being prepared
   * @type string, uuid
   */
  deliveryId: string
  /**
   * @description Product updates during preparation
   * @type array
   */
  products: UpdateProductStorageDataDtoType[]
  /**
   * @description Preparation notes
   * @type string | undefined
   */
  notes?: string
}