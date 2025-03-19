import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType,
  FFAccountDeliveriesUpdateDeliveryStatusMutationResponseType,
  FFAccountDeliveriesUpdateDeliveryStatusPathParamsType,
  FFAccountDeliveriesUpdateDeliveryStatus400Type,
  FFAccountDeliveriesUpdateDeliveryStatus404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateDeliveryStatusType';
import { useMutation } from '@tanstack/react-query';

export const FFAccountDeliveriesUpdateDeliveryStatusMutationKey = () =>
  [{ url: '/ff-account/deliveries/{id}/status' }] as const;

export type FFAccountDeliveriesUpdateDeliveryStatusMutationKey = ReturnType<
  typeof FFAccountDeliveriesUpdateDeliveryStatusMutationKey
>;

/**
 * @description Обновляет статус поставки. Доступные статусы: CREATED, IN_PROGRESS, ACCEPTED, PREPARATION, COMPLETED.
 * @summary Обновить статус поставки
 * {@link /ff-account/deliveries/:id/status}
 */
export async function FFAccountDeliveriesUpdateDeliveryStatus(
  id: FFAccountDeliveriesUpdateDeliveryStatusPathParamsType['id'],
  data: FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFAccountDeliveriesUpdateDeliveryStatusMutationResponseType,
    ResponseErrorConfig<
      | FFAccountDeliveriesUpdateDeliveryStatus400Type
      | FFAccountDeliveriesUpdateDeliveryStatus404Type
    >,
    FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/status`, data, ...requestConfig });
  return res.data;
}

/**
 * @description Обновляет статус поставки. Доступные статусы: CREATED, IN_PROGRESS, ACCEPTED, PREPARATION, COMPLETED.
 * @summary Обновить статус поставки
 * {@link /ff-account/deliveries/:id/status}
 */
export function useFFAccountDeliveriesUpdateDeliveryStatus<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateDeliveryStatusMutationResponseType,
      ResponseErrorConfig<
        | FFAccountDeliveriesUpdateDeliveryStatus400Type
        | FFAccountDeliveriesUpdateDeliveryStatus404Type
      >,
      {
        id: FFAccountDeliveriesUpdateDeliveryStatusPathParamsType['id'];
        data: FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType;
      },
      TContext
    >;
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateDeliveryStatusMutationKey();

  return useMutation<
    FFAccountDeliveriesUpdateDeliveryStatusMutationResponseType,
    ResponseErrorConfig<
      | FFAccountDeliveriesUpdateDeliveryStatus400Type
      | FFAccountDeliveriesUpdateDeliveryStatus404Type
    >,
    {
      id: FFAccountDeliveriesUpdateDeliveryStatusPathParamsType['id'];
      data: FFAccountDeliveriesUpdateDeliveryStatusMutationRequestType;
    },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateDeliveryStatus(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
