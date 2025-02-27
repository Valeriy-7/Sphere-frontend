export type CreateConsumableDtoType = {
  /**
   * @description Название расходника
   * @type string
   */
  name: string;
  /**
   * @description Описание расходника
   * @type string
   */
  description: string;
  /**
   * @description Цена расходника
   * @type number
   */
  price: number;
  /**
   * @description Количество в наличии
   * @type number
   */
  quantity: number;
  /**
   * @description Порядковый номер (генерируется автоматически)
   * @type number | undefined
   */
  number?: number;
  /**
   * @description Изображение расходника
   * @type string, binary
   */
  image: Blob;
};
