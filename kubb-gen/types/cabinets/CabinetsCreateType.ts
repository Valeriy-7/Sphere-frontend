import type { CabinetType } from '../CabinetType'
import type { CreateCabinetDtoType } from '../CreateCabinetDtoType'

/**
 * @description Кабинет успешно создан
 */
export type CabinetsCreate201Type = CabinetType

/**
 * @description Ошибка валидации
 */
export type CabinetsCreate400Type = any

export type CabinetsCreateMutationRequestType = CreateCabinetDtoType

export type CabinetsCreateMutationResponseType = CabinetsCreate201Type

export type CabinetsCreateTypeMutation = {
  Response: CabinetsCreate201Type
  Request: CabinetsCreateMutationRequestType
  Errors: CabinetsCreate400Type
}