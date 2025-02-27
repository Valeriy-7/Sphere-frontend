export type CreateServiceDtoType = {
  /**
   * @description Название услуги
   * @type string
   */
  name: string;
  /**
   * @description Описание услуги
   * @type string
   */
  description: string;
  /**
   * @description Цена услуги
   * @type number
   */
  price: number;
  /**
   * @description Активна ли услуга
   * @type boolean | undefined
   */
  isActive?: boolean;
  /**
   * @description Изображение услуги
   * @type string | undefined, binary
   */
  image?: Blob;
};
