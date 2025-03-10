import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  FFDeliveriesUpdateStatusMutationRequestType,
  FFDeliveriesUpdateStatusMutationResponseType,
  FFDeliveriesUpdateStatusPathParamsType,
} from '../../types/ff-deliveries/FFDeliveriesUpdateStatusType';
import { useMutation } from '@tanstack/react-query';

export const FFDeliveriesUpdateStatusMutationKey = () =>
  [{ url: '/ff-deliveries/{id}/status' }] as const;

export type FFDeliveriesUpdateStatusMutationKey = ReturnType<
  typeof FFDeliveriesUpdateStatusMutationKey
>;

/**
 * @summary Обновить статус поставки
 * {@link /ff-deliveries/:id/status}
 */
export async function FFDeliveriesUpdateStatus(
  id: FFDeliveriesUpdateStatusPathParamsType['id'],
  data: FFDeliveriesUpdateStatusMutationRequestType,
  config: Partial<RequestConfig<FFDeliveriesUpdateStatusMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFDeliveriesUpdateStatusMutationResponseType,
    ResponseErrorConfig<Error>,
    FFDeliveriesUpdateStatusMutationRequestType
  >({
    method: 'PATCH',
    url: `/ff-deliveries/${id}/status`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @summary Обновить статус поставки
 * {@link /ff-deliveries/:id/status}
 */
export function useFFDeliveriesUpdateStatus(
  options: {
    mutation?: UseMutationOptions<
      FFDeliveriesUpdateStatusMutationResponseType,
      ResponseErrorConfig<Error>,
      {
        id: FFDeliveriesUpdateStatusPathParamsType['id'];
        data: FFDeliveriesUpdateStatusMutationRequestType;
      }
    >;
    client?: Partial<RequestConfig<FFDeliveriesUpdateStatusMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? FFDeliveriesUpdateStatusMutationKey();

  return useMutation<
    FFDeliveriesUpdateStatusMutationResponseType,
    ResponseErrorConfig<Error>,
    {
      id: FFDeliveriesUpdateStatusPathParamsType['id'];
      data: FFDeliveriesUpdateStatusMutationRequestType;
    }
  >({
    mutationFn: async ({ id, data }) => {
      return FFDeliveriesUpdateStatus(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
