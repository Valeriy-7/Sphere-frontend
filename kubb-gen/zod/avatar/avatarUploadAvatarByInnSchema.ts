import { z } from 'zod'

export const avatarUploadAvatarByInnPathParamsSchema = z.object({
  inn: z.string(),
})

/**
 * @description Аватарка успешно загружена
 */
export const avatarUploadAvatarByInn200Schema = z.object({
  avatarUrl: z.string().optional(),
})

export const avatarUploadAvatarByInnMutationRequestSchema = z.object({
  file: z.instanceof(File).describe('Файл аватарки').optional(),
})

export const avatarUploadAvatarByInnMutationResponseSchema = z.lazy(() => avatarUploadAvatarByInn200Schema)