import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  DeliveriesCreateDeliveryMutationRequestType,
  DeliveriesCreateDeliveryMutationResponseType,
  DeliveriesCreateDelivery400Type,
  DeliveriesCreateDelivery401Type,
} from '../../types/deliveries/DeliveriesCreateDeliveryType';
import { useMutation } from '@tanstack/react-query';

export const deliveriesCreateDeliveryMutationKey = () => [{ url: '/deliveries' }] as const;

export type DeliveriesCreateDeliveryMutationKey = ReturnType<
  typeof deliveriesCreateDeliveryMutationKey
>;

/**
 * @description Создает новую поставку с выбранными товарами, услугами и расходниками
 * @summary Создание поставки
 * {@link /deliveries}
 */
export async function deliveriesCreateDelivery(
  data: DeliveriesCreateDeliveryMutationRequestType,
  config: Partial<RequestConfig<DeliveriesCreateDeliveryMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeliveriesCreateDeliveryMutationResponseType,
    ResponseErrorConfig<DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery401Type>,
    DeliveriesCreateDeliveryMutationRequestType
  >({ method: 'POST', url: `/deliveries`, data, ...requestConfig });
  return res.data;
}

/**
 * @description Создает новую поставку с выбранными товарами, услугами и расходниками
 * @summary Создание поставки
 * {@link /deliveries}
 */
export function useDeliveriesCreateDelivery(
  options: {
    mutation?: UseMutationOptions<
      DeliveriesCreateDeliveryMutationResponseType,
      ResponseErrorConfig<DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery401Type>,
      { data: DeliveriesCreateDeliveryMutationRequestType }
    >;
    client?: Partial<RequestConfig<DeliveriesCreateDeliveryMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? deliveriesCreateDeliveryMutationKey();

  return useMutation<
    DeliveriesCreateDeliveryMutationResponseType,
    ResponseErrorConfig<DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery401Type>,
    { data: DeliveriesCreateDeliveryMutationRequestType }
  >({
    mutationFn: async ({ data }) => {
      return deliveriesCreateDelivery(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
