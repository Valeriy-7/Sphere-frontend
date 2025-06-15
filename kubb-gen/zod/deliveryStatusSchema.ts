import { z } from 'zod'

export const deliveryStatusSchema = z.enum(['CREATED', 'IN_PROGRESS', 'ACCEPTED', 'PREPARATION', 'TO_WORK', 'COMPLETED'])