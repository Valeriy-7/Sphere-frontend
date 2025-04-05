import type { CabinetType } from './CabinetType'

export type CompleteRegistrationResponseDtoType = {
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