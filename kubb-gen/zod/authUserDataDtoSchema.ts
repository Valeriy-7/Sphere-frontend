import { cabinetShortDataDtoSchema } from './cabinetShortDataDtoSchema';
import { z } from 'zod';

export const authUserDataDtoSchema = z.object({
  id: z.string().describe('Уникальный идентификатор пользователя'),
  phone: z.string().describe('Номер телефона пользователя'),
  role: z.enum(['user', 'admin']).describe('Роль пользователя'),
  regStatus: z
    .enum(['incomplete', 'complete', 'verified'])
    .describe('Статус регистрации пользователя'),
  cabinets: z
    .array(z.lazy(() => cabinetShortDataDtoSchema))
    .describe('Список кабинетов пользователя'),
});
