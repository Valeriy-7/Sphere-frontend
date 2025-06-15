import { z } from 'zod'

export const productSizeQuantityDtoSchema = z.object({
  sizeKey: z.string().describe('Ключ размера (например: "S (42)_0")'),
  sizeDisplay: z.string().describe('Отображаемое название размера (например: "S (42)")'),
  wbSize: z.string().describe('Размер WB (например: "S")').optional(),
  techSize: z.string().describe('Технический размер (например: "42")').optional(),
  factQuantity: z.number().min(0).describe('Фактическое количество для данного размера'),
  defects: z.number().min(0).describe('Количество брака для данного размера'),
})