export const cabinetInfoDtoTypeEnum = {
  wildberries: 'wildberries',
  fulfillment: 'fulfillment',
} as const;

export type CabinetInfoDtoTypeEnumType =
  (typeof cabinetInfoDtoTypeEnum)[keyof typeof cabinetInfoDtoTypeEnum];

export type CabinetInfoDtoType = {
  /**
   * @description ID кабинета
   * @type string
   */
  id: string;
  /**
   * @description Название компании
   * @type string
   */
  companyName: string;
  /**
   * @description Тип организации
   * @type string
   */
  type: CabinetInfoDtoTypeEnumType;
  /**
   * @description URL аватарки кабинета
   * @type string | undefined
   */
  avatarUrl?: string;
};
