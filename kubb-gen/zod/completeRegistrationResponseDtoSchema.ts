import { cabinetSchema } from './cabinetSchema'
import { z } from 'zod'

export const completeRegistrationResponseDtoSchema = z.object({
  cabinet: z.lazy(() => cabinetSchema).describe('Данные кабинета'),
  token: z.string().describe('Токен для создания партнерского кабинета'),
})