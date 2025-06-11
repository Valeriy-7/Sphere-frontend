import client from '@/modules/auth/axios-client'
import type { TestCreateMutationRequestType, TestCreateMutationResponseType } from '../../types/test/TestCreateType'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const testCreateMutationKey = () => [{ url: '/test' }] as const

export type TestCreateMutationKey = ReturnType<typeof testCreateMutationKey>

/**
 * {@link /test}
 */
export async function testCreate(
  data?: TestCreateMutationRequestType,
  config: Partial<RequestConfig<TestCreateMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TestCreateMutationResponseType, ResponseErrorConfig<Error>, TestCreateMutationRequestType>({
    method: 'POST',
    url: `/test`,
    data,
    ...requestConfig,
  })
  return res.data
}

/**
 * {@link /test}
 */
export function useTestCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<TestCreateMutationResponseType, ResponseErrorConfig<Error>, { data?: TestCreateMutationRequestType }, TContext>
    client?: Partial<RequestConfig<TestCreateMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? testCreateMutationKey()

  return useMutation<TestCreateMutationResponseType, ResponseErrorConfig<Error>, { data?: TestCreateMutationRequestType }, TContext>({
    mutationFn: async ({ data }) => {
      return testCreate(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}