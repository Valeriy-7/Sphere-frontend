export type UpdateDeliveryDetailsDtoType = {
  /**
   * @description ФИО ответственного сотрудника
   * @type string | undefined
   */
  responsiblePerson?: string;
  /**
   * @description ID логиста
   * @type string | undefined, uuid
   */
  logisticsProviderId?: string;
};
