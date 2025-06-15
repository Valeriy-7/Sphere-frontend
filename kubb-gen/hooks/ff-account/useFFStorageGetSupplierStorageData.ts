import client from '@/modules/auth/axios-client'
import type {
  FFStorageGetSupplierStorageDataQueryResponseType,
  FFStorageGetSupplierStorageDataPathParamsType,
  FFStorageGetSupplierStorageData401Type,
  FFStorageGetSupplierStorageData404Type,
} from '../../types/ff-account/FFStorageGetSupplierStorageDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFStorageGetSupplierStorageDataQueryKey = (supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId']) =>
  [{ url: '/ff-account/storage/suppliers/:supplierId', params: { supplierId: supplierId } }] as const

export type FFStorageGetSupplierStorageDataQueryKey = ReturnType<typeof FFStorageGetSupplierStorageDataQueryKey>

/**
 * @description Returns detailed storage data for a specific supplier including all products and their sizes.
 * @summary Get storage data for a specific supplier
 * {@link /ff-account/storage/suppliers/:supplierId}
 */
export async function FFStorageGetSupplierStorageData(
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

export function FFStorageGetSupplierStorageDataQueryOptions(
  supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = FFStorageGetSupplierStorageDataQueryKey(supplierId)
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
      return FFStorageGetSupplierStorageData(supplierId, config)
    },
  })
}

/**
 * @description Returns detailed storage data for a specific supplier including all products and their sizes.
 * @summary Get storage data for a specific supplier
 * {@link /ff-account/storage/suppliers/:supplierId}
 */
export function useFFStorageGetSupplierStorageData<
  TData = FFStorageGetSupplierStorageDataQueryResponseType,
  TQueryData = FFStorageGetSupplierStorageDataQueryResponseType,
  TQueryKey extends QueryKey = FFStorageGetSupplierStorageDataQueryKey,
>(
  supplierId: FFStorageGetSupplierStorageDataPathParamsType['supplierId'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        FFStorageGetSupplierStorageDataQueryResponseType,
        ResponseErrorConfig<FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFStorageGetSupplierStorageDataQueryKey(supplierId)

  const query = useQuery({
    ...(FFStorageGetSupplierStorageDataQueryOptions(supplierId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FFStorageGetSupplierStorageData401Type | FFStorageGetSupplierStorageData404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}