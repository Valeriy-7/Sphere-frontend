import type { ManualQuantityAdjustmentDtoType } from './ManualQuantityAdjustmentDtoType'
import type { UpdateSizeQuantitiesDtoType } from './UpdateSizeQuantitiesDtoType'

export type UpdateProductStorageDataDtoType = {
  /**
   * @description Product storage location
   * @type string | undefined
   */
  storageLocation?: string
  /**
   * @description Manual quantity adjustment for product level
   */
  quantityAdjustment?: ManualQuantityAdjustmentDtoType
  /**
   * @description Size-level updates
   * @type array | undefined
   */
  sizes?: UpdateSizeQuantitiesDtoType[]
}