import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  LogisticsProvidersCreateLogisticsProviderMutationRequestType,
  LogisticsProvidersCreateLogisticsProviderMutationResponseType,
} from '../../types/ff-account/LogisticsProvidersCreateLogisticsProviderType';
import { useMutation } from '@tanstack/react-query';

export const logisticsProvidersCreateLogisticsProviderMutationKey = () =>
  [{ url: '/ff-account/logistics-providers' }] as const;

export type LogisticsProvidersCreateLogisticsProviderMutationKey = ReturnType<
  typeof logisticsProvidersCreateLogisticsProviderMutationKey
>;

/**
 * @description Создает нового логиста с указанными данными.
 * @summary Создать нового логиста
 * {@link /ff-account/logistics-providers}
 */
export async function logisticsProvidersCreateLogisticsProvider(
  data: LogisticsProvidersCreateLogisticsProviderMutationRequestType,
  config: Partial<RequestConfig<LogisticsProvidersCreateLogisticsProviderMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LogisticsProvidersCreateLogisticsProviderMutationResponseType,
    ResponseErrorConfig<Error>,
    LogisticsProvidersCreateLogisticsProviderMutationRequestType
  >({ method: 'POST', url: `/ff-account/logistics-providers`, data, ...requestConfig });
  return res.data;
}

/**
 * @description Создает нового логиста с указанными данными.
 * @summary Создать нового логиста
 * {@link /ff-account/logistics-providers}
 */
export function useLogisticsProvidersCreateLogisticsProvider(
  options: {
    mutation?: UseMutationOptions<
      LogisticsProvidersCreateLogisticsProviderMutationResponseType,
      ResponseErrorConfig<Error>,
      { data: LogisticsProvidersCreateLogisticsProviderMutationRequestType }
    >;
    client?: Partial<
      RequestConfig<LogisticsProvidersCreateLogisticsProviderMutationRequestType>
    > & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? logisticsProvidersCreateLogisticsProviderMutationKey();

  return useMutation<
    LogisticsProvidersCreateLogisticsProviderMutationResponseType,
    ResponseErrorConfig<Error>,
    { data: LogisticsProvidersCreateLogisticsProviderMutationRequestType }
  >({
    mutationFn: async ({ data }) => {
      return logisticsProvidersCreateLogisticsProvider(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
