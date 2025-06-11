import type { SupplierDetailDtoType } from './SupplierDetailDtoType'

export type RouteDtoType = {
  /**
   * @description Название рынка/места отправления
   * @type string
   */
  marketName: string
  /**
   * @description Адрес рынка/места отправления
   * @type string
   */
  marketAddress: string | null
  /**
   * @description Название ФФ (куда доставляют)
   * @type string
   */
  ffName: string | null
  /**
   * @description Адрес ФФ
   * @type string
   */
  ffAddress: string | null
  /**
   * @description Итоговое (суммарное) значение кол-ва товаров по данному маршруту
   * @type number
   */
  totalItems: number
  /**
   * @description Список поставщиков на этом маршруте
   * @type array
   */
  suppliers: SupplierDetailDtoType[]
}