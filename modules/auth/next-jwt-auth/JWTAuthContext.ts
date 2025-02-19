'use client';
import { createContext } from 'react';
import { JWTAuthController } from './JWTAuthController';
import { AxiosInstance } from 'axios';
import { AuthUserDataDtoType } from '@/kubb-gen';

type APIEndpoint = {
  url: string;
  method: 'get' | 'post';
};

type AppEndpoint = Pick<APIEndpoint, 'url'>;

type ResponsePropertyDescriptor = {
  property: string;
};

type TokenPropertyDescriptor = ResponsePropertyDescriptor & {
  expireTimeProperty?: string;
};

export type JWTAuthConfig = {
  apiBaseUrl: string;
  accessToken: TokenPropertyDescriptor;
  refreshToken?: TokenPropertyDescriptor;
  user: ResponsePropertyDescriptor;
  endpoints: {
    login: APIEndpoint;
    logout: APIEndpoint;
    refresh?: APIEndpoint;
    user?: APIEndpoint;
  };
  pages: {
    login: AppEndpoint;
  };
  unauthorizedStatusCode?: number;
  userFetchIntervalMS?: number;
};

export interface AuthUser extends AuthUserDataDtoType {}

export type TokenData = {
  token: string;
  expiresAt: string;
};

export type JWTAuthContextValue<UserProps extends AuthUser = AuthUser> = {
  controller: JWTAuthController;
  isLoggedIn: boolean | null;
  user: UserProps;
  apiClient: () => AxiosInstance;
  loginWithCredentials: (data: Record<string, any>) => Promise<UserProps>;
  loginWithResponse: (data: Record<string, any>) => Promise<boolean>;
  logout: (data?: Record<string, any>) => Promise<boolean>;
  fetchUser: () => Promise<void>;
  onRefreshToken: () => Promise<void>;
  onError: (error: any) => void;
};

export const createJWTAuthContext = <UserProps extends AuthUser>() =>
  createContext<JWTAuthContextValue<UserProps> | undefined>(undefined);
