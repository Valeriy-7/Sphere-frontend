import type { CreateServiceDtoType } from '../CreateServiceDtoType';
import type { ServiceType } from '../ServiceType';

/**
 * @description Услуга успешно создана
 */
export type LogisticsCreateService201Type = ServiceType;

export type LogisticsCreateServiceMutationRequestType = CreateServiceDtoType;

export type LogisticsCreateServiceMutationResponseType = LogisticsCreateService201Type;

export type LogisticsCreateServiceTypeMutation = {
  Response: LogisticsCreateService201Type;
  Request: LogisticsCreateServiceMutationRequestType;
  Errors: any;
};
