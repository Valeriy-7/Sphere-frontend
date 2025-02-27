import type { ActivateCabinetDtoType } from '../ActivateCabinetDtoType';
import type { CabinetType } from '../CabinetType';

export type CabinetsSetActivePathParamsType = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Кабинет успешно активирован
 */
export type CabinetsSetActive200Type = CabinetType;

/**
 * @description Кабинет не найден
 */
export type CabinetsSetActive404Type = any;

export type CabinetsSetActiveMutationRequestType = ActivateCabinetDtoType;

export type CabinetsSetActiveMutationResponseType = CabinetsSetActive200Type;

export type CabinetsSetActiveTypeMutation = {
  Response: CabinetsSetActive200Type;
  Request: CabinetsSetActiveMutationRequestType;
  PathParams: CabinetsSetActivePathParamsType;
  Errors: CabinetsSetActive404Type;
};
