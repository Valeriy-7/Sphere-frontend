import { z } from 'zod'

/**
 * @description List of linked WB cabinet IDs.
 */
export const FFAccountConfigGetLinkedWbCabinets200Schema = z.array(z.string())

export const FFAccountConfigGetLinkedWbCabinetsQueryResponseSchema = z.lazy(() => FFAccountConfigGetLinkedWbCabinets200Schema)