export type AvatarUploadAvatarPathParamsType = {
  /**
   * @type string
   */
  cabinetId: string
}

/**
 * @description Аватарка успешно загружена
 */
export type AvatarUploadAvatar200Type = {
  /**
   * @type string | undefined
   */
  avatarUrl?: string
}

export type AvatarUploadAvatarMutationRequestType = {
  /**
   * @description Файл аватарки
   * @type string | undefined, binary
   */
  file?: Blob
}

export type AvatarUploadAvatarMutationResponseType = AvatarUploadAvatar200Type

export type AvatarUploadAvatarTypeMutation = {
  Response: AvatarUploadAvatar200Type
  Request: AvatarUploadAvatarMutationRequestType
  PathParams: AvatarUploadAvatarPathParamsType
  Errors: any
}