import { AuthUser } from './next-jwt-auth';

import { JWTAuthConfig, createJWTAuthProvider } from './next-jwt-auth';
import { useContext } from 'react';
import { AuthUserDataDtoType, CabinetShortDataDtoType } from '@/kubb-gen';

export interface LoggedInUser extends AuthUser, AuthUserDataDtoType {}

export const authConfig: JWTAuthConfig = {
  apiBaseUrl: '',
  user: {
    /**
     * This is the property name in the response
     * where your user object is located
     */
    property: 'user',
  },
  accessToken: {
    /**
     * This is the property name in the response
     * where your access token string is located
     */
    property: 'token',
    /**
     * Access token Expiry time is optional.
     * If no expiry time found, then access token
     * will automatically expire when there is an
     * Unathorized response (http status code 401) found
     * from your API service
     */
    //expireTimeProperty: 'access.expiresAt', // optional
  },
  /**
   * Refresh token configuration is optional.
   * You can skip it if your backend API only gives access token in login response.
   * If refresh token configuration is undefined then
   * this library won't try to call refresh token API
   * and will automatically logout the user once the access token is expired
   */
  /*  refreshToken: {
        /!**
         * This is the property name in the response
         * where your access token string is located
         *!/
        property: 'refresh.token',
        /!**
         * Refresh token Expiry time is optional.
         * If no expiry time found, then refresh token
         * will automatically expire when the library
         * can't get a new access token using the refresh token anymore
         *!/
        expireTimeProperty: 'refresh.expiresAt', // optional
    },*/
  /**
   * Here are the API endpoints that your custom Auth service exposes
   */
  endpoints: {
    login: { url: '/auth/verify-code', method: 'post' },
    logout: { url: '/auth/signout', method: 'post' },
    /**
     * (Optional)
     * You can skip 'refresh' property if your backend has no token refreshing mechanism
     */
    //refresh: { url: '/auth/refresh-token', method: 'post' },
    /**
     * (Optional)
     * You can skip 'refresh' property if your backend has no user profile fetch API
     */
    user: { url: '/users/me', method: 'get' },
  },
  /**
   * This is the NextJS route for your login page.
   * This library will automatically redirect
   * user to this page when user session is expired.
   *
   * i.e refresh token is also expired and user needs to login again
   */
  pages: {
    login: { url: '/login' },
  },

  /**
   * (Optional)
   * This is the HTTP status code which is returned by the server whenever the access token is expired
   * Default is: 401
   */
  unauthorizedStatusCode: 401,

  /**
   * (Optional)
   * User profile fetch API call interval in millisecond.
   * For example: If this interval is set to 5000,
   * then this library will call the user profile fetch API after every 5000 milliseconds.
   *
   * This API call will be used to determine if the access token is still valid.
   * If the access token is expired, then the server will return an unauthorized
   * response and this library will logout the user from the app.
   */
  //userFetchIntervalMS: 1000,
};

/**
 * Next, we create the React Context and Context Provider
 * using our own User type.
 *
 * The reason why you need to create the context is because,
 * you need to tell the User type to the library.
 *
 * Otherwise the library cannot infer the User type
 * (will explain later below)
 */
export const { JWTAuthContext, JWTAuthProvider } = createJWTAuthProvider<LoggedInUser>();

/**
 * (Optional)
 * This is just a custom hook to easily access the JWTAuthContext.
 * You can skip this and use useContext(JWTAuthContext)
 * in your component, but this approach is more clean.
 */
export const useJWTAuthContext = () => {
  const context = useContext(JWTAuthContext);

  if (!context) {
    throw new Error('JWTAuthContext not found, please check the provider');
  }

  return context;
};

export const useJWTAuthUser = (): LoggedInUser & { cabinetActive: CabinetShortDataDtoType } => {
  const { user } = useJWTAuthContext();

  if (!user) {
    throw new Error('JWTAuthUser not found, please check the provider');
  }

  const cabinetActive = user?.cabinets?.find((i) => i.isActive) ?? ({} as CabinetShortDataDtoType);

  return { ...user, cabinetActive };
};
