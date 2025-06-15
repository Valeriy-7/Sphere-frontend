import { z } from 'zod'

export const updateStorageLocationDtoSchema = z.object({
  storageLocation: z.string().describe('Storage location identifier'),
})