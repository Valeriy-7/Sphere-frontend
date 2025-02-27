import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  LogisticsCreateLogisticsMutationRequestType,
  LogisticsCreateLogisticsMutationResponseType,
} from '../../types/services/LogisticsCreateLogisticsType';
import { useMutation } from '@tanstack/react-query';

export const logisticsCreateLogisticsMutationKey = () => [{ url: '/services/logistics' }] as const;

export type LogisticsCreateLogisticsMutationKey = ReturnType<
  typeof logisticsCreateLogisticsMutationKey
>;

/**
 * @description Создает новую запись логистики с указанными параметрами, включая описание маршрута
 * @summary Создание новой логистики
 * {@link /services/logistics}
 */
export async function logisticsCreateLogistics(
  data: LogisticsCreateLogisticsMutationRequestType,
  config: Partial<RequestConfig<LogisticsCreateLogisticsMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LogisticsCreateLogisticsMutationResponseType,
    ResponseErrorConfig<Error>,
    LogisticsCreateLogisticsMutationRequestType
  >({
    method: 'POST',
    url: `/services/logistics`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Создает новую запись логистики с указанными параметрами, включая описание маршрута
 * @summary Создание новой логистики
 * {@link /services/logistics}
 */
export function useLogisticsCreateLogistics(
  options: {
    mutation?: UseMutationOptions<
      LogisticsCreateLogisticsMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: LogisticsCreateLogisticsMutationRequestType }
    >;
    client?: Partial<RequestConfig<LogisticsCreateLogisticsMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? logisticsCreateLogisticsMutationKey();

  return useMutation<
    LogisticsCreateLogisticsMutationResponseType,
    ResponseErrorConfig<Error>,
    { data: LogisticsCreateLogisticsMutationRequestType }
  >({
    mutationFn: async ({ data }) => {
      return logisticsCreateLogistics(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
