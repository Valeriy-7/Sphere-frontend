import type { ProductDtoType } from './ProductDtoType'

export type SupplierDetailDtoType = {
  /**
   * @description ID поставщика
   * @type string, uuid
   */
  id: string
  /**
   * @description Название поставщика
   * @type string
   */
  name: string
  /**
   * @description Адрес поставщика
   * @type string
   */
  address: string | null
  /**
   * @description Контактное лицо
   * @type string
   */
  contactPerson: string | null
  /**
   * @description Контактный телефон
   * @type string
   */
  contactPhone: string
  /**
   * @description Место на рынке / Секция
   * @type string
   */
  marketPlace: string | null
  /**
   * @description Список продуктов поставщика
   * @type array
   */
  products: ProductDtoType[]
  /**
   * @description Кол-во типов товаров (уникальных артикулов)
   * @type number | undefined
   */
  totalItemTypes?: number
  /**
   * @description Кол-во товаров в единицах (сумма quantity)
   * @type number
   */
  totalItemUnits: number
}