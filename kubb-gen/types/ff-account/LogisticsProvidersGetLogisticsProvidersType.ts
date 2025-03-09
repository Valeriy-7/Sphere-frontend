import type { LogisticsProviderListItemDtoType } from '../LogisticsProviderListItemDtoType';

/**
 * @description Список логистов
 */
export type LogisticsProvidersGetLogisticsProviders200Type = LogisticsProviderListItemDtoType[];

export type LogisticsProvidersGetLogisticsProvidersQueryResponseType =
  LogisticsProvidersGetLogisticsProviders200Type;

export type LogisticsProvidersGetLogisticsProvidersTypeQuery = {
  Response: LogisticsProvidersGetLogisticsProviders200Type;
  Errors: any;
};
