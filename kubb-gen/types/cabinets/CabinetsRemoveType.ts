export type CabinetsRemovePathParamsType = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Кабинет успешно удален
 */
export type CabinetsRemove200Type = any;

/**
 * @description Кабинет не найден
 */
export type CabinetsRemove404Type = any;

export type CabinetsRemoveMutationResponseType = CabinetsRemove200Type;

export type CabinetsRemoveTypeMutation = {
  Response: CabinetsRemove200Type;
  PathParams: CabinetsRemovePathParamsType;
  Errors: CabinetsRemove404Type;
};
