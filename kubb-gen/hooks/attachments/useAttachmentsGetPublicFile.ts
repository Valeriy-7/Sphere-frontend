import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetPublicFileQueryResponseType,
  AttachmentsGetPublicFilePathParamsType,
  AttachmentsGetPublicFile404Type,
} from '../../types/attachments/AttachmentsGetPublicFileType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const attachmentsGetPublicFileQueryKey = (id: AttachmentsGetPublicFilePathParamsType['id']) =>
  [{ url: '/attachments/public/file/:id', params: { id: id } }] as const

export type AttachmentsGetPublicFileQueryKey = ReturnType<typeof attachmentsGetPublicFileQueryKey>

/**
 * @summary Публичный доступ к файлу по ID с проверкой API ключа
 * {@link /attachments/public/file/:id}
 */
export async function attachmentsGetPublicFile(
  id: AttachmentsGetPublicFilePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetPublicFileQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicFile404Type>, unknown>({
    method: 'GET',
    url: `/attachments/public/file/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetPublicFileQueryOptions(
  id: AttachmentsGetPublicFilePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetPublicFileQueryKey(id)
  return queryOptions<
    AttachmentsGetPublicFileQueryResponseType,
    ResponseErrorConfig<AttachmentsGetPublicFile404Type>,
    AttachmentsGetPublicFileQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return attachmentsGetPublicFile(id, config)
    },
  })
}

/**
 * @summary Публичный доступ к файлу по ID с проверкой API ключа
 * {@link /attachments/public/file/:id}
 */
export function useAttachmentsGetPublicFile<
  TData = AttachmentsGetPublicFileQueryResponseType,
  TQueryData = AttachmentsGetPublicFileQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetPublicFileQueryKey,
>(
  id: AttachmentsGetPublicFilePathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<AttachmentsGetPublicFileQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicFile404Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetPublicFileQueryKey(id)

  const query = useQuery({
    ...(attachmentsGetPublicFileQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<AttachmentsGetPublicFile404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}