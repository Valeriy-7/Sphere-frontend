import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  AdminBlockUserMutationRequestType,
  AdminBlockUserMutationResponseType,
  AdminBlockUserPathParamsType,
} from '../../types/admin/AdminBlockUserType';
import { useMutation } from '@tanstack/react-query';

export const adminBlockUserMutationKey = () => [{ url: '/admin/users/{id}/block' }] as const;

export type AdminBlockUserMutationKey = ReturnType<typeof adminBlockUserMutationKey>;

/**
 * @description     Блокирует или разблокирует пользователя в системе.
 * @summary Блокировка пользователя
 * {@link /admin/users/:id/block}
 */
export async function adminBlockUser(
  id: AdminBlockUserPathParamsType['id'],
  data: AdminBlockUserMutationRequestType,
  config: Partial<RequestConfig<AdminBlockUserMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AdminBlockUserMutationResponseType,
    ResponseErrorConfig<Error>,
    AdminBlockUserMutationRequestType
  >({
    method: 'PUT',
    url: `/admin/users/${id}/block`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description     Блокирует или разблокирует пользователя в системе.
 * @summary Блокировка пользователя
 * {@link /admin/users/:id/block}
 */
export function useAdminBlockUser(
  options: {
    mutation?: UseMutationOptions<
      AdminBlockUserMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: AdminBlockUserPathParamsType['id']; data: AdminBlockUserMutationRequestType }
    >;
    client?: Partial<RequestConfig<AdminBlockUserMutationRequestType>> & { client?: typeof client };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? adminBlockUserMutationKey();

  return useMutation<
    AdminBlockUserMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: AdminBlockUserPathParamsType['id']; data: AdminBlockUserMutationRequestType }
  >({
    mutationFn: async ({ id, data }) => {
      return adminBlockUser(id, data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
