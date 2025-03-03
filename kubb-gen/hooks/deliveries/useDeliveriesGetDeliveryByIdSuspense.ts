import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  DeliveriesGetDeliveryByIdQueryResponseType,
  DeliveriesGetDeliveryByIdPathParamsType,
  DeliveriesGetDeliveryById404Type,
} from '../../types/deliveries/DeliveriesGetDeliveryByIdType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const deliveriesGetDeliveryByIdSuspenseQueryKey = (
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
) => [{ url: '/deliveries/:id', params: { id: id } }] as const;

export type DeliveriesGetDeliveryByIdSuspenseQueryKey = ReturnType<
  typeof deliveriesGetDeliveryByIdSuspenseQueryKey
>;

/**
 * @description     Возвращает детальную информацию о конкретной поставке.    ### Включенные данные:    - Полная информация о поставке    - Детальный список товаров    - Информация о поставщиках    - Все выбранные услуги и расходники    - Расчет стоимости по каждой позиции
 * @summary Получение информации о поставке
 * {@link /deliveries/:id}
 */
export async function deliveriesGetDeliveryByIdSuspense(
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesGetDeliveryByIdQueryResponseType,
    ResponseErrorConfig<DeliveriesGetDeliveryById404Type>,
    unknown
  >({
    method: 'GET',
    url: `/deliveries/${id}`,
    ...requestConfig,
  });
  return res.data;
}

export function deliveriesGetDeliveryByIdSuspenseQueryOptions(
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = deliveriesGetDeliveryByIdSuspenseQueryKey(id);
  return queryOptions<
    DeliveriesGetDeliveryByIdQueryResponseType,
    ResponseErrorConfig<DeliveriesGetDeliveryById404Type>,
    DeliveriesGetDeliveryByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return deliveriesGetDeliveryByIdSuspense(id, config);
    },
  });
}

/**
 * @description     Возвращает детальную информацию о конкретной поставке.    ### Включенные данные:    - Полная информация о поставке    - Детальный список товаров    - Информация о поставщиках    - Все выбранные услуги и расходники    - Расчет стоимости по каждой позиции
 * @summary Получение информации о поставке
 * {@link /deliveries/:id}
 */
export function useDeliveriesGetDeliveryByIdSuspense<
  TData = DeliveriesGetDeliveryByIdQueryResponseType,
  TQueryData = DeliveriesGetDeliveryByIdQueryResponseType,
  TQueryKey extends QueryKey = DeliveriesGetDeliveryByIdSuspenseQueryKey,
>(
  id: DeliveriesGetDeliveryByIdPathParamsType['id'],
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        DeliveriesGetDeliveryByIdQueryResponseType,
        ResponseErrorConfig<DeliveriesGetDeliveryById404Type>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? deliveriesGetDeliveryByIdSuspenseQueryKey(id);

  const query = useSuspenseQuery({
    ...(deliveriesGetDeliveryByIdSuspenseQueryOptions(
      id,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<DeliveriesGetDeliveryById404Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
