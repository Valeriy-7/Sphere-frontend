import type { ResponsiblePersonListItemDtoType } from '../ResponsiblePersonListItemDtoType'

/**
 * @description Список сотрудников
 */
export type FFAccountDeliveriesGetEligibleResponsiblePersons200Type = ResponsiblePersonListItemDtoType[]

export type FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseType = FFAccountDeliveriesGetEligibleResponsiblePersons200Type

export type FFAccountDeliveriesGetEligibleResponsiblePersonsTypeQuery = {
  Response: FFAccountDeliveriesGetEligibleResponsiblePersons200Type
  Errors: any
}