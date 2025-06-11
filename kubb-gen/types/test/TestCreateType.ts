import type { CreateTestDtoType } from '../CreateTestDtoType'

export type TestCreate201Type = any

export type TestCreateMutationRequestType = CreateTestDtoType

export type TestCreateMutationResponseType = TestCreate201Type

export type TestCreateTypeMutation = {
  Response: TestCreate201Type
  Request: TestCreateMutationRequestType
  Errors: any
}