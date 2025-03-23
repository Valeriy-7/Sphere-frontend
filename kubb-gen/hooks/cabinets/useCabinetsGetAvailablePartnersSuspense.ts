import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type {
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type {
  CabinetsGetAvailablePartnersQueryResponseType,
  CabinetsGetAvailablePartnersQueryParamsType,
} from '../../types/cabinets/CabinetsGetAvailablePartnersType';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const cabinetsGetAvailablePartnersSuspenseQueryKey = (
  params?: CabinetsGetAvailablePartnersQueryParamsType,
) => [{ url: '/cabinets/available-partners' }, ...(params ? [params] : [])] as const;

export type CabinetsGetAvailablePartnersSuspenseQueryKey = ReturnType<
  typeof cabinetsGetAvailablePartnersSuspenseQueryKey
>;

/**
 * @description     Возвращает список кабинетов, которые не являются партнерами текущего кабинета.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка кабинетов, доступных для добавления в партнеры
 * {@link /cabinets/available-partners}
 */
export async function cabinetsGetAvailablePartnersSuspense(
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

export function cabinetsGetAvailablePartnersSuspenseQueryOptions(
  params?: CabinetsGetAvailablePartnersQueryParamsType,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = cabinetsGetAvailablePartnersSuspenseQueryKey(params);
  return queryOptions<
    CabinetsGetAvailablePartnersQueryResponseType,
    ResponseErrorConfig<Error>,
    CabinetsGetAvailablePartnersQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return cabinetsGetAvailablePartnersSuspense(params, config);
    },
  });
}

/**
 * @description     Возвращает список кабинетов, которые не являются партнерами текущего кабинета.    ### Параметры запроса:    - search: поиск по названию компании    - type: фильтр по типу организации    - sortBy: поле для сортировки (createdAt, companyName, number1, type)    - sortOrder: порядок сортировки (ASC, DESC)    - page: номер страницы (от 1)    - limit: количество элементов на странице (1-100)
 * @summary Получение списка кабинетов, доступных для добавления в партнеры
 * {@link /cabinets/available-partners}
 */
export function useCabinetsGetAvailablePartnersSuspense<
  TData = CabinetsGetAvailablePartnersQueryResponseType,
  TQueryData = CabinetsGetAvailablePartnersQueryResponseType,
  TQueryKey extends QueryKey = CabinetsGetAvailablePartnersSuspenseQueryKey,
>(
  params?: CabinetsGetAvailablePartnersQueryParamsType,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        CabinetsGetAvailablePartnersQueryResponseType,
        ResponseErrorConfig<Error>,
        TData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? cabinetsGetAvailablePartnersSuspenseQueryKey(params);

  const query = useSuspenseQuery({
    ...(cabinetsGetAvailablePartnersSuspenseQueryOptions(
      params,
      config,
    ) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
