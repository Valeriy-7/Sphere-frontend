import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetFileQueryResponseType,
  AttachmentsGetFilePathParamsType,
  AttachmentsGetFile404Type,
} from '../../types/attachments/AttachmentsGetFileType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const attachmentsGetFileQueryKey = (id: AttachmentsGetFilePathParamsType['id']) => [{ url: '/attachments/file/:id', params: { id: id } }] as const

export type AttachmentsGetFileQueryKey = ReturnType<typeof attachmentsGetFileQueryKey>

/**
 * @summary Получить файл по ID через авторизацию
 * {@link /attachments/file/:id}
 */
export async function attachmentsGetFile(id: AttachmentsGetFilePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetFileQueryResponseType, ResponseErrorConfig<AttachmentsGetFile404Type>, unknown>({
    method: 'GET',
    url: `/attachments/file/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetFileQueryOptions(id: AttachmentsGetFilePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = attachmentsGetFileQueryKey(id)
  return queryOptions<
    AttachmentsGetFileQueryResponseType,
    ResponseErrorConfig<AttachmentsGetFile404Type>,
    AttachmentsGetFileQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return attachmentsGetFile(id, config)
    },
  })
}

/**
 * @summary Получить файл по ID через авторизацию
 * {@link /attachments/file/:id}
 */
export function useAttachmentsGetFile<
  TData = AttachmentsGetFileQueryResponseType,
  TQueryData = AttachmentsGetFileQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetFileQueryKey,
>(
  id: AttachmentsGetFilePathParamsType['id'],
  options: {
    query?: Partial<QueryObserverOptions<AttachmentsGetFileQueryResponseType, ResponseErrorConfig<AttachmentsGetFile404Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetFileQueryKey(id)

  const query = useQuery({
    ...(attachmentsGetFileQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<AttachmentsGetFile404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}