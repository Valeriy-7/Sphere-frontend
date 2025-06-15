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
   * @type string | undefined
   */
  color?: string
  /**
   * @description Категория товара
   * @type string | undefined
   */
  category?: string
  /**
   * @description Бренд товара
   * @type string | undefined
   */
  brand?: string
  /**
   * @description Размер товара
   * @type string | undefined
   */
  size?: string
  /**
   * @description Числовой размер товара
   * @type string | undefined
   */
  numericSize?: string
  /**
   * @description Объем товара
   * @type number | undefined
   */
  volume?: number
  /**
   * @description Единица измерения объема
   * @type string | undefined
   */
  volumeUnit?: string
  /**
   * @description Доступные размеры товара
   * @type array | undefined
   */
  sizes?: string[]
  /**
   * @description Доступные цвета товара
   * @type array | undefined
   */
  colors?: string[]
  /**
   * @description Характеристики товара
   * @type object | undefined
   */
  characteristics?: object
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
   * @type string | undefined
   */
  warehousePlace?: string
  /**
   * @description Индивидуальные количества по размерам
   * @type array | undefined
   */
  sizeQuantities?: {
    /**
     * @description ID размера
     * @type string
     */
    id: string
    /**
     * @description Ключ размера
     * @type string
     */
    sizeKey: string
    /**
     * @description Отображаемый размер
     * @type string
     */
    sizeDisplay: string
    /**
     * @description Размер WB
     * @type string | undefined
     */
    wbSize?: string
    /**
     * @description Технический размер
     * @type string | undefined
     */
    techSize?: string
    /**
     * @description Место хранения
     * @type string | undefined
     */
    storageLocation?: string
    /**
     * @description Фактическое количество
     * @type number
     */
    factQuantity: number
    /**
     * @description Количество дефектов
     * @type number
     */
    defects: number
  }[]
}