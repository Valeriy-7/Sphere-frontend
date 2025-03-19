import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  LogisticsProvidersDeleteLogisticsProviderMutationResponseType,
  LogisticsProvidersDeleteLogisticsProviderPathParamsType,
  LogisticsProvidersDeleteLogisticsProvider404Type,
} from '../../types/ff-account/LogisticsProvidersDeleteLogisticsProviderType';
import { useMutation } from '@tanstack/react-query';

export const logisticsProvidersDeleteLogisticsProviderMutationKey = () =>
  [{ url: '/ff-account/logistics-providers/{id}' }] as const;

export type LogisticsProvidersDeleteLogisticsProviderMutationKey = ReturnType<
  typeof logisticsProvidersDeleteLogisticsProviderMutationKey
>;

/**
 * @description Удаляет логиста по его идентификатору.
 * @summary Удалить логиста
 * {@link /ff-account/logistics-providers/:id}
 */
export async function logisticsProvidersDeleteLogisticsProvider(
  id: LogisticsProvidersDeleteLogisticsProviderPathParamsType['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LogisticsProvidersDeleteLogisticsProviderMutationResponseType,
    ResponseErrorConfig<LogisticsProvidersDeleteLogisticsProvider404Type>,
    unknown
  >({ method: 'DELETE', url: `/ff-account/logistics-providers/${id}`, ...requestConfig });
  return res.data;
}

/**
 * @description Удаляет логиста по его идентификатору.
 * @summary Удалить логиста
 * {@link /ff-account/logistics-providers/:id}
 */
export function useLogisticsProvidersDeleteLogisticsProvider<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LogisticsProvidersDeleteLogisticsProviderMutationResponseType,
      ResponseErrorConfig<LogisticsProvidersDeleteLogisticsProvider404Type>,
      { id: LogisticsProvidersDeleteLogisticsProviderPathParamsType['id'] },
      TContext
    >;
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? logisticsProvidersDeleteLogisticsProviderMutationKey();

  return useMutation<
    LogisticsProvidersDeleteLogisticsProviderMutationResponseType,
    ResponseErrorConfig<LogisticsProvidersDeleteLogisticsProvider404Type>,
    { id: LogisticsProvidersDeleteLogisticsProviderPathParamsType['id'] },
    TContext
  >({
    mutationFn: async ({ id }) => {
      return logisticsProvidersDeleteLogisticsProvider(id, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
