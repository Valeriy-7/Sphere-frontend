import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  DeliveriesGetSuppliersQueryResponseType,
  DeliveriesGetSuppliers401Type,
} from '../../types/deliveries/DeliveriesGetSuppliersType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveriesGetSuppliersSuspenseQueryKey = () =>
  [{ url: '/deliveries/suppliers' }] as const;

export type DeliveriesGetSuppliersSuspenseQueryKey = ReturnType<
  typeof deliveriesGetSuppliersSuspenseQueryKey
>;

/**
 * @description Возвращает список всех поставщиков текущего кабинета
 * @summary Получение списка поставщиков
 * {@link /deliveries/suppliers}
 */
export async function deliveriesGetSuppliersSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetSuppliersQueryResponseType,
    ResponseErrorConfig<DeliveriesGetSuppliers401Type>,
    unknown
  >({
    method: 'GET',
    url: `/deliveries/suppliers`,
    ...requestConfig,
  });
  return res.data;
}

export function deliveriesGetSuppliersSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetSuppliersSuspenseQueryKey();
  return queryOptions<
    DeliveriesGetSuppliersQueryResponseType,
    ResponseErrorConfig<DeliveriesGetSuppliers401Type>,
    DeliveriesGetSuppliersQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetSuppliersSuspense(config);
    },
  });
}

/**
 * @description Возвращает список всех поставщиков текущего кабинета
 * @summary Получение списка поставщиков
 * {@link /deliveries/suppliers}
 */
export function useDeliveriesGetSuppliersSuspense<
  TData = DeliveriesGetSuppliersQueryResponseType,
  TQueryData = DeliveriesGetSuppliersQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetSuppliersSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveriesGetSuppliersQueryResponseType,
        ResponseErrorConfig<DeliveriesGetSuppliers401Type>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetSuppliersSuspenseQueryKey();

  const query = useSuspenseQuery({
    ...(deliveriesGetSuppliersSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<DeliveriesGetSuppliers401Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
