/**
 * @description Storage data successfully retrieved
 */
export type FFStorageGetAllStorageData200Type = {
  /**
   * @type string | undefined
   */
  supplier?: string
  /**
   * @type array | undefined
   */
  sizeList?: {
    /**
     * @type string | undefined
     */
    id?: string
    /**
     * @type number | undefined
     */
    number?: number
    /**
     * @type string | undefined
     */
    key2?: string
    /**
     * @type string | undefined
     */
    key3?: string
    /**
     * @type string | undefined
     */
    key4?: string
    /**
     * @type number | undefined
     */
    key5?: number
    /**
     * @type string | undefined
     */
    key14?: string
    /**
     * @type number | undefined
     */
    factQuantity?: number
    /**
     * @type number | undefined
     */
    defects?: number
  }[]
  /**
   * @type array | undefined
   */
  productList?: {
    /**
     * @type string | undefined, uuid
     */
    id?: string
    /**
     * @type number | undefined
     */
    number?: number
    /**
     * @type string | undefined
     */
    key2?: string
    /**
     * @type string | undefined
     */
    key3?: string
    /**
     * @type string | undefined
     */
    key4?: string
    /**
     * @type number | undefined
     */
    key5?: number
    /**
     * @type string | undefined
     */
    key14?: string
    /**
     * @type array | undefined
     */
    sizeList?: {
      /**
       * @type string | undefined
       */
      id?: string
      /**
       * @type number | undefined
       */
      number?: number
      /**
       * @type string | undefined
       */
      key2?: string
      /**
       * @type string | undefined
       */
      key3?: string
      /**
       * @type string | undefined
       */
      key4?: string
      /**
       * @type number | undefined
       */
      key5?: number
      /**
       * @type string | undefined
       */
      key14?: string
      /**
       * @type number | undefined
       */
      factQuantity?: number
      /**
       * @type number | undefined
       */
      defects?: number
    }[]
  }[]
}[]

/**
 * @description Unauthorized
 */
export type FFStorageGetAllStorageData401Type = any

export type FFStorageGetAllStorageDataQueryResponseType = FFStorageGetAllStorageData200Type

export type FFStorageGetAllStorageDataTypeQuery = {
  Response: FFStorageGetAllStorageData200Type
  Errors: FFStorageGetAllStorageData401Type
}