import client from '@/modules/auth/axios-client'
import type { FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType } from '../../types/ff-account/FFAccountDeliveriesGetEligibleResponsiblePersonsType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryKey = () => [{ url: '/ff-account/deliveries/eligible-responsible-persons' }] as const

export type FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryKey = ReturnType<
  typeof FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryKey
>

/**
 * @summary Получить список сотрудников для назначения ответственными
 * {@link /ff-account/deliveries/eligible-responsible-persons}
 */
export async function FFAccountDeliveriesGetEligibleResponsiblePersonsSuspense(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: `/ff-account/deliveries/eligible-responsible-persons`,
    ...requestConfig,
  })
  return res.data
}

export function FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryOptions(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryKey()
  return queryOptions<
    FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
    ResponseErrorConfig<Error>,
    FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return FFAccountDeliveriesGetEligibleResponsiblePersonsSuspense(config)
    },
  })
}

/**
 * @summary Получить список сотрудников для назначения ответственными
 * {@link /ff-account/deliveries/eligible-responsible-persons}
 */
export function useFFAccountDeliveriesGetEligibleResponsiblePersonsSuspense<
  TData = FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
  TQueryData = FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType,
  TQueryKey extends QueryKey = FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(FFAccountDeliveriesGetEligibleResponsiblePersonsSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}