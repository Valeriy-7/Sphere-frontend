import client from '@/modules/auth/axios-client'
import type {
  AttachmentsGetPublicImageQueryResponseType,
  AttachmentsGetPublicImagePathParamsType,
  AttachmentsGetPublicImage404Type,
} from '../../types/attachments/AttachmentsGetPublicImageType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const attachmentsGetPublicImageSuspenseQueryKey = (id: AttachmentsGetPublicImagePathParamsType['id']) =>
  [{ url: '/attachments/public/image/:id', params: { id: id } }] as const

export type AttachmentsGetPublicImageSuspenseQueryKey = ReturnType<typeof attachmentsGetPublicImageSuspenseQueryKey>

/**
 * @summary Публичный доступ к изображению по ID
 * {@link /attachments/public/image/:id}
 */
export async function attachmentsGetPublicImageSuspense(
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

export function attachmentsGetPublicImageSuspenseQueryOptions(
  id: AttachmentsGetPublicImagePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = attachmentsGetPublicImageSuspenseQueryKey(id)
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
      return attachmentsGetPublicImageSuspense(id, config)
    },
  })
}

/**
 * @summary Публичный доступ к изображению по ID
 * {@link /attachments/public/image/:id}
 */
export function useAttachmentsGetPublicImageSuspense<
  TData = AttachmentsGetPublicImageQueryResponseType,
  TQueryData = AttachmentsGetPublicImageQueryResponseType,
  TQueryKey extends QueryKey = AttachmentsGetPublicImageSuspenseQueryKey,
>(
  id: AttachmentsGetPublicImagePathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<AttachmentsGetPublicImageQueryResponseType, ResponseErrorConfig<AttachmentsGetPublicImage404Type>, TData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? attachmentsGetPublicImageSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(attachmentsGetPublicImageSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<AttachmentsGetPublicImage404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}