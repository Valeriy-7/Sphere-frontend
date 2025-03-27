export const enum LKType {
  admin = 'admin',
  wb = 'wb',
  ff = 'ff',
}
export const ServerToClientMapType = {
  wildberries: 'wb',
  fulfillment: 'ff',
  admin: 'admin',
};

export type LKTypeValue = keyof typeof LKType;
