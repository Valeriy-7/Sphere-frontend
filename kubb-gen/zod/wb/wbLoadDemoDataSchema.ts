import { z } from 'zod'

export const wbLoadDemoDataQueryParamsSchema = z.object({
  cabinetId: z.string().describe('ID кабинета'),
})

/**
 * @description Тестовые данные успешно загружены
 */
export const wbLoadDemoData200Schema = z.any()

export const wbLoadDemoDataQueryResponseSchema = z.lazy(() => wbLoadDemoData200Schema)