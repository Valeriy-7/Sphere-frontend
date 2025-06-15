export type FFStorageGetSupplierStorageDataPathParamsType = {
  /**
   * @description Supplier ID
   * @type string, uuid
   */
  supplierId: string
}

/**
 * @description Supplier storage data successfully retrieved
 */
export type FFStorageGetSupplierStorageData200Type = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  address?: string
  /**
   * @type string
   */
  imageUrl?: string | null
  /**
   * @type number | undefined
   */
  totalProducts?: number
  /**
   * @type number | undefined
   */
  totalItems?: number
  /**
   * @type number | undefined
   */
  totalDefects?: number
  /**
   * @type number | undefined
   */
  totalConsumables?: number
  /**
   * @type number | undefined
   */
  totalReturns?: number
  /**
   * @type array | undefined
   */
  products?: {
    /**
     * @type string | undefined, uuid
     */
    id?: string
    /**
     * @type string | undefined
     */
    name?: string
    /**
     * @type string | undefined
     */
    article?: string
    /**
     * @type string | undefined
     */
    storageLocation?: string
    /**
     * @type number | undefined
     */
    totalQuantity?: number
    /**
     * @type number | undefined
     */
    totalDefects?: number
    /**
     * @type array | undefined
     */
    sizes?: {
      /**
       * @type string | undefined, uuid
       */
      id?: string
      /**
       * @type string | undefined
       */
      sizeKey?: string
      /**
       * @type string | undefined
       */
      sizeDisplay?: string
      /**
       * @type string | undefined
       */
      wbSize?: string
      /**
       * @type string | undefined
       */
      techSize?: string
      /**
       * @type string | undefined
       */
      storageLocation?: string
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
}

/**
 * @description Unauthorized
 */
export type FFStorageGetSupplierStorageData401Type = any

/**
 * @description Supplier not found
 */
export type FFStorageGetSupplierStorageData404Type = any

export type FFStorageGetSupplierStorageDataQueryResponseType = FFStorageGetSupplierStorageData200Type

export type FFStorageGetSupplierStorageDataTypeQuery = {
  Response: FFStorageGetSupplierStorageData200Type
  PathParams: FFStorageGetSupplierStorageDataPathParamsType
  Errors: FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type
}