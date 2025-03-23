import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  WbLoadDemoDataQueryResponseType,
  WbLoadDemoDataQueryParamsType,
} from '../../types/wb/WbLoadDemoDataType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const wbLoadDemoDataQueryKey = (params: WbLoadDemoDataQueryParamsType) =>
  [{ url: '/wb/load-demo-data' }, ...(params ? [params] : [])] as const;

export type WbLoadDemoDataQueryKey = ReturnType<typeof wbLoadDemoDataQueryKey>;

/**
 * @description     Загружает тестовые данные о городах, складах и статистике для указанного кабинета.    ### Важно:    - Используется только для тестирования и демонстрации    - Заменяет реальные данные с API Wildberries
 * @summary Загрузка тестовых данных
 * {@link /wb/load-demo-data}
 */
export async function wbLoadDemoData(
  params: WbLoadDemoDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<WbLoadDemoDataQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/load-demo-data`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function wbLoadDemoDataQueryOptions(
  params: WbLoadDemoDataQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbLoadDemoDataQueryKey(params);
  return queryOptions<
    WbLoadDemoDataQueryResponseType,
    ResponseErrorConfig<Error>,
    WbLoadDemoDataQueryResponseType,
    typeof queryKey
  >({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return wbLoadDemoData(params, config);
    },
  });
}

/**
 * @description     Загружает тестовые данные о городах, складах и статистике для указанного кабинета.    ### Важно:    - Используется только для тестирования и демонстрации    - Заменяет реальные данные с API Wildberries
 * @summary Загрузка тестовых данных
 * {@link /wb/load-demo-data}
 */
export function useWbLoadDemoData<
  TData = WbLoadDemoDataQueryResponseType,
  TQueryData = WbLoadDemoDataQueryResponseType,
  TQueryKey extends QueryKey = WbLoadDemoDataQueryKey,
>(
  params: WbLoadDemoDataQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        WbLoadDemoDataQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? wbLoadDemoDataQueryKey(params);

  const query = useQuery({
    ...(wbLoadDemoDataQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
