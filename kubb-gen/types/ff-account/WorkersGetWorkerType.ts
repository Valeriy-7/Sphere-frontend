import type { WorkerListItemDtoType } from '../WorkerListItemDtoType'

export type WorkersGetWorkerPathParamsType = {
  /**
   * @description Идентификатор сотрудника
   * @type string, uuid
   */
  workerId: string
}

/**
 * @description Информация о сотруднике
 */
export type WorkersGetWorker200Type = WorkerListItemDtoType

/**
 * @description Сотрудник не найден
 */
export type WorkersGetWorker404Type = any

export type WorkersGetWorkerQueryResponseType = WorkersGetWorker200Type

export type WorkersGetWorkerTypeQuery = {
  Response: WorkersGetWorker200Type
  PathParams: WorkersGetWorkerPathParamsType
  Errors: WorkersGetWorker404Type
}