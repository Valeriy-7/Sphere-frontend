import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetFileQueryResponseType,
  AttachmentsGetFilePathParamsType,
  AttachmentsGetFile404Type,
} from '../../types/attachments/AttachmentsGetFileType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const attachmentsGetFileSuspenseQueryKey = (id: AttachmentsGetFilePathParamsType['id']) =>
  [{ url: '/attachments/file/:id', params: { id: id } }] as const

export type AttachmentsGetFileSuspenseQueryKey = ReturnType<typeof attachmentsGetFileSuspenseQueryKey>

/**
 * @summary Получить файл по ID через авторизацию
 * {@link /attachments/file/:id}
 */
export async function attachmentsGetFileSuspense(id: AttachmentsGetFilePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetFileQueryResponseType, ResponseErrorConfig<AttachmentsGetFile404Type>, unknown>({
    method: 'GET',
    url: `/attachments/file/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetFileSuspenseQueryOptions(
  id: AttachmentsGetFilePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetFileSuspenseQueryKey(id)
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
      return attachmentsGetFileSuspense(id, config)
    },
  })
}

/**
 * @summary Получить файл по ID через авторизацию
 * {@link /attachments/file/:id}
 */
export function useAttachmentsGetFileSuspense<
  TData = AttachmentsGetFileQueryResponseType,
  TQueryData = AttachmentsGetFileQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetFileSuspenseQueryKey,
>(
  id: AttachmentsGetFilePathParamsType['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<AttachmentsGetFileQueryResponseType, ResponseErrorConfig<AttachmentsGetFile404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetFileSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(attachmentsGetFileSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<AttachmentsGetFile404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}