import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  FFAccountDeliveriesUpdateStoreInfoMutationRequestType,
  FFAccountDeliveriesUpdateStoreInfoMutationResponseType,
  FFAccountDeliveriesUpdateStoreInfoPathParamsType,
  FFAccountDeliveriesUpdateStoreInfo404Type,
} from '../../types/ff-account/FFAccountDeliveriesUpdateStoreInfoType';
import { useMutation } from '@tanstack/react-query';

export const FFAccountDeliveriesUpdateStoreInfoMutationKey = () =>
  [{ url: '/ff-account/deliveries/{id}/store-info' }] as const;

export type FFAccountDeliveriesUpdateStoreInfoMutationKey = ReturnType<
  typeof FFAccountDeliveriesUpdateStoreInfoMutationKey
>;

/**
 * @description Обновляет информацию о магазине для поставки, включая контактные данные и время работы.
 * @summary Обновить информацию о магазине
 * {@link /ff-account/deliveries/:id/store-info}
 */
export async function FFAccountDeliveriesUpdateStoreInfo(
  id: FFAccountDeliveriesUpdateStoreInfoPathParamsType['id'],
  data?: FFAccountDeliveriesUpdateStoreInfoMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesUpdateStoreInfoMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFAccountDeliveriesUpdateStoreInfoMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateStoreInfo404Type>,
    FFAccountDeliveriesUpdateStoreInfoMutationRequestType
  >({ method: 'PATCH', url: `/ff-account/deliveries/${id}/store-info`, data, ...requestConfig });
  return res.data;
}

/**
 * @description Обновляет информацию о магазине для поставки, включая контактные данные и время работы.
 * @summary Обновить информацию о магазине
 * {@link /ff-account/deliveries/:id/store-info}
 */
export function useFFAccountDeliveriesUpdateStoreInfo<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesUpdateStoreInfoMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesUpdateStoreInfo404Type>,
      {
        id: FFAccountDeliveriesUpdateStoreInfoPathParamsType['id'];
        data?: FFAccountDeliveriesUpdateStoreInfoMutationRequestType;
      },
      TContext
    >;
    client?: Partial<RequestConfig<FFAccountDeliveriesUpdateStoreInfoMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? FFAccountDeliveriesUpdateStoreInfoMutationKey();

  return useMutation<
    FFAccountDeliveriesUpdateStoreInfoMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesUpdateStoreInfo404Type>,
    {
      id: FFAccountDeliveriesUpdateStoreInfoPathParamsType['id'];
      data?: FFAccountDeliveriesUpdateStoreInfoMutationRequestType;
    },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesUpdateStoreInfo(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
