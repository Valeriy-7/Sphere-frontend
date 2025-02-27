import type { CabinetType } from '../CabinetType';

/**
 * @description Список кабинетов успешно получен
 */
export type CabinetsFindAll200Type = CabinetType[];

export type CabinetsFindAllQueryResponseType = CabinetsFindAll200Type;

export type CabinetsFindAllTypeQuery = {
  Response: CabinetsFindAll200Type;
  Errors: any;
};
