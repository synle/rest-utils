import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';
const CancelToken = axios.CancelToken;

export interface RestApiResponse<T> {
  promise: Promise<AxiosResponse<T>>;
  abort: (message: string) => void;
}

export interface RestApiConfig extends AxiosRequestConfig {
  shouldCacheApi?: boolean;
}

/**
 * interval in which cache will be cleaned
 */
const CACHE_CLEANUP_INTERVAL = 15 * 60000; // 15 mins

/**
 * this is an in memory cache used for the frontend
 */
const apiCache: Record<string, RestApiResponse<unknown>> = {};

/**
 * This will make the API calls, and also return an object that we can tap
 * on to abort the pending request
 */
export const makeRestApi = <T>(
  url: string,
  options: RestApiConfig = {},
  axiosIntance: AxiosInstance = axios,
): RestApiResponse<T> => {
  // append the cancelation token
  const source = CancelToken.source();
  const abort = (abortMsg: string): void => source.cancel(abortMsg);
  options.cancelToken = source.token;
  options.method = options.method || 'get';
  options.url = url;
  options.shouldCacheApi = !!options.shouldCacheApi;

  if (options.shouldCacheApi === true && options.method.toLowerCase() === 'get') {
    // only cache for GET call
    const cachedKey = `${url}.${JSON.stringify(options)}`;
    if (!apiCache[cachedKey]) {
      apiCache[cachedKey] = {
        promise: axiosIntance.request<T>(options),
        abort,
      };

      // set up timer to clean up cache after delay
      setTimeout(() => {
        delete apiCache[cachedKey];
      }, CACHE_CLEANUP_INTERVAL);
    }
    return apiCache[cachedKey] as RestApiResponse<T>;
  }

  return { promise: axiosIntance.request<T>(options), abort };
};

/**
 * register interceptor callback for success callback
 *
 * @param interceptorCallback
 */
export const registerResponseSuccessInterceptor = (
  interceptorCallback: (resp: AxiosResponse<any>) => Promise<any> | any,
) => {
  axios.interceptors.response.use(interceptorCallback);
};

/**
 * register interceptor callback for error callback
 *
 * @param interceptorCallback
 */
export const registerResponseErrorInterceptor = (
  interceptorCallback: (resp: AxiosError<any>) => Promise<any> | any,
) => {
  axios.interceptors.response.use(undefined, interceptorCallback);
};
