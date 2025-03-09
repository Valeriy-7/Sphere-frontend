export type UpdateCargoDimensionsDtoType = {
  /**
   * @description Ширина груза (см)
   * @minLength 0
   * @type number | undefined
   */
  cargoWidth?: number;
  /**
   * @description Длина груза (см)
   * @minLength 0
   * @type number | undefined
   */
  cargoLength?: number;
  /**
   * @description Высота груза (см)
   * @minLength 0
   * @type number | undefined
   */
  cargoHeight?: number;
  /**
   * @description Количество грузовых мест
   * @minLength 1
   * @type number | undefined
   */
  cargoPlaces?: number;
};
