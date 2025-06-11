import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesRemoveResponsiblePersonMutationResponseType,
  FFAccountDeliveriesRemoveResponsiblePersonPathParamsType,
  FFAccountDeliveriesRemoveResponsiblePerson404Type,
} from '../../types/ff-account/FFAccountDeliveriesRemoveResponsiblePersonType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesRemoveResponsiblePersonMutationKey = () => [{ url: '/ff-account/deliveries/{id}/responsible/{responsibleId}' }] as const

export type FFAccountDeliveriesRemoveResponsiblePersonMutationKey = ReturnType<typeof FFAccountDeliveriesRemoveResponsiblePersonMutationKey>

/**
 * @description Удаляет ответственного сотрудника из поставки.
 * @summary Удалить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible/:responsibleId}
 */
export async function FFAccountDeliveriesRemoveResponsiblePerson(
  id: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType['id'],
  responsibleId: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType['responsibleId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesRemoveResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesRemoveResponsiblePerson404Type>,
    unknown
  >({ method: 'DELETE', url: `/ff-account/deliveries/${id}/responsible/${responsibleId}`, ...requestConfig })
  return res.data
}

/**
 * @description Удаляет ответственного сотрудника из поставки.
 * @summary Удалить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible/:responsibleId}
 */
export function useFFAccountDeliveriesRemoveResponsiblePerson<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesRemoveResponsiblePersonMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesRemoveResponsiblePerson404Type>,
      {
        id: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType['id']
        responsibleId: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType['responsibleId']
      },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesRemoveResponsiblePersonMutationKey()

  return useMutation<
    FFAccountDeliveriesRemoveResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesRemoveResponsiblePerson404Type>,
    {
      id: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType['id']
      responsibleId: FFAccountDeliveriesRemoveResponsiblePersonPathParamsType['responsibleId']
    },
    TContext
  >({
    mutationFn: async ({ id, responsibleId }) => {
      return FFAccountDeliveriesRemoveResponsiblePerson(id, responsibleId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}