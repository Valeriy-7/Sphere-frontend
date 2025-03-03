export type ServiceDtoType = {
  /**
   * @description ID услуги
   * @type string
   */
  id: string;
  /**
   * @description Название услуги
   * @type string
   */
  name: string;
  /**
   * @description Цена услуги
   * @minLength 0.01
   * @type number
   */
  price: number;
};
