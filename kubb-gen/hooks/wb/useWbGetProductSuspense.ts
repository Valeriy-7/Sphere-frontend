import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  WbGetProductQueryResponseType,
  WbGetProductPathParamsType,
  WbGetProductQueryParamsType,
} from '../../types/wb/WbGetProductType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const wbGetProductSuspenseQueryKey = (
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
) => [{ url: '/wb/products/:id', params: { id: id } }, ...(params ? [params] : [])] as const;

export type WbGetProductSuspenseQueryKey = ReturnType<typeof wbGetProductSuspenseQueryKey>;

/**
 * @description Возвращает детальную информацию о конкретном продукте
 * @summary Получить информацию о продукте
 * {@link /wb/products/:id}
 */
export async function wbGetProductSuspense(
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<WbGetProductQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/wb/products/${id}`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function wbGetProductSuspenseQueryOptions(
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = wbGetProductSuspenseQueryKey(id, params);
  return queryOptions<
    WbGetProductQueryResponseType,
    ResponseErrorConfig<Error>,
    WbGetProductQueryResponseType,
    typeof queryKey
  >({
    enabled: !!(id && params),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return wbGetProductSuspense(id, params, config);
    },
  });
}

/**
 * @description Возвращает детальную информацию о конкретном продукте
 * @summary Получить информацию о продукте
 * {@link /wb/products/:id}
 */
export function useWbGetProductSuspense<
  TData = WbGetProductQueryResponseType,
  TQueryData = WbGetProductQueryResponseType,
  TQueryKey extends QueryKey = WbGetProductSuspenseQueryKey,
>(
  id: WbGetProductPathParamsType['id'],
  params: WbGetProductQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        WbGetProductQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? wbGetProductSuspenseQueryKey(id, params);

  const query = useSuspenseQuery({
    ...(wbGetProductSuspenseQueryOptions(id, params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
