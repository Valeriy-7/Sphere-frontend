import { z } from 'zod';

/**
 * @description Информация успешно получена
 */
export const usersGetCurrentUser200Schema = z.object({
  id: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  regStatus: z.string().optional(),
  cabinets: z
    .array(
      z.object({
        id: z.string().optional(),
        type: z.string().optional(),
        isVerified: z.boolean().optional(),
        companyName: z.string().optional(),
        avatarUrl: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .optional(),
});

export const usersGetCurrentUserQueryResponseSchema = z.lazy(() => usersGetCurrentUser200Schema);
