import { z } from 'zod';

const CheckboxItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  price: z.number().min(0, 'Price must be non-negative'),
});

const NestedFieldSchema = z.object({
  id: z.string(),
  count: z.number().min(1),
  price: z.number().min(0, 'Price must be non-negative').optional(),
  checkboxList: z.array(CheckboxItemSchema),
  supplierList: z
    .array(CheckboxItemSchema)
    .min(1, 'Выберите поставщика')
    .max(1, 'Нужен один поставщик'),
});

export const FormSchema = z.object({
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: "That's not a date!",
  }),
  place: z.string().optional(),
  rows: z.array(NestedFieldSchema).min(1, 'Выберите поставку'),
});
export type FormValues = z.infer<typeof FormSchema>;
export type CheckboxItem = z.infer<typeof CheckboxItemSchema>;
