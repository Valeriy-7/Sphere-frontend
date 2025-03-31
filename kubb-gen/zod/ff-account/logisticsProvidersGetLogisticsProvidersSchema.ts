import { logisticsProviderListItemDtoSchema } from '../logisticsProviderListItemDtoSchema'
import { z } from 'zod'

/**
 * @description Список логистов
 */
export const logisticsProvidersGetLogisticsProviders200Schema = z.array(z.lazy(() => logisticsProviderListItemDtoSchema))

export const logisticsProvidersGetLogisticsProvidersQueryResponseSchema = z.lazy(() => logisticsProvidersGetLogisticsProviders200Schema)