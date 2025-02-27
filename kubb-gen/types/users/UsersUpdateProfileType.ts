import type { UpdateProfileDtoType } from '../UpdateProfileDtoType';
import type { UserType } from '../UserType';

/**
 * @description Профиль успешно обновлен
 */
export type UsersUpdateProfile200Type = UserType;

/**
 * @description Пользователь не найден
 */
export type UsersUpdateProfile404Type = any;

export type UsersUpdateProfileMutationRequestType = UpdateProfileDtoType;

export type UsersUpdateProfileMutationResponseType = UsersUpdateProfile200Type;

export type UsersUpdateProfileTypeMutation = {
  Response: UsersUpdateProfile200Type;
  Request: UsersUpdateProfileMutationRequestType;
  Errors: UsersUpdateProfile404Type;
};
