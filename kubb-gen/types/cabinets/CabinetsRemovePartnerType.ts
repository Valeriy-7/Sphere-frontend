export type CabinetsRemovePartnerPathParamsType = {
  /**
   * @type string
   */
  partnerId: string;
};

/**
 * @description Партнер успешно удален
 */
export type CabinetsRemovePartner200Type = {
  /**
   * @type boolean | undefined
   */
  success?: boolean;
  /**
   * @type string | undefined
   */
  message?: string;
};

/**
 * @description Ошибка при удалении партнера
 */
export type CabinetsRemovePartner400Type = any;

/**
 * @description Кабинет или партнер не найден
 */
export type CabinetsRemovePartner404Type = any;

export type CabinetsRemovePartnerMutationResponseType = CabinetsRemovePartner200Type;

export type CabinetsRemovePartnerTypeMutation = {
  Response: CabinetsRemovePartner200Type;
  PathParams: CabinetsRemovePartnerPathParamsType;
  Errors: CabinetsRemovePartner400Type | CabinetsRemovePartner404Type;
};
