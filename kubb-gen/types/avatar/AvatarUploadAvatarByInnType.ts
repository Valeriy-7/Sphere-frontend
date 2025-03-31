export type AvatarUploadAvatarByInnPathParamsType = {
  /**
   * @type string
   */
  inn: string
}

/**
 * @description Аватарка успешно загружена
 */
export type AvatarUploadAvatarByInn200Type = {
  /**
   * @type string | undefined
   */
  avatarUrl?: string
}

export type AvatarUploadAvatarByInnMutationRequestType = {
  /**
   * @description Файл аватарки
   * @type string | undefined, binary
   */
  file?: Blob
}

export type AvatarUploadAvatarByInnMutationResponseType = AvatarUploadAvatarByInn200Type

export type AvatarUploadAvatarByInnTypeMutation = {
  Response: AvatarUploadAvatarByInn200Type
  Request: AvatarUploadAvatarByInnMutationRequestType
  PathParams: AvatarUploadAvatarByInnPathParamsType
  Errors: any
}