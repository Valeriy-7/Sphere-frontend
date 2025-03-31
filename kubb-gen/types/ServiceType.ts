export type ServiceType = {
  /**
   * @description ID услуги
   * @type string
   */
  id: string
  /**
   * @description Порядковый номер услуги
   * @type number
   */
  number: number
  /**
   * @description ID кабинета
   * @type string
   */
  cabinetId: string
  /**
   * @description Название услуги
   * @type string
   */
  name: string
  /**
   * @description Описание услуги
   * @type string
   */
  description: string
  /**
   * @description URL изображения услуги
   * @type string | undefined
   */
  imageUrl?: string
  /**
   * @description Цена услуги
   * @type number
   */
  price: number
  /**
   * @description Дата создания
   * @type string, date-time
   */
  createdAt: string
  /**
   * @description Дата обновления
   * @type string, date-time
   */
  updatedAt: string
}