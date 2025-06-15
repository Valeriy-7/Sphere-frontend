export type CreateDeliveryGroupDtoType = {
  /**
   * @description Название группы поставок
   * @type string | undefined
   */
  groupName?: string
  /**
   * @description Массив ID поставок для группировки
   * @type array
   */
  deliveryIds: string[]
}