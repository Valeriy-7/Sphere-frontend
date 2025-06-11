import type { UpdateTestDtoType } from '../UpdateTestDtoType'

export type TestUpdatePathParamsType = {
  /**
   * @type string
   */
  id: string
}

export type TestUpdate200Type = any

export type TestUpdateMutationRequestType = UpdateTestDtoType

export type TestUpdateMutationResponseType = TestUpdate200Type

export type TestUpdateTypeMutation = {
  Response: TestUpdate200Type
  Request: TestUpdateMutationRequestType
  PathParams: TestUpdatePathParamsType
  Errors: any
}