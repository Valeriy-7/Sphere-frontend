import { z } from 'zod'

export const userTypeSchema = z.enum(['wildberries', 'fulfillment'])