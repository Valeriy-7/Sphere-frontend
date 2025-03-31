export type CabinetsAddPartnerPathParamsType = {
  /**
   * @type string
   */
  partnerId: string
}

/**
 * @description Партнер успешно добавлен
 */
export type CabinetsAddPartner200Type = {
  /**
   * @type boolean | undefined
   */
  success?: boolean
  /**
   * @type string | undefined
   */
  message?: string
}

/**
 * @description Ошибка при добавлении партнера
 */
export type CabinetsAddPartner400Type = any

/**
 * @description Кабинет или партнер не найден
 */
export type CabinetsAddPartner404Type = any

export type CabinetsAddPartnerMutationResponseType = CabinetsAddPartner200Type

export type CabinetsAddPartnerTypeMutation = {
  Response: CabinetsAddPartner200Type
  PathParams: CabinetsAddPartnerPathParamsType
  Errors: CabinetsAddPartner400Type | CabinetsAddPartner404Type
}