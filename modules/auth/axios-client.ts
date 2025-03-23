import client from '@kubb/plugin-client/clients/axios';
import { axiosInstance } from '@kubb/plugin-client/clients/axios';
export type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios';

//client.setConfig({baseURL:'http://188.225.18.179:3000'})

//axiosInstance.defaults.baseURL = 'http://188.225.18.179:3000';
console.log('API URL:', process.env.NEXT_PUBLIC_API);
axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axiosInstance.defaults.withCredentials = true; // Включаем передачу куки для CORS запросов

export default client;

export { axiosInstance };
