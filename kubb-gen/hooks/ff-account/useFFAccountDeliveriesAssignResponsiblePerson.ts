import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  FFAccountDeliveriesAssignResponsiblePersonMutationRequestType,
  FFAccountDeliveriesAssignResponsiblePersonMutationResponseType,
  FFAccountDeliveriesAssignResponsiblePersonPathParamsType,
  FFAccountDeliveriesAssignResponsiblePerson404Type,
} from '../../types/ff-account/FFAccountDeliveriesAssignResponsiblePersonType';
import { useMutation } from '@tanstack/react-query';

export const FFAccountDeliveriesAssignResponsiblePersonMutationKey = () =>
  [{ url: '/ff-account/deliveries/{id}/responsible-person' }] as const;

export type FFAccountDeliveriesAssignResponsiblePersonMutationKey = ReturnType<
  typeof FFAccountDeliveriesAssignResponsiblePersonMutationKey
>;

/**
 * @description Назначает ответственного сотрудника для поставки.
 * @summary Назначить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible-person}
 */
export async function FFAccountDeliveriesAssignResponsiblePerson(
  id: FFAccountDeliveriesAssignResponsiblePersonPathParamsType['id'],
  data: FFAccountDeliveriesAssignResponsiblePersonMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesAssignResponsiblePersonMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    FFAccountDeliveriesAssignResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignResponsiblePerson404Type>,
    FFAccountDeliveriesAssignResponsiblePersonMutationRequestType
  >({
    method: 'PATCH',
    url: `/ff-account/deliveries/${id}/responsible-person`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Назначает ответственного сотрудника для поставки.
 * @summary Назначить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible-person}
 */
export function useFFAccountDeliveriesAssignResponsiblePerson(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesAssignResponsiblePersonMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesAssignResponsiblePerson404Type>,
      {
        id: FFAccountDeliveriesAssignResponsiblePersonPathParamsType['id'];
        data: FFAccountDeliveriesAssignResponsiblePersonMutationRequestType;
      }
    >;
    client?: Partial<
      RequestConfig<FFAccountDeliveriesAssignResponsiblePersonMutationRequestType>
    > & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey =
    mutationOptions?.mutationKey ?? FFAccountDeliveriesAssignResponsiblePersonMutationKey();

  return useMutation<
    FFAccountDeliveriesAssignResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAssignResponsiblePerson404Type>,
    {
      id: FFAccountDeliveriesAssignResponsiblePersonPathParamsType['id'];
      data: FFAccountDeliveriesAssignResponsiblePersonMutationRequestType;
    }
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesAssignResponsiblePerson(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
