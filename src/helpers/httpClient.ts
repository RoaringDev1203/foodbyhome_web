import { authSessionKey } from '@/common/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from "cookies-next";



const MAX_RETRIES = 3; // Maximum number of retries for a request

// Assuming you have a function to retrieve the bearer token
function getBearerToken(): string {
  const tokens = JSON.parse(getCookie(authSessionKey) ?? '{}')
  return tokens.access_token
}

function HttpClient() {
  const token = getBearerToken();
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const makeRequest = async (
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    url: string,
    data: any = null,
    config: AxiosRequestConfig = {},
    retries: number = MAX_RETRIES
  ): Promise<AxiosResponse<any>> => {
    try {
      const response = await axios({ method, url, data, ...config, headers });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 500 && retries > 0) {
        console.warn(`Request failed with status 500. Retrying... (${retries} retries left)`);
        return makeRequest(method, url, data, config, retries - 1);
      } else {
        throw error;
      }
    }
  };

  return {
    get: (url: any, config = {}) => makeRequest('get', url, null, config),
    post: (url: any, data: any | undefined, config = {}) => makeRequest('post', url, data, config),
    patch: (url: any, data: any | undefined, config = {}) => makeRequest('patch', url, data, config),
    put: (url: any, data: any | undefined, config = {}) => makeRequest('put', url, data, config),
    delete: (url: any, config = {}) => makeRequest('delete', url, null, config),
  };
}

export default HttpClient();