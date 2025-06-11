import client from '@/modules/auth/axios-client'
import type { TestRemoveMutationResponseType, TestRemovePathParamsType } from '../../types/test/TestRemoveType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const testRemoveMutationKey = () => [{ url: '/test/{id}' }] as const

export type TestRemoveMutationKey = ReturnType<typeof testRemoveMutationKey>

/**
 * {@link /test/:id}
 */
export async function testRemove(id: TestRemovePathParamsType['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestRemoveMutationResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'DELETE', url: `/test/${id}`, ...requestConfig })
  return res.data
}

/**
 * {@link /test/:id}
 */
export function useTestRemove<TContext>(
  options: {
    mutation?: UseMutationOptions<TestRemoveMutationResponseType, ResponseErrorConfig<Error>, { id: TestRemovePathParamsType['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? testRemoveMutationKey()

  return useMutation<TestRemoveMutationResponseType, ResponseErrorConfig<Error>, { id: TestRemovePathParamsType['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return testRemove(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}