import { userSchema } from '../userSchema'
import { z } from 'zod'

/**
 * @description Настройки успешно получены
 */
export const usersGetUserSettings200Schema = z.lazy(() => userSchema)

export const usersGetUserSettingsQueryResponseSchema = z.lazy(() => usersGetUserSettings200Schema)