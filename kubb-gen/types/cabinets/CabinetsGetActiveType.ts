import type { CabinetType } from '../CabinetType';

/**
 * @description Активный кабинет успешно получен
 */
export type CabinetsGetActive200Type = CabinetType;

/**
 * @description Активный кабинет не найден
 */
export type CabinetsGetActive404Type = any;

export type CabinetsGetActiveQueryResponseType = CabinetsGetActive200Type;

export type CabinetsGetActiveTypeQuery = {
  Response: CabinetsGetActive200Type;
  Errors: CabinetsGetActive404Type;
};
