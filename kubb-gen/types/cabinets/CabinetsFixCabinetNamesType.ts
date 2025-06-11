export type CabinetsFixCabinetNamesPathParamsType = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Результат обновления
 */
export type CabinetsFixCabinetNames200Type = boolean

export type CabinetsFixCabinetNamesMutationResponseType = CabinetsFixCabinetNames200Type

export type CabinetsFixCabinetNamesTypeMutation = {
  Response: CabinetsFixCabinetNames200Type
  PathParams: CabinetsFixCabinetNamesPathParamsType
  Errors: any
}