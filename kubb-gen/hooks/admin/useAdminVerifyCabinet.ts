import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  AdminVerifyCabinetMutationRequestType,
  AdminVerifyCabinetMutationResponseType,
  AdminVerifyCabinetPathParamsType,
} from '../../types/admin/AdminVerifyCabinetType';
import { useMutation } from '@tanstack/react-query';

export const adminVerifyCabinetMutationKey = () =>
  [{ url: '/admin/cabinets/{id}/verify' }] as const;

export type AdminVerifyCabinetMutationKey = ReturnType<typeof adminVerifyCabinetMutationKey>;

/**
 * @description     Подтверждает или отменяет верификацию кабинета администратором.
 * @summary Верификация кабинета
 * {@link /admin/cabinets/:id/verify}
 */
export async function adminVerifyCabinet(
  id: AdminVerifyCabinetPathParamsType['id'],
  data: AdminVerifyCabinetMutationRequestType,
  config: Partial<RequestConfig<AdminVerifyCabinetMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AdminVerifyCabinetMutationResponseType,
    ResponseErrorConfig<Error>,
    AdminVerifyCabinetMutationRequestType
  >({
    method: 'PUT',
    url: `/admin/cabinets/${id}/verify`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description     Подтверждает или отменяет верификацию кабинета администратором.
 * @summary Верификация кабинета
 * {@link /admin/cabinets/:id/verify}
 */
export function useAdminVerifyCabinet(
  options: {
    mutation?: UseMutationOptions<
      AdminVerifyCabinetMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: AdminVerifyCabinetPathParamsType['id']; data: AdminVerifyCabinetMutationRequestType }
    >;
    client?: Partial<RequestConfig<AdminVerifyCabinetMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? adminVerifyCabinetMutationKey();

  return useMutation<
    AdminVerifyCabinetMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: AdminVerifyCabinetPathParamsType['id']; data: AdminVerifyCabinetMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return adminVerifyCabinet(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
