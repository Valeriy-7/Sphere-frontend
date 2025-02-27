export type DeliveryResponseExampleType = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string, date-time
   */
  deliveryDate: string;
  /**
   * @type number
   */
  cargoPlaces: number;
  /**
   * @type number
   */
  totalProductsPrice: number;
  /**
   * @type number
   */
  logisticsToFFPrice: number;
  /**
   * @type number
   */
  ffServicesPrice: number;
  /**
   * @type number
   */
  totalAmount: number;
  /**
   * @type string
   */
  cabinetId: string;
  /**
   * @type array
   */
  products: string[];
};
