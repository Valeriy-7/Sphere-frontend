import client from '@/modules/auth/axios-client'
import type {
  FFAccountDeliveriesAddResponsiblePersonMutationRequestType,
  FFAccountDeliveriesAddResponsiblePersonMutationResponseType,
  FFAccountDeliveriesAddResponsiblePersonPathParamsType,
  FFAccountDeliveriesAddResponsiblePerson404Type,
} from '../../types/ff-account/FFAccountDeliveriesAddResponsiblePersonType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const FFAccountDeliveriesAddResponsiblePersonMutationKey = () => [{ url: '/ff-account/deliveries/{id}/responsible' }] as const

export type FFAccountDeliveriesAddResponsiblePersonMutationKey = ReturnType<typeof FFAccountDeliveriesAddResponsiblePersonMutationKey>

/**
 * @description Добавляет ответственного сотрудника к поставке без удаления существующих.
 * @summary Добавить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible}
 */
export async function FFAccountDeliveriesAddResponsiblePerson(
  id: FFAccountDeliveriesAddResponsiblePersonPathParamsType['id'],
  data: FFAccountDeliveriesAddResponsiblePersonMutationRequestType,
  config: Partial<RequestConfig<FFAccountDeliveriesAddResponsiblePersonMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    FFAccountDeliveriesAddResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAddResponsiblePerson404Type>,
    FFAccountDeliveriesAddResponsiblePersonMutationRequestType
  >({ method: 'POST', url: `/ff-account/deliveries/${id}/responsible`, data, ...requestConfig })
  return res.data
}

/**
 * @description Добавляет ответственного сотрудника к поставке без удаления существующих.
 * @summary Добавить ответственного сотрудника
 * {@link /ff-account/deliveries/:id/responsible}
 */
export function useFFAccountDeliveriesAddResponsiblePerson<TContext>(
  options: {
    mutation?: UseMutationOptions<
      FFAccountDeliveriesAddResponsiblePersonMutationResponseType,
      ResponseErrorConfig<FFAccountDeliveriesAddResponsiblePerson404Type>,
      { id: FFAccountDeliveriesAddResponsiblePersonPathParamsType['id']; data: FFAccountDeliveriesAddResponsiblePersonMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<FFAccountDeliveriesAddResponsiblePersonMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? FFAccountDeliveriesAddResponsiblePersonMutationKey()

  return useMutation<
    FFAccountDeliveriesAddResponsiblePersonMutationResponseType,
    ResponseErrorConfig<FFAccountDeliveriesAddResponsiblePerson404Type>,
    { id: FFAccountDeliveriesAddResponsiblePersonPathParamsType['id']; data: FFAccountDeliveriesAddResponsiblePersonMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return FFAccountDeliveriesAddResponsiblePerson(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}