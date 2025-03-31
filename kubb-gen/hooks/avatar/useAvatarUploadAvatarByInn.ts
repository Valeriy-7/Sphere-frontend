import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  AvatarUploadAvatarByInnMutationRequestType,
  AvatarUploadAvatarByInnMutationResponseType,
  AvatarUploadAvatarByInnPathParamsType,
} from '../../types/avatar/AvatarUploadAvatarByInnType'
import { useMutation } from '@tanstack/react-query'

export const avatarUploadAvatarByInnMutationKey = () => [{ url: '/avatar/{inn}/upload' }] as const

export type AvatarUploadAvatarByInnMutationKey = ReturnType<typeof avatarUploadAvatarByInnMutationKey>

/**
 * @description     Загружает файл аватарки для кабинета по ИНН компании.    ### Процесс загрузки:    1. Поиск кабинета по ИНН    2. Валидация файла (размер, формат)    3. Оптимизация изображения    4. Загрузка в хранилище    5. Обновление URL в базе данных    ### Требования:    - Максимальный размер: 5MB    - Форматы: JPG, PNG, WebP    - Минимальное разрешение: 200x200    - Максимальное разрешение: 1200x1200
 * @summary Загрузка аватарки по ИНН
 * {@link /avatar/:inn/upload}
 */
export async function avatarUploadAvatarByInn(
  inn: AvatarUploadAvatarByInnPathParamsType['inn'],
  data?: AvatarUploadAvatarByInnMutationRequestType,
  config: Partial<RequestConfig<AvatarUploadAvatarByInnMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || value instanceof Blob)) {
        formData.append(key, value)
      }
    })
  }
  const res = await request<AvatarUploadAvatarByInnMutationResponseType, ResponseErrorConfig<Error>, AvatarUploadAvatarByInnMutationRequestType>({
    method: 'POST',
    url: `/avatar/${inn}/upload`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res.data
}

/**
 * @description     Загружает файл аватарки для кабинета по ИНН компании.    ### Процесс загрузки:    1. Поиск кабинета по ИНН    2. Валидация файла (размер, формат)    3. Оптимизация изображения    4. Загрузка в хранилище    5. Обновление URL в базе данных    ### Требования:    - Максимальный размер: 5MB    - Форматы: JPG, PNG, WebP    - Минимальное разрешение: 200x200    - Максимальное разрешение: 1200x1200
 * @summary Загрузка аватарки по ИНН
 * {@link /avatar/:inn/upload}
 */
export function useAvatarUploadAvatarByInn<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AvatarUploadAvatarByInnMutationResponseType,
      ResponseErrorConfig<Error>,
      { inn: AvatarUploadAvatarByInnPathParamsType['inn']; data?: AvatarUploadAvatarByInnMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<AvatarUploadAvatarByInnMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? avatarUploadAvatarByInnMutationKey()

  return useMutation<
    AvatarUploadAvatarByInnMutationResponseType,
    ResponseErrorConfig<Error>,
    { inn: AvatarUploadAvatarByInnPathParamsType['inn']; data?: AvatarUploadAvatarByInnMutationRequestType },
    TContext
  >({
    mutationFn: async ({ inn, data }) => {
      return avatarUploadAvatarByInn(inn, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}