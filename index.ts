import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const CancelToken = axios.CancelToken;

export interface RestApiResponse<T> {
  promise: Promise<AxiosResponse<T>>;
  abort: (message: string) => void;
}

/**
 * This will make the API calls, and also return an object that we can tap
 * on to abort the pending request
 */
export const makeRestApi = <T>(
  url: string,
  options: AxiosRequestConfig = {},
): RestApiResponse<T> => {
  // append the cancelation token
  const source = CancelToken.source();
  options.cancelToken = source.token;
  options.method = options.method || 'get';
  options.url = url;
  const promise = axios.request<T>(options);
  const abort = (abortMsg: string): void => {
    source.cancel(abortMsg);
  };
  return { promise, abort };
};
