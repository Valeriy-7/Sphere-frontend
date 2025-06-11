import type { WorkerListItemDtoType } from '../WorkerListItemDtoType'

/**
 * @description Список сотрудников
 */
export type WorkersGetWorkers200Type = WorkerListItemDtoType[]

export type WorkersGetWorkersQueryResponseType = WorkersGetWorkers200Type

export type WorkersGetWorkersTypeQuery = {
  Response: WorkersGetWorkers200Type
  Errors: any
}