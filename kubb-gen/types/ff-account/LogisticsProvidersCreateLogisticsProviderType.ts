import type { CreateLogisticsProviderDtoType } from '../CreateLogisticsProviderDtoType'
import type { LogisticsProviderListItemDtoType } from '../LogisticsProviderListItemDtoType'

/**
 * @description Логист успешно создан
 */
export type LogisticsProvidersCreateLogisticsProvider201Type = LogisticsProviderListItemDtoType

/**
 * @description Данные для создания логиста
 */
export type LogisticsProvidersCreateLogisticsProviderMutationRequestType = CreateLogisticsProviderDtoType

export type LogisticsProvidersCreateLogisticsProviderMutationResponseType = LogisticsProvidersCreateLogisticsProvider201Type

export type LogisticsProvidersCreateLogisticsProviderTypeMutation = {
  Response: LogisticsProvidersCreateLogisticsProvider201Type
  Request: LogisticsProvidersCreateLogisticsProviderMutationRequestType
  Errors: any
}