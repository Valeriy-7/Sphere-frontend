import type { PartnerCabinetDtoType } from './PartnerCabinetDtoType'

export type PartnersResponseDtoType = {
  /**
   * @description Список партнерских кабинетов
   * @type array
   */
  items: PartnerCabinetDtoType[]
  /**
   * @description Общее количество записей
   * @type number
   */
  total: number
  /**
   * @description Текущая страница
   * @type number
   */
  page: number
  /**
   * @description Количество записей на странице
   * @type number
   */
  limit: number
  /**
   * @description Общее количество страниц
   * @type number
   */
  pages: number
}