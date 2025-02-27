export const userTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const;

export type UserTypeEnumType = (typeof userTypeEnum)[keyof typeof userTypeEnum];

export type UserTypeType = UserTypeEnumType;
