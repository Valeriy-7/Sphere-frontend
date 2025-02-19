import { partnerCabinetDtoSchema } from './partnerCabinetDtoSchema'
import { z } from 'zod'

export const partnersResponseDtoSchema = z.object({
  items: z.array(z.lazy(() => partnerCabinetDtoSchema)).describe('Список партнерских кабинетов'),
  total: z.number().describe('Общее количество записей'),
  page: z.number().describe('Текущая страница'),
  limit: z.number().describe('Количество записей на странице'),
  pages: z.number().describe('Общее количество страниц'),
})