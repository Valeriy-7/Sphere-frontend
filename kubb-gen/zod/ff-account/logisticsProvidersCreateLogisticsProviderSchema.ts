import { createLogisticsProviderDtoSchema } from '../createLogisticsProviderDtoSchema'
import { logisticsProviderListItemDtoSchema } from '../logisticsProviderListItemDtoSchema'
import { z } from 'zod'

/**
 * @description Логист успешно создан
 */
export const logisticsProvidersCreateLogisticsProvider201Schema = z.lazy(() => logisticsProviderListItemDtoSchema)

/**
 * @description Данные для создания логиста
 */
export const logisticsProvidersCreateLogisticsProviderMutationRequestSchema = z.lazy(() => createLogisticsProviderDtoSchema)

export const logisticsProvidersCreateLogisticsProviderMutationResponseSchema = z.lazy(() => logisticsProvidersCreateLogisticsProvider201Schema)