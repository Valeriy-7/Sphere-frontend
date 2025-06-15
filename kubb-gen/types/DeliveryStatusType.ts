export const deliveryStatusEnum2 = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  ACCEPTED: 'ACCEPTED',
  PREPARATION: 'PREPARATION',
  TO_WORK: 'TO_WORK',
  COMPLETED: 'COMPLETED',
} as const

export type DeliveryStatusEnum2Type = (typeof deliveryStatusEnum2)[keyof typeof deliveryStatusEnum2]

export type DeliveryStatusType = DeliveryStatusEnum2Type