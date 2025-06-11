import { createTestDtoSchema } from '../createTestDtoSchema'
import { z } from 'zod'

export const testCreate201Schema = z.any()

export const testCreateMutationRequestSchema = z.lazy(() => createTestDtoSchema)

export const testCreateMutationResponseSchema = z.lazy(() => testCreate201Schema)