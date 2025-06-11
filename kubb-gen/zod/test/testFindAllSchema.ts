import { z } from 'zod'

export const testFindAll200Schema = z.any()

export const testFindAllQueryResponseSchema = z.lazy(() => testFindAll200Schema)