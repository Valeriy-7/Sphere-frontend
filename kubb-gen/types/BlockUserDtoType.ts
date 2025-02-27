export type BlockUserDtoType = {
  /**
   * @description Статус блокировки пользователя
   * @type boolean
   */
  isBlocked: boolean;
  /**
   * @description Причина блокировки (обязательна при isBlocked=true)
   * @type string
   */
  reason: string;
  /**
   * @description Причина разблокировки (опционально при isBlocked=false)
   * @type string | undefined
   */
  unblockReason?: string;
};
