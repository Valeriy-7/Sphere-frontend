import type { LogisticsProviderListItemDtoType } from '../LogisticsProviderListItemDtoType';
import type { UpdateLogisticsProviderDtoType } from '../UpdateLogisticsProviderDtoType';

export type LogisticsProvidersUpdateLogisticsProviderPathParamsType = {
  /**
   * @description Идентификатор логиста
   * @type string, uuid
   */
  id: string;
};

/**
 * @description Информация о логисте успешно обновлена
 */
export type LogisticsProvidersUpdateLogisticsProvider200Type = LogisticsProviderListItemDtoType;

/**
 * @description Логист не найден
 */
export type LogisticsProvidersUpdateLogisticsProvider404Type = any;

/**
 * @description Данные для обновления логиста
 */
export type LogisticsProvidersUpdateLogisticsProviderMutationRequestType =
  UpdateLogisticsProviderDtoType;

export type LogisticsProvidersUpdateLogisticsProviderMutationResponseType =
  LogisticsProvidersUpdateLogisticsProvider200Type;

export type LogisticsProvidersUpdateLogisticsProviderTypeMutation = {
  Response: LogisticsProvidersUpdateLogisticsProvider200Type;
  Request: LogisticsProvidersUpdateLogisticsProviderMutationRequestType;
  PathParams: LogisticsProvidersUpdateLogisticsProviderPathParamsType;
  Errors: LogisticsProvidersUpdateLogisticsProvider404Type;
};
