import { z } from 'zod';

export const updateCargoDimensionsDtoSchema = z.object({
  cargoWidth: z.number().min(0).describe('Ширина груза (см)').optional(),
  cargoLength: z.number().min(0).describe('Длина груза (см)').optional(),
  cargoHeight: z.number().min(0).describe('Высота груза (см)').optional(),
  cargoPlaces: z.number().min(1).describe('Количество грузовых мест').optional(),
});
