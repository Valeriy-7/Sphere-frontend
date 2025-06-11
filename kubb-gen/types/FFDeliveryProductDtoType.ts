export type FFDeliveryProductDtoType = {
  /**
   * @description ID продукта
   * @type string, uuid
   */
  id: string
  /**
   * @description Порядковый номер
   * @type number
   */
  number: number
  /**
   * @description Название продукта
   * @type string
   */
  name: string
  /**
   * @description Артикул товара
   * @type string
   */
  article: string
  /**
   * @description URL изображения продукта
   * @type string
   */
  imageUrl: string
  /**
   * @description Цвет товара
   * @type string
   */
  color?: string
  /**
   * @description Категория товара
   * @type string
   */
  category?: string
  /**
   * @description Бренд товара
   * @type string
   */
  brand?: string
  /**
   * @description Размер товара
   * @type string
   */
  size?: string
  /**
   * @description Числовой размер товара
   * @type string
   */
  numericSize?: string
  /**
   * @description Объем товара
   * @type number
   */
  volume?: number
  /**
   * @description Единица измерения объема
   * @type string
   */
  volumeUnit?: string
  /**
   * @description Доступные размеры товара
   * @type string[]
   */
  sizes?: string[]
  /**
   * @description Доступные цвета товара
   * @type string[]
   */
  colors?: string[]
  /**
   * @description Характеристики товара
   * @type Record<string, any>
   */
  characteristics?: Record<string, any>
  /**
   * @description Плановое количество
   * @type number
   */
  planQuantity: number
  /**
   * @description Фактическое количество (может быть null или \"-\" после создания поставки)
   * @type number
   */
  factQuantity: number | null
  /**
   * @description Количество дефектов (может быть null или \"-\" после создания поставки)
   * @type number
   */
  defects: number | null
  /**
   * @description Цена за единицу
   * @type number
   */
  price: number
  /**
   * @description Стоимость логистики за единицу
   * @type number
   */
  logisticsPrice: number
  /**
   * @description Стоимость расходников за единицу
   * @type number
   */
  consumablesPrice: number
  /**
   * @description ID поставщика
   * @type string, uuid
   */
  supplierId: string
  /**
   * @description Название поставщика
   * @type string
   */
  supplierName: string
  /**
   * @description Место на складе
   * @type string
   */
  warehousePlace?: string | null
  /**
   * @description Индивидуальные количества по размерам
   * @type DeliveryProductSizeDto[]
   */
  sizeQuantities?: DeliveryProductSizeDto[]
}

export type DeliveryProductSizeDto = {
  /**
   * @description Уникальный ID размера
   * @type string
   */
  id: string
  /**
   * @description Ключ размера
   * @type string
   */
  sizeKey: string
  /**
   * @description Отображаемое название размера
   * @type string
   */
  sizeDisplay: string
  /**
   * @description Размер WB
   * @type string
   */
  wbSize?: string
  /**
   * @description Технический размер
   * @type string
   */
  techSize?: string
  /**
   * @description Место хранения
   * @type string
   */
  storageLocation?: string
  /**
   * @description Фактическое количество
   * @type number
   */
  factQuantity: number
  /**
   * @description Количество брака
   * @type number
   */
  defects: number
}