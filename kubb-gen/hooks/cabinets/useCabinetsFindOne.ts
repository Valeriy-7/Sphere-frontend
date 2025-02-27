import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query';
import type {
  CabinetsFindOneQueryResponseType,
  CabinetsFindOnePathParamsType,
  CabinetsFindOne404Type,
} from '../../types/cabinets/CabinetsFindOneType';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const cabinetsFindOneQueryKey = (id: CabinetsFindOnePathParamsType['id']) =>
  [{ url: '/cabinets/:id', params: { id: id } }] as const;

export type CabinetsFindOneQueryKey = ReturnType<typeof cabinetsFindOneQueryKey>;

/**
 * @description     Возвращает детальную информацию о конкретном кабинете.    ### Возвращаемые данные:    - Основная информация о компании    - Юридический и фактический адреса    - Контактные данные    - Банковские реквизиты    - Статусы и настройки
 * @summary Получение информации о кабинете
 * {@link /cabinets/:id}
 */
export async function cabinetsFindOne(
  id: CabinetsFindOnePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CabinetsFindOneQueryResponseType,
    ResponseErrorConfig<CabinetsFindOne404Type>,
    unknown
  >({
    method: 'GET',
    url: `/cabinets/${id}`,
    ...requestConfig,
  });
  return res.data;
}

export function cabinetsFindOneQueryOptions(
  id: CabinetsFindOnePathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = cabinetsFindOneQueryKey(id);
  return queryOptions<
    CabinetsFindOneQueryResponseType,
    ResponseErrorConfig<CabinetsFindOne404Type>,
    CabinetsFindOneQueryResponseType,
    typeof queryKey
  >({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return cabinetsFindOne(id, config);
    },
  });
}

/**
 * @description     Возвращает детальную информацию о конкретном кабинете.    ### Возвращаемые данные:    - Основная информация о компании    - Юридический и фактический адреса    - Контактные данные    - Банковские реквизиты    - Статусы и настройки
 * @summary Получение информации о кабинете
 * {@link /cabinets/:id}
 */
export function useCabinetsFindOne<
  TData = CabinetsFindOneQueryResponseType,
  TQueryData = CabinetsFindOneQueryResponseType,
  TQueryKey extends QueryKey = CabinetsFindOneQueryKey,
>(
  id: CabinetsFindOnePathParamsType['id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        CabinetsFindOneQueryResponseType,
        ResponseErrorConfig<CabinetsFindOne404Type>,
        TData,
        TQueryData,
        TQueryKey
      >
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? cabinetsFindOneQueryKey(id);

  const query = useQuery({
    ...(cabinetsFindOneQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<CabinetsFindOne404Type>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
