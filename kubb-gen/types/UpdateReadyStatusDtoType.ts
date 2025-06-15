export const updateReadyStatusDtoReadyStatusEnum = {
  new: 'new',
  ready: 'ready',
  in_work: 'in_work',
} as const

export type UpdateReadyStatusDtoReadyStatusEnumType = (typeof updateReadyStatusDtoReadyStatusEnum)[keyof typeof updateReadyStatusDtoReadyStatusEnum]

export type UpdateReadyStatusDtoType = {
  /**
   * @description Статус готовности для подготовки
   * @type string
   */
  readyStatus: UpdateReadyStatusDtoReadyStatusEnumType
}