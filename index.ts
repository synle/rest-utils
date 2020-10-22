import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic, AxiosInstance } from 'axios';
import tough from 'tough-cookie';

const CancelToken = axios.CancelToken;

const Cookie = tough.Cookie;

export interface RestApiResponse<T> {
  promise: Promise<AxiosResponse<T>>;
  abort: Function;
}

export interface RestClient {
  makeRestApi: Function;
}

/**
 * This will make the API calls, and also return an object that we can tap
 * on to abort the pending request
 */
export const makeRestApi = <T>(
  url: string,
  options: AxiosRequestConfig = {},
  axiosInstance: AxiosInstance | AxiosStatic = axios,
): RestApiResponse<T> => {
  // append the cancelation token
  const source = CancelToken.source();
  const abort = (abortMsg: string) => {
    source.cancel(abortMsg);
  };

  options.cancelToken = source.token;
  options.method = options.method || 'GET';
  options.url = url;

//   // TODO: remove this log line
//   const promise = axiosInstance(options);
//   promise.then(
//     (res) => console.log('  > [SUCCESS] API', options.method, url, res.status, res.statusText),
//     (res) =>
//       console.log(
//         '  > [ERROR] API',
//         options.method,
//         url,
//         res.response && res.response.status + ' ' + res.response.statusText,
//       ),
//   );

  return { promise, abort };
};

export type MakeRestApiFunc = <T>(url: string, options: AxiosRequestConfig) => RestApiResponse<T>;

export const getRestClient = (auth: string, configs: any = {}): MakeRestApiFunc => {
  const instance = axios.create(configs);
  instance.defaults.headers.common['Authorization'] = auth;

  return <T>(url: string, options: AxiosRequestConfig = {}): RestApiResponse<T> => {
    return makeRestApi(url, options, instance);
  };
};

export const getRestClientWithStickyCookies = (auth: string, configs: any = {}): MakeRestApiFunc => {
  const instance = axios.create(configs);
  instance.defaults.headers.common['Authorization'] = auth;

  const cookiejar = [];

  // pass in the cookie
  instance.interceptors.request.use(function (config) {
    config.headers.cookie = cookiejar.map((cookie) => `${cookie.key}=${cookie.value}`).join('; ');
    return config;
  });

  // set the cookie
  instance.interceptors.response.use(function (response) {
    if (response.headers['set-cookie'] instanceof Array) {
      response.headers['set-cookie'].forEach(function (c) {
        const parsedCookies = Cookie.parse(c);
        if (parsedCookies.value) {
          cookiejar.push({
            key: parsedCookies.key,
            value: parsedCookies.value,
            url: parsedCookies.domain,
          });
        }
      });
    }
    return response;
  });

  return <T>(url: string, options: AxiosRequestConfig = {}): RestApiResponse<T> => {
    return makeRestApi(url, options, instance);
  };
};
