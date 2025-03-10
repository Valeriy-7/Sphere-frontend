import type { CabinetResponseDtoType } from '../CabinetResponseDtoType';

/**
 * @description Активный кабинет успешно получен
 */
export type CabinetsGetActive200Type = CabinetResponseDtoType;

/**
 * @description Активный кабинет не найден
 */
export type CabinetsGetActive404Type = any;

export type CabinetsGetActiveQueryResponseType = CabinetsGetActive200Type;

export type CabinetsGetActiveTypeQuery = {
  Response: CabinetsGetActive200Type;
  Errors: CabinetsGetActive404Type;
};
