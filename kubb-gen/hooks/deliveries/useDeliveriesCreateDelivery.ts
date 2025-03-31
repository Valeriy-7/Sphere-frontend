import client from '@/modules/auth/axios-client'
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client'
import type { UseMutationOptions } from '@tanstack/react-query'
import type {
  DeliveriesCreateDeliveryMutationRequestType,
  DeliveriesCreateDeliveryMutationResponseType,
  DeliveriesCreateDelivery400Type,
  DeliveriesCreateDelivery404Type,
} from '../../types/deliveries/DeliveriesCreateDeliveryType'
import { useMutation } from '@tanstack/react-query'

export const deliveriesCreateDeliveryMutationKey = () => [{ url: '/deliveries' }] as const

export type DeliveriesCreateDeliveryMutationKey = ReturnType<typeof deliveriesCreateDeliveryMutationKey>

/**
 * @description     Создает новую поставку с указанными товарами и услугами.    ### Важные моменты:    - Поставка должна содержать хотя бы один товар    - Для каждого товара:      - Количество должно быть больше нуля      - Цена должна быть больше нуля      - Можно выбрать дополнительные услуги и расходники    ### Процесс создания:    1. Проверяется существование кабинета    2. Создается запись поставки    3. Для каждого товара:       - Создается связь с поставкой       - Рассчитывается общая стоимость с учетом услуг и расходников    4. Рассчитываются итоговые суммы поставки
 * @summary Создание новой поставки
 * {@link /deliveries}
 */
export async function deliveriesCreateDelivery(
  data: DeliveriesCreateDeliveryMutationRequestType,
  config: Partial<RequestConfig<DeliveriesCreateDeliveryMutationRequestType>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    DeliveriesCreateDeliveryMutationResponseType,
    ResponseErrorConfig<DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery404Type>,
    DeliveriesCreateDeliveryMutationRequestType
  >({ method: 'POST', url: `/deliveries`, data, ...requestConfig })
  return res.data
}

/**
 * @description     Создает новую поставку с указанными товарами и услугами.    ### Важные моменты:    - Поставка должна содержать хотя бы один товар    - Для каждого товара:      - Количество должно быть больше нуля      - Цена должна быть больше нуля      - Можно выбрать дополнительные услуги и расходники    ### Процесс создания:    1. Проверяется существование кабинета    2. Создается запись поставки    3. Для каждого товара:       - Создается связь с поставкой       - Рассчитывается общая стоимость с учетом услуг и расходников    4. Рассчитываются итоговые суммы поставки
 * @summary Создание новой поставки
 * {@link /deliveries}
 */
export function useDeliveriesCreateDelivery<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeliveriesCreateDeliveryMutationResponseType,
      ResponseErrorConfig<DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery404Type>,
      { data: DeliveriesCreateDeliveryMutationRequestType },
      TContext
    >
    client?: Partial<RequestConfig<DeliveriesCreateDeliveryMutationRequestType>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deliveriesCreateDeliveryMutationKey()

  return useMutation<
    DeliveriesCreateDeliveryMutationResponseType,
    ResponseErrorConfig<DeliveriesCreateDelivery400Type | DeliveriesCreateDelivery404Type>,
    { data: DeliveriesCreateDeliveryMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return deliveriesCreateDelivery(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}