import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetPublicImageQueryResponseType,
  AttachmentsGetPublicImagePathParamsType,
  AttachmentsGetPublicImage404Type,
} from '../../types/attachments/AttachmentsGetPublicImageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const attachmentsGetPublicImageQueryKey = (id: AttachmentsGetPublicImagePathParamsType['id']) =>
  [{ url: '/attachments/public/image/:id', params: { id: id } }] as const

export type AttachmentsGetPublicImageQueryKey = ReturnType<typeof attachmentsGetPublicImageQueryKey>

/**
 * @summary Публичный доступ к изображению по ID
 * {@link /attachments/public/image/:id}
 */
export async function attachmentsGetPublicImage(
  id: AttachmentsGetPublicImagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<AttachmentsGetPublicImageQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicImage404Type>, unknown>({
    method: 'GET',
    url: `/attachments/public/image/${id}`,
    ...requestConfig,
  })
  return res.data
}

export function attachmentsGetPublicImageQueryOptions(
  id: AttachmentsGetPublicImagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetPublicImageQueryKey(id)
  return queryOptions<
    AttachmentsGetPublicImageQueryResponseType,
    ResponseErrorConfig<AttachmentsGetPublicImage404Type>,
    AttachmentsGetPublicImageQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return attachmentsGetPublicImage(id, config)
    },
  })
}

/**
 * @summary Публичный доступ к изображению по ID
 * {@link /attachments/public/image/:id}
 */
export function useAttachmentsGetPublicImage<
  TData = AttachmentsGetPublicImageQueryResponseType,
  TQueryData = AttachmentsGetPublicImageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetPublicImageQueryKey,
>(
  id: AttachmentsGetPublicImagePathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<AttachmentsGetPublicImageQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicImage404Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetPublicImageQueryKey(id)

  const query = useQuery({
    ...(attachmentsGetPublicImageQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<AttachmentsGetPublicImage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}