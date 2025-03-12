import { z } from 'zod';
import { consumableDtoSchema, serviceDtoSchema, createDeliveryDtoSchema } from '@/kubb-gen';

const CheckboxItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number().min(0, 'Price must be non-negative'),
});

export const productDtoSchema = z.object({
  wbProductId: z.string().describe('ID товара в WB'),
  quantity: z.number().min(1).describe('Количество товара'),
  price: z.number().min(0.01).describe('Цена товара'),
  selectedServices: z.array(z.lazy(() => serviceDtoSchema)).describe('Выбранные услуги'),
  selectedConsumables: z.array(z.lazy(() => consumableDtoSchema)).describe('Выбранные расходники'),
  supplierId: z.string().describe('ID поставщика'),
});

/*const createDeliveryDtoSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
  deliveryDate: z.coerce.date({
    required_error: 'Date is required',
    invalid_type_error: "That's not a date!",
  }),
  cargoPlaces: z.number().describe('Количество грузовых мест').optional(),
  products: z.array(z.lazy(() => productDtoSchema)).describe('Товары в поставке'),
});*/
/*
export const FormSchema = z.object({
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: "That's not a date!",
  }),
  place: z.string().optional(),
  rows: z.array(NestedFieldSchema).min(1, 'Выберите поставку'),
});*/

/*export const createDeliveryDtoSchema = z.object({
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
    .min(1, 'Выберите продукт')
    .describe(
      'Массив товаров в поставке.\n    Должен содержать хотя бы один товар.\n    Каждый товар должен иметь:\n    - ID товара в WB\n    - Количество (больше нуля)\n    - Цену (больше нуля)\n    - Выбранные услуги (опционально)\n    - Выбранные расходники (опционально)\n    - ID поставщика',
    ),
});*/

export const FormSchema = createDeliveryDtoSchema;
export type FormValues = z.infer<typeof FormSchema>;
export type CheckboxItem = z.infer<typeof CheckboxItemSchema>;
