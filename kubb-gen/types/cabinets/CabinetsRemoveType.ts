export type CabinetsRemovePathParamsType = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Кабинет успешно удален
 */
export type CabinetsRemove204Type = any;

/**
 * @description Кабинет не найден
 */
export type CabinetsRemove404Type = any;

export type CabinetsRemoveMutationResponseType = CabinetsRemove204Type;

export type CabinetsRemoveTypeMutation = {
  Response: CabinetsRemove204Type;
  PathParams: CabinetsRemovePathParamsType;
  Errors: CabinetsRemove404Type;
};
