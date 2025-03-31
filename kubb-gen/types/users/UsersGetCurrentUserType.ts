/**
 * @description Информация успешно получена
 */
export type UsersGetCurrentUser200Type = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type string | undefined
   */
  phone?: string
  /**
   * @type string | undefined
   */
  role?: string
  /**
   * @type string | undefined
   */
  regStatus?: string
  /**
   * @type array | undefined
   */
  cabinets?: {
    /**
     * @type string | undefined
     */
    id?: string
    /**
     * @type string | undefined
     */
    type?: string
    /**
     * @type boolean | undefined
     */
    isVerified?: boolean
    /**
     * @type string | undefined
     */
    companyName?: string
    /**
     * @type string | undefined
     */
    avatarUrl?: string
    /**
     * @type boolean | undefined
     */
    isActive?: boolean
  }[]
}

export type UsersGetCurrentUserQueryResponseType = UsersGetCurrentUser200Type

export type UsersGetCurrentUserTypeQuery = {
  Response: UsersGetCurrentUser200Type
  Errors: any
}