import type { ProductDtoType } from './ProductDtoType';

export type CreateDeliveryDtoType = {
  /**
   * @description ID кабинета, для которого создается поставка.\n    Используется для привязки поставки к конкретному кабинету и проверки прав доступа.
   * @type string
   */
  cabinetId: string;
  /**
   * @description Дата поставки.\n    Указывается в формате ISO 8601.\n    Используется для планирования и отслеживания поставок.
   * @type string
   */
  deliveryDate: string;
  /**
   * @description Количество грузовых мест.\n    Необязательное поле.\n    Используется для планирования логистики.
   * @type number | undefined
   */
  cargoPlaces?: number;
  /**
   * @description Массив товаров в поставке.\n    Должен содержать хотя бы один товар.\n    Каждый товар должен иметь:\n    - ID товара в WB\n    - Количество (больше нуля)\n    - Цену (больше нуля)\n    - Выбранные услуги (опционально)\n    - Выбранные расходники (опционально)\n    - ID поставщика
   * @type array
   */
  products: ProductDtoType[];
};
