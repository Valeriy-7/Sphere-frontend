import { responsiblePersonListItemDtoSchema } from '../responsiblePersonListItemDtoSchema'
import { z } from 'zod'

/**
 * @description Список сотрудников
 */
export const FFAccountDeliveriesGetEligibleResponsiblePersons200Schema = z.array(z.lazy(() => responsiblePersonListItemDtoSchema))

export const FFAccountDeliveriesGetEligibleResponsiblePersonsQueryResponseSchema = z.lazy(() => FFAccountDeliveriesGetEligibleResponsiblePersons200Schema)