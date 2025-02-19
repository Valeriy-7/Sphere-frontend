import { updateProfileDtoSchema } from '../updateProfileDtoSchema'
import { userSchema } from '../userSchema'
import { z } from 'zod'

/**
 * @description Профиль успешно обновлен
 */
export const usersUpdateProfile200Schema = z.lazy(() => userSchema)

/**
 * @description Пользователь не найден
 */
export const usersUpdateProfile404Schema = z.any()

export const usersUpdateProfileMutationRequestSchema = z.lazy(() => updateProfileDtoSchema)

export const usersUpdateProfileMutationResponseSchema = z.lazy(() => usersUpdateProfile200Schema)