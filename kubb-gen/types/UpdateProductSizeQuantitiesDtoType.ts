import type { ProductSizeQuantityDtoType } from './ProductSizeQuantityDtoType'

export type UpdateProductSizeQuantitiesDtoType = {
  /**
   * @description Массив количеств по размерам
   * @type array
   */
  sizes: ProductSizeQuantityDtoType[]
}