export type CreateServiceDtoType = {
  /**
   * @description Название услуги
   * @type string
   */
  name: string
  /**
   * @description Цена за единицу
   * @type number
   */
  price: number
  /**
   * @description Описание услуги
   * @type string
   */
  description: string
  /**
   * @description Порядковый номер
   * @type number | undefined
   */
  number?: number
  /**
   * @description Изображение услуги
   * @type string, binary
   */
  image: Blob
}