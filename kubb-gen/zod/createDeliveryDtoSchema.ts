import { productDtoSchema } from './productDtoSchema';
import { z } from 'zod';

export const createDeliveryDtoSchema = z.object({
  cabinetId: z
    .string()
    .describe(
      'ID кабинета, для которого создается поставка.\n    Используется для привязки поставки к конкретному кабинету и проверки прав доступа.',
    ),
  deliveryDate: z
    .string()
    .describe(
      'Дата поставки.\n    Указывается в формате ISO 8601.\n    Используется для планирования и отслеживания поставок.',
    ),
  cargoPlaces: z
    .number()
    .describe(
      'Количество грузовых мест.\n    Необязательное поле.\n    Используется для планирования логистики.',
    )
    .optional(),
  products: z
    .array(z.lazy(() => productDtoSchema))
    .min(1)
    .describe(
      'Массив товаров в поставке.\n    Должен содержать хотя бы один товар.\n    Каждый товар должен иметь:\n    - ID товара в WB\n    - Количество (больше нуля)\n    - Цену (больше нуля)\n    - Выбранные услуги (опционально)\n    - Выбранные расходники (опционально)\n    - ID поставщика',
    ),
});
