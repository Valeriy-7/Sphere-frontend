import client from '@/modules/auth/axios-client'
import type {
  FFStorageGetSupplierStorageDataQueryResponseType,
  FFStorageGetSupplierStorageDataPathParamsType,
  FFStorageGetSupplierStorageData401Type,
  FFStorageGetSupplierStorageData404Type,
} from '../../types/ff-account/FFStorageGetSupplierStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFStorageGetSupplierStorageDataSuspenseQueryKey = (supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId']) =>
  [{ url: '/ff-account/storage/suppliers/:supplierId', params: { supplierId: supplierId } }] as const

export type FFStorageGetSupplierStorageDataSuspenseQueryKey = ReturnType<typeof FFStorageGetSupplierStorageDataSuspenseQueryKey>

/**
 * @description Returns detailed storage data for a specific supplier including all products and their sizes.
 * @summary Get storage data for a specific supplier
 * {@link /ff-account/storage/suppliers/:supplierId}
 */
export async function FFStorageGetSupplierStorageDataSuspense(
  supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFStorageGetSupplierStorageDataQueryResponseType,
    ResponseErrorConfig<FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type>,
    unknown
  >({ method: 'GET', url: `/ff-account/storage/suppliers/${supplierId}`, ...requestConfig })
  return res.data
}

export function FFStorageGetSupplierStorageDataSuspenseQueryOptions(
  supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFStorageGetSupplierStorageDataSuspenseQueryKey(supplierId)
  return queryOptions<
    FFStorageGetSupplierStorageDataQueryResponseType,
    ResponseErrorConfig<FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type>,
    FFStorageGetSupplierStorageDataQueryResponseType,
    typeof queryKey
  >({
    enabled: !!supplierId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFStorageGetSupplierStorageDataSuspense(supplierId, config)
    },
  })
}

/**
 * @description Returns detailed storage data for a specific supplier including all products and their sizes.
 * @summary Get storage data for a specific supplier
 * {@link /ff-account/storage/suppliers/:supplierId}
 */
export function useFFStorageGetSupplierStorageDataSuspense<
  TData = FFStorageGetSupplierStorageDataQueryResponseType,
  TQueryData = FFStorageGetSupplierStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetSupplierStorageDataSuspenseQueryKey,
>(
  supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        FFStorageGetSupplierStorageDataQueryResponseType,
        ResponseErrorConfig<FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type>,
        TData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetSupplierStorageDataSuspenseQueryKey(supplierId)

  const query = useSuspenseQuery({
    ...(FFStorageGetSupplierStorageDataSuspenseQueryOptions(supplierId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type>> & {
    queryKey: TQueryKey
  }

  query.queryKey = queryKey as TQueryKey

  return query
}