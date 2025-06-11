import type { CreateWorkerDtoType } from '../CreateWorkerDtoType'
import type { WorkerListItemDtoType } from '../WorkerListItemDtoType'

/**
 * @description Сотрудник успешно создан
 */
export type WorkersCreateWorker201Type = WorkerListItemDtoType

/**
 * @description Данные для создания сотрудника
 */
export type WorkersCreateWorkerMutationRequestType = CreateWorkerDtoType

export type WorkersCreateWorkerMutationResponseType = WorkersCreateWorker201Type

export type WorkersCreateWorkerTypeMutation = {
  Response: WorkersCreateWorker201Type
  Request: WorkersCreateWorkerMutationRequestType
  Errors: any
}