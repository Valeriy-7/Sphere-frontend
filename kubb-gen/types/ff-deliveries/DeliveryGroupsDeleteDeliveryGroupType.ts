export type DeliveryGroupsDeleteDeliveryGroupPathParamsType = {
  /**
   * @type string
   */
  groupId: string
}

/**
 * @description Группа успешно удалена
 */
export type DeliveryGroupsDeleteDeliveryGroup204Type = any

/**
 * @description Нельзя удалить отправленную группу
 */
export type DeliveryGroupsDeleteDeliveryGroup400Type = any

/**
 * @description Группа не найдена
 */
export type DeliveryGroupsDeleteDeliveryGroup404Type = any

export type DeliveryGroupsDeleteDeliveryGroupMutationResponseType = DeliveryGroupsDeleteDeliveryGroup204Type

export type DeliveryGroupsDeleteDeliveryGroupTypeMutation = {
  Response: DeliveryGroupsDeleteDeliveryGroup204Type
  PathParams: DeliveryGroupsDeleteDeliveryGroupPathParamsType
  Errors: DeliveryGroupsDeleteDeliveryGroup400Type | DeliveryGroupsDeleteDeliveryGroup404Type
}