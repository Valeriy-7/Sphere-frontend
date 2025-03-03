export type ConsumableDtoType = {
  /**
   * @description ID расходника
   * @type string
   */
  id: string;
  /**
   * @description Название расходника
   * @type string
   */
  name: string;
  /**
   * @description Цена расходника
   * @minLength 0.01
   * @type number
   */
  price: number;
};
