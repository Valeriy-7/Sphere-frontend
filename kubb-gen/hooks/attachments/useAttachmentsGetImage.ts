import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetImageQueryResponseType,
  AttachmentsGetImagePathParamsType,
  AttachmentsGetImage404Type,
} from '../../types/attachments/AttachmentsGetImageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const attachmentsGetImageQueryKey = (id: AttachmentsGetImagePathParamsType['id']) => [{ url: '/attachments/image/:id', params: { id: id } }] as const

export type AttachmentsGetImageQueryKey = ReturnType<typeof attachmentsGetImageQueryKey>

/**
 * @summary Получить изображение по ID
 * {@link /attachments/image/:id}
 */
export async function attachmentsGetImage(id: AttachmentsGetImagePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetImageQueryResponseType, ResponseErrorConfig<AttachmentsGetImage404Type>, unknown>({
    method: 'GET',
    url: `/attachments/image/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetImageQueryOptions(id: AttachmentsGetImagePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = attachmentsGetImageQueryKey(id)
  return queryOptions<
    AttachmentsGetImageQueryResponseType,
    ResponseErrorConfig<AttachmentsGetImage404Type>,
    AttachmentsGetImageQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return attachmentsGetImage(id, config)
    },
  })
}

/**
 * @summary Получить изображение по ID
 * {@link /attachments/image/:id}
 */
export function useAttachmentsGetImage<
  TData = AttachmentsGetImageQueryResponseType,
  TQueryData = AttachmentsGetImageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetImageQueryKey,
>(
  id: AttachmentsGetImagePathParamsType['id'],
  options: {
    query?: Partial<QueryObserverOptions<AttachmentsGetImageQueryResponseType, ResponseErrorConfig<AttachmentsGetImage404Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetImageQueryKey(id)

  const query = useQuery({
    ...(attachmentsGetImageQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<AttachmentsGetImage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}