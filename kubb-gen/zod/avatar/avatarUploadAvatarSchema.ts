import { z } from 'zod'

export const avatarUploadAvatarPathParamsSchema = z.object({
  cabinetId: z.string(),
})

/**
 * @description Аватарка успешно загружена
 */
export const avatarUploadAvatar200Schema = z.object({
  avatarUrl: z.string().optional(),
})

export const avatarUploadAvatarMutationRequestSchema = z.object({
  file: z.instanceof(File).describe('Файл аватарки').optional(),
})

export const avatarUploadAvatarMutationResponseSchema = z.lazy(() => avatarUploadAvatar200Schema)