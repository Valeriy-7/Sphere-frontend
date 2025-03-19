import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  AvatarUploadAvatarMutationRequestType,
  AvatarUploadAvatarMutationResponseType,
  AvatarUploadAvatarPathParamsType,
} from '../../types/avatar/AvatarUploadAvatarType';
import { useMutation } from '@tanstack/react-query';

export const avatarUploadAvatarMutationKey = () => [{ url: '/avatar/{cabinetId}/upload' }] as const;

export type AvatarUploadAvatarMutationKey = ReturnType<typeof avatarUploadAvatarMutationKey>;

/**
 * @description     Загружает файл аватарки для кабинета.    ### Процесс загрузки:    1. Валидация файла (размер, формат)    2. Оптимизация изображения    3. Загрузка в хранилище    4. Обновление URL в базе данных    ### Требования:    - Максимальный размер: 5MB    - Форматы: JPG, PNG, WebP    - Минимальное разрешение: 200x200
 * @summary Загрузка аватарки
 * {@link /avatar/:cabinetId/upload}
 */
export async function avatarUploadAvatar(
  cabinetId: AvatarUploadAvatarPathParamsType['cabinetId'],
  data?: AvatarUploadAvatarMutationRequestType,
  config: Partial<RequestConfig<AvatarUploadAvatarMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];
      if (typeof key === 'string' && (typeof value === 'string' || value instanceof Blob)) {
        formData.append(key, value);
      }
    });
  }
  const res = await request<
    AvatarUploadAvatarMutationResponseType,
    ResponseErrorConfig<Error>,
    AvatarUploadAvatarMutationRequestType
  >({
    method: 'POST',
    url: `/avatar/${cabinetId}/upload`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  });
  return res.data;
}

/**
 * @description     Загружает файл аватарки для кабинета.    ### Процесс загрузки:    1. Валидация файла (размер, формат)    2. Оптимизация изображения    3. Загрузка в хранилище    4. Обновление URL в базе данных    ### Требования:    - Максимальный размер: 5MB    - Форматы: JPG, PNG, WebP    - Минимальное разрешение: 200x200
 * @summary Загрузка аватарки
 * {@link /avatar/:cabinetId/upload}
 */
export function useAvatarUploadAvatar<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AvatarUploadAvatarMutationResponseType,
      ResponseErrorConfig<Error>,
      {
        cabinetId: AvatarUploadAvatarPathParamsType['cabinetId'];
        data?: AvatarUploadAvatarMutationRequestType;
      },
      TContext
    >;
    client?: Partial<RequestConfig<AvatarUploadAvatarMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? avatarUploadAvatarMutationKey();

  return useMutation<
    AvatarUploadAvatarMutationResponseType,
    ResponseErrorConfig<Error>,
    {
      cabinetId: AvatarUploadAvatarPathParamsType['cabinetId'];
      data?: AvatarUploadAvatarMutationRequestType;
    },
    TContext
  >({
    mutationFn: async ({ cabinetId, data }) => {
      return avatarUploadAvatar(cabinetId, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
