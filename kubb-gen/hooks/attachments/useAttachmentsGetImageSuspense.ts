import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetImageQueryResponseType,
  AttachmentsGetImagePathParamsType,
  AttachmentsGetImage404Type,
} from '../../types/attachments/AttachmentsGetImageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const attachmentsGetImageSuspenseQueryKey = (id: AttachmentsGetImagePathParamsType['id']) =>
  [{ url: '/attachments/image/:id', params: { id: id } }] as const

export type AttachmentsGetImageSuspenseQueryKey = ReturnType<typeof attachmentsGetImageSuspenseQueryKey>

/**
 * @summary Получить изображение по ID
 * {@link /attachments/image/:id}
 */
export async function attachmentsGetImageSuspense(
  id: AttachmentsGetImagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetImageQueryResponseType, ResponseErrorConfig<AttachmentsGetImage404Type>, unknown>({
    method: 'GET',
    url: `/attachments/image/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetImageSuspenseQueryOptions(
  id: AttachmentsGetImagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetImageSuspenseQueryKey(id)
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
      return attachmentsGetImageSuspense(id, config)
    },
  })
}

/**
 * @summary Получить изображение по ID
 * {@link /attachments/image/:id}
 */
export function useAttachmentsGetImageSuspense<
  TData = AttachmentsGetImageQueryResponseType,
  TQueryData = AttachmentsGetImageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetImageSuspenseQueryKey,
>(
  id: AttachmentsGetImagePathParamsType['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<AttachmentsGetImageQueryResponseType, ResponseErrorConfig<AttachmentsGetImage404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetImageSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(attachmentsGetImageSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<AttachmentsGetImage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}