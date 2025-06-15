/**
 * @description WB Storage data successfully retrieved
 */
export type WbStorageGetWbStorageData200Type = {
  /**
   * @type object | undefined
   */
  summary?: {
    /**
     * @type object | undefined
     */
    currentStock?: {
      /**
       * @type number | undefined
       */
      products?: number
      /**
       * @type number | undefined
       */
      items?: number
      /**
       * @type number | undefined
       */
      defects?: number
      /**
       * @type number | undefined
       */
      returnsFromPickup?: number
    }
    /**
     * @type object | undefined
     */
    consumables?: {
      /**
       * @type number | undefined
       */
      ff?: number
      /**
       * @type number | undefined
       */
      stores?: number
    }
    /**
     * @type object | undefined
     */
    received?: {
      /**
       * @type number | undefined
       */
      items?: number
      /**
       * @type number | undefined
       */
      defects?: number
      /**
       * @type number | undefined
       */
      consumables?: number
    }
    /**
     * @type object | undefined
     */
    shipped?: {
      /**
       * @type number | undefined
       */
      toWB?: number
      /**
       * @type number | undefined
       */
      otherMarketplaces?: number
      /**
       * @type number | undefined
       */
      defects?: number
    }
  }
  /**
   * @type array | undefined
   */
  stores?: {
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
    legalName?: string
    /**
     * @type string | undefined
     */
    address?: string
    /**
     * @type string
     */
    imageUrl?: string | null
    /**
     * @type object | undefined
     */
    totals?: {
      /**
       * @type number | undefined
       */
      products?: number
      /**
       * @type number | undefined
       */
      items?: number
      /**
       * @type number | undefined
       */
      defects?: number
      /**
       * @type number | undefined
       */
      consumables?: number
      /**
       * @type number | undefined
       */
      returnsFromPickup?: number
    }
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
  }[]
}

/**
 * @description Unauthorized
 */
export type WbStorageGetWbStorageData401Type = any

export type WbStorageGetWbStorageDataQueryResponseType = WbStorageGetWbStorageData200Type

export type WbStorageGetWbStorageDataTypeQuery = {
  Response: WbStorageGetWbStorageData200Type
  Errors: WbStorageGetWbStorageData401Type
}