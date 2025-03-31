import { cabinetSchema } from '../cabinetSchema'
import { z } from 'zod'

/**
 * @description Список кабинетов успешно получен
 */
export const cabinetsFindAll200Schema = z.array(z.lazy(() => cabinetSchema))

export const cabinetsFindAllQueryResponseSchema = z.lazy(() => cabinetsFindAll200Schema)