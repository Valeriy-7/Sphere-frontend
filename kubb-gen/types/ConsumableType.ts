export type ConsumableType = {
  /**
   * @description ID расходника
   * @type string
   */
  id: string
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
  /**
   * @description Порядковый номер
   * @type number
   */
  number: number
  /**
   * @description Название расходника
   * @type string
   */
  name: string
  /**
   * @description URL изображения
   * @type string
   */
  imageUrl: string
  /**
   * @description Цена за единицу
   * @type number
   */
  price: number
  /**
   * @description Описание расходника
   * @type string
   */
  description: string
}