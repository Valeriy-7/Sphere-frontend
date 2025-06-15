import { createDeliveryGroupDtoSchema } from '../createDeliveryGroupDtoSchema'
import { deliveryGroupDetailDtoSchema } from '../deliveryGroupDetailDtoSchema'
import { z } from 'zod'

/**
 * @description Группа поставок успешно создана
 */
export const deliveryGroupsCreateDeliveryGroup201Schema = z.lazy(() => deliveryGroupDetailDtoSchema)

/**
 * @description Некорректные данные
 */
export const deliveryGroupsCreateDeliveryGroup400Schema = z.any()

/**
 * @description Поставки не найдены
 */
export const deliveryGroupsCreateDeliveryGroup404Schema = z.any()

export const deliveryGroupsCreateDeliveryGroupMutationRequestSchema = z.lazy(() => createDeliveryGroupDtoSchema)

export const deliveryGroupsCreateDeliveryGroupMutationResponseSchema = z.lazy(() => deliveryGroupsCreateDeliveryGroup201Schema)