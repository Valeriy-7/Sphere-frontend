export const deliveryPointDtoTypeEnum = {
  WILDBERRIES: 'WILDBERRIES',
  FULFILLMENT: 'FULFILLMENT',
  MARKETPLACE: 'MARKETPLACE',
} as const;

export type DeliveryPointDtoTypeEnumType =
  (typeof deliveryPointDtoTypeEnum)[keyof typeof deliveryPointDtoTypeEnum];

export type DeliveryPointDtoType = {
  /**
   * @description Название точки доставки
   * @type string
   */
  name: string;
  /**
   * @description Уникальный идентификатор точки
   * @type string
   */
  id: string;
  /**
   * @description Тип точки доставки
   * @type string
   */
  type: DeliveryPointDtoTypeEnumType;
};
