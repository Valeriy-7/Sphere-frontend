import type { CabinetType } from '../CabinetType';
import type { UpdateCabinetDtoType } from '../UpdateCabinetDtoType';

export type CabinetsUpdatePathParamsType = {
  /**
   * @type string
   */
  id: string;
};

/**
 * @description Настройки кабинета успешно обновлены
 */
export type CabinetsUpdate200Type = CabinetType;

/**
 * @description Кабинет не найден
 */
export type CabinetsUpdate404Type = any;

export type CabinetsUpdateMutationRequestType = UpdateCabinetDtoType;

export type CabinetsUpdateMutationResponseType = CabinetsUpdate200Type;

export type CabinetsUpdateTypeMutation = {
  Response: CabinetsUpdate200Type;
  Request: CabinetsUpdateMutationRequestType;
  PathParams: CabinetsUpdatePathParamsType;
  Errors: CabinetsUpdate404Type;
};
