import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { CabinetsCreateMutationRequestType, CabinetsCreateMutationResponseType, CabinetsCreate400Type } from '../../types/cabinets/CabinetsCreateType'
import { useMutation } from '@tanstack/react-query'

export const cabinetsCreateMutationKey = () => [{ url: '/cabinets' }] as const

export type CabinetsCreateMutationKey = ReturnType<typeof cabinetsCreateMutationKey>

/**
 * @description     Создает новый кабинет для пользователя с возможностью автоматического или ручного заполнения данных.    Процесс создания:    1. Для WB кабинетов:       - Проверка API ключа       - Автоматическое получение данных через API WB       - Автоматическая верификация    2. Для FF кабинетов:       - Ручное заполнение или автозаполнение через DaData       - Требуется верификация администратором    Особенности:    - При создании первого кабинета он автоматически становится активным    - Для WB кабинетов API ключ обязателен
 * @summary Создание нового кабинета
 * {@link /cabinets}
 */
export async function cabinetsCreate(
  data: CabinetsCreateMutationRequestType,
  config: Partial<RequestConfig<CabinetsCreateMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CabinetsCreateMutationResponseType, ResponseErrorConfig<CabinetsCreate400Type>, CabinetsCreateMutationRequestType>({
    method: 'POST',
    url: `/cabinets`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * @description     Создает новый кабинет для пользователя с возможностью автоматического или ручного заполнения данных.    Процесс создания:    1. Для WB кабинетов:       - Проверка API ключа       - Автоматическое получение данных через API WB       - Автоматическая верификация    2. Для FF кабинетов:       - Ручное заполнение или автозаполнение через DaData       - Требуется верификация администратором    Особенности:    - При создании первого кабинета он автоматически становится активным    - Для WB кабинетов API ключ обязателен
 * @summary Создание нового кабинета
 * {@link /cabinets}
 */
export function useCabinetsCreate(
  options: {
    mutation?: UseMutationOptions<CabinetsCreateMutationResponseType, ResponseErrorConfig<CabinetsCreate400Type>, { data: CabinetsCreateMutationRequestType }>
    client?: Partial<RequestConfig<CabinetsCreateMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? cabinetsCreateMutationKey()

  return useMutation<CabinetsCreateMutationResponseType, ResponseErrorConfig<CabinetsCreate400Type>, { data: CabinetsCreateMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return cabinetsCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}