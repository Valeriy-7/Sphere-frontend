import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetPublicFileQueryResponseType,
  AttachmentsGetPublicFilePathParamsType,
  AttachmentsGetPublicFile404Type,
} from '../../types/attachments/AttachmentsGetPublicFileType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const attachmentsGetPublicFileSuspenseQueryKey = (id: AttachmentsGetPublicFilePathParamsType['id']) =>
  [{ url: '/attachments/public/file/:id', params: { id: id } }] as const

export type AttachmentsGetPublicFileSuspenseQueryKey = ReturnType<typeof attachmentsGetPublicFileSuspenseQueryKey>

/**
 * @summary Публичный доступ к файлу по ID с проверкой API ключа
 * {@link /attachments/public/file/:id}
 */
export async function attachmentsGetPublicFileSuspense(
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

export function attachmentsGetPublicFileSuspenseQueryOptions(
  id: AttachmentsGetPublicFilePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetPublicFileSuspenseQueryKey(id)
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
      return attachmentsGetPublicFileSuspense(id, config)
    },
  })
}

/**
 * @summary Публичный доступ к файлу по ID с проверкой API ключа
 * {@link /attachments/public/file/:id}
 */
export function useAttachmentsGetPublicFileSuspense<
  TData = AttachmentsGetPublicFileQueryResponseType,
  TQueryData = AttachmentsGetPublicFileQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetPublicFileSuspenseQueryKey,
>(
  id: AttachmentsGetPublicFilePathParamsType['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<AttachmentsGetPublicFileQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicFile404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetPublicFileSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(attachmentsGetPublicFileSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<AttachmentsGetPublicFile404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}