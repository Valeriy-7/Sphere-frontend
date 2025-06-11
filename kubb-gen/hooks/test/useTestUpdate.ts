import client from '@/modules/auth/axios-client'
import type { TestUpdateMutationRequestType, TestUpdateMutationResponseType, TestUpdatePathParamsType } from '../../types/test/TestUpdateType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const testUpdateMutationKey = () => [{ url: '/test/{id}' }] as const

export type TestUpdateMutationKey = ReturnType<typeof testUpdateMutationKey>

/**
 * {@link /test/:id}
 */
export async function testUpdate(
  id: TestUpdatePathParamsType['id'],
  data?: TestUpdateMutationRequestType,
  config: Partial<RequestConfig<TestUpdateMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestUpdateMutationResponseType, ResponseErrorConfig<Error>, TestUpdateMutationRequestType>({
    method: 'PATCH',
    url: `/test/${id}`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /test/:id}
 */
export function useTestUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      TestUpdateMutationResponseType,
      ResponseErrorConfig<Error>,
      { id: TestUpdatePathParamsType['id']; data?: TestUpdateMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<TestUpdateMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? testUpdateMutationKey()

  return useMutation<
    TestUpdateMutationResponseType,
    ResponseErrorConfig<Error>,
    { id: TestUpdatePathParamsType['id']; data?: TestUpdateMutationRequestType },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return testUpdate(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}