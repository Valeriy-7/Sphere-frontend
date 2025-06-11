import client from '@/modules/auth/axios-client'
import type { WbLoadDemoDataQueryResponseType, WbLoadDemoDataQueryParamsType } from '../../types/wb/WbLoadDemoDataType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const wbLoadDemoDataSuspenseQueryKey = (params: WbLoadDemoDataQueryParamsType) => [{ url: '/wb/load-demo-data' }, ...(params ? [params] : [])] as const

export type WbLoadDemoDataSuspenseQueryKey = ReturnType<typeof wbLoadDemoDataSuspenseQueryKey>

/**
 * @description     Загружает тестовые данные о городах, складах и статистике для указанного кабинета.    ### Важно:    - Используется только для тестирования и демонстрации    - Заменяет реальные данные с API Wildberries
 * @summary Загрузка тестовых данных
 * {@link /wb/load-demo-data}
 */
export async function wbLoadDemoDataSuspense(params: WbLoadDemoDataQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<WbLoadDemoDataQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/load-demo-data`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function wbLoadDemoDataSuspenseQueryOptions(params: WbLoadDemoDataQueryParamsType, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = wbLoadDemoDataSuspenseQueryKey(params)
  return queryOptions<WbLoadDemoDataQueryResponseType, ResponseErrorConfig<Error>, WbLoadDemoDataQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return wbLoadDemoDataSuspense(params, config)
    },
  })
}

/**
 * @description     Загружает тестовые данные о городах, складах и статистике для указанного кабинета.    ### Важно:    - Используется только для тестирования и демонстрации    - Заменяет реальные данные с API Wildberries
 * @summary Загрузка тестовых данных
 * {@link /wb/load-demo-data}
 */
export function useWbLoadDemoDataSuspense<
  TData = WbLoadDemoDataQueryResponseType,
  TQueryData = WbLoadDemoDataQueryResponseType,
  TQueryKey extends QueryKey = WbLoadDemoDataSuspenseQueryKey,
>(
  params: WbLoadDemoDataQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<WbLoadDemoDataQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? wbLoadDemoDataSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(wbLoadDemoDataSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}