import type { CabinetType } from './CabinetType'

export type CabinetResponseDtoType = {
  /**
   * @description Данные кабинета
   */
  cabinet: CabinetType
  /**
   * @description Токен для создания партнерского кабинета
   * @type string
   */
  token: string
}