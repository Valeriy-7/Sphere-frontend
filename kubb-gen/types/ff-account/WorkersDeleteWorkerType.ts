export type WorkersDeleteWorkerPathParamsType = {
  /**
   * @description Идентификатор сотрудника
   * @type string, uuid
   */
  workerId: string
}

/**
 * @description Сотрудник успешно удален
 */
export type WorkersDeleteWorker200Type = any

/**
 * @description Сотрудник не найден
 */
export type WorkersDeleteWorker404Type = any

export type WorkersDeleteWorkerMutationResponseType = WorkersDeleteWorker200Type

export type WorkersDeleteWorkerTypeMutation = {
  Response: WorkersDeleteWorker200Type
  PathParams: WorkersDeleteWorkerPathParamsType
  Errors: WorkersDeleteWorker404Type
}