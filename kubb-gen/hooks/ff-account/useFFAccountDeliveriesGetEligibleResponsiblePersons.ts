import client from '@/modules/auth/axios-client'
import type { FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType } from '../../types/ff-account/FFAccountDeliveriesGetEligibleResponsiblePersonsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const FFAccountDeliveriesGetEligibleResponsiblePersonsQueryKey = () => [{ url: '/ff-account/deliveries/responsible-persons' }] as const

export type FFAccountDeliveriesGetEligibleResponsiblePersonsQueryKey = ReturnType<typeof FFAccountDeliveriesGetEligibleResponsiblePersonsQueryKey>

/**
 * @summary Получить список сотрудников для назначения ответственными
 * {@link /ff-account/deliveries/responsible-persons}
 */
export async function FFAccountDeliveriesGetEligibleResponsiblePersons(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/deliveries/responsible-persons`,
    ...requestConfig,
  })
  return res.data
}

export function FFAccountDeliveriesGetEligibleResponsiblePersonsQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFAccountDeliveriesGetEligibleResponsiblePersonsQueryKey()
  return queryOptions<
    FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
    ResponseErrorConfig<Error>,
    FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountDeliveriesGetEligibleResponsiblePersons(config)
    },
  })
}

/**
 * @summary Получить список сотрудников для назначения ответственными
 * {@link /ff-account/deliveries/responsible-persons}
 */
export function useFFAccountDeliveriesGetEligibleResponsiblePersons<
  TData = FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
  TQueryData = FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetEligibleResponsiblePersonsQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountDeliveriesGetEligibleResponsiblePersonsQueryKey()

  const query = useQuery({
    ...(FFAccountDeliveriesGetEligibleResponsiblePersonsQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}