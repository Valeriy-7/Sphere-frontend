import type { UpdateWorkerDtoType } from '../UpdateWorkerDtoType'
import type { WorkerListItemDtoType } from '../WorkerListItemDtoType'

export type WorkersUpdateWorkerPathParamsType = {
  /**
   * @description Идентификатор сотрудника
   * @type string, uuid
   */
  workerId: string
}

/**
 * @description Информация о сотруднике успешно обновлена
 */
export type WorkersUpdateWorker200Type = WorkerListItemDtoType

/**
 * @description Сотрудник не найден
 */
export type WorkersUpdateWorker404Type = any

/**
 * @description Данные для обновления сотрудника
 */
export type WorkersUpdateWorkerMutationRequestType = UpdateWorkerDtoType

export type WorkersUpdateWorkerMutationResponseType = WorkersUpdateWorker200Type

export type WorkersUpdateWorkerTypeMutation = {
  Response: WorkersUpdateWorker200Type
  Request: WorkersUpdateWorkerMutationRequestType
  PathParams: WorkersUpdateWorkerPathParamsType
  Errors: WorkersUpdateWorker404Type
}