import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  CabinetsGetAvailablePartnersQueryResponseType,
  CabinetsGetAvailablePartnersQueryParamsType,
} from '../../types/cabinets/CabinetsGetAvailablePartnersType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const cabinetsGetAvailablePartnersQueryKey = (
  params?: CabinetsGetAvailablePartnersQueryParamsType,
) => [{ url: '/cabinets/available-partners' }, ...(params ? [params] : [])] as const;

export type CabinetsGetAvailablePartnersQueryKey = ReturnType<
  typeof cabinetsGetAvailablePartnersQueryKey
>;

/**
 * @description     Возвращает список кабинетов, которые не являются партнерами текущего кабинета.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка кабинетов, доступных для добавления в партнеры
 * {@link /cabinets/available-partners}
 */
export async function cabinetsGetAvailablePartners(
  params?: CabinetsGetAvailablePartnersQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CabinetsGetAvailablePartnersQueryResponseType,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/cabinets/available-partners`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function cabinetsGetAvailablePartnersQueryOptions(
  params?: CabinetsGetAvailablePartnersQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = cabinetsGetAvailablePartnersQueryKey(params);
  return queryOptions<
    CabinetsGetAvailablePartnersQueryResponseType,
    ResponseErrorConfig<Error>,
    CabinetsGetAvailablePartnersQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return cabinetsGetAvailablePartners(params, config);
    },
  });
}

/**
 * @description     Возвращает список кабинетов, которые не являются партнерами текущего кабинета.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка кабинетов, доступных для добавления в партнеры
 * {@link /cabinets/available-partners}
 */
export function useCabinetsGetAvailablePartners<
  TData = CabinetsGetAvailablePartnersQueryResponseType,
  TQueryData = CabinetsGetAvailablePartnersQueryResponseType,
  TQueryKey extends QueryKey = CabinetsGetAvailablePartnersQueryKey,
>(
  params?: CabinetsGetAvailablePartnersQueryParamsType,
  options: {
    query?: Partial<
      QueryObserverOptions<
        CabinetsGetAvailablePartnersQueryResponseType,
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
  const queryKey = queryOptions?.queryKey ?? cabinetsGetAvailablePartnersQueryKey(params);

  const query = useQuery({
    ...(cabinetsGetAvailablePartnersQueryOptions(
      params,
      config,
    ) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
