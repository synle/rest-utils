"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerResponseErrorInterceptor = exports.registerResponseSuccessInterceptor = exports.makeRestApi = void 0;
const axios_1 = require("axios");
const CancelToken = axios_1.default.CancelToken;
/**
 * interval in which cache will be cleaned
 */
const CACHE_CLEANUP_INTERVAL = 15 * 60000; // 15 mins
/**
 * this is an in memory cache used for the frontend
 */
const apiCache = {};
/**
 * This will make the API calls, and also return an object that we can tap
 * on to abort the pending request
 */
const makeRestApi = (url, options = {}, axiosIntance = axios_1.default) => {
    // append the cancelation token
    const source = CancelToken.source();
    const abort = (abortMsg) => source.cancel(abortMsg);
    options.cancelToken = source.token;
    options.method = options.method || "get";
    options.url = url;
    options.shouldCacheApi = !!options.shouldCacheApi;
    if (options.shouldCacheApi === true &&
        options.method.toLowerCase() === "get") {
        // only cache for GET call
        const cachedKey = `${url}.${JSON.stringify(options)}`;
        if (!apiCache[cachedKey]) {
            apiCache[cachedKey] = {
                promise: axiosIntance.request(options),
                abort,
            };
            // set up timer to clean up cache after delay
            setTimeout(() => {
                delete apiCache[cachedKey];
            }, CACHE_CLEANUP_INTERVAL);
        }
        return apiCache[cachedKey];
    }
    return { promise: axiosIntance.request(options), abort };
};
exports.makeRestApi = makeRestApi;
/**
 * register interceptor callback for success callback
 *
 * @param interceptorCallback
 */
const registerResponseSuccessInterceptor = (interceptorCallback) => {
    axios_1.default.interceptors.response.use(interceptorCallback);
};
exports.registerResponseSuccessInterceptor = registerResponseSuccessInterceptor;
/**
 * register interceptor callback for error callback
 *
 * @param interceptorCallback
 */
const registerResponseErrorInterceptor = (interceptorCallback) => {
    axios_1.default.interceptors.response.use(undefined, interceptorCallback);
};
exports.registerResponseErrorInterceptor = registerResponseErrorInterceptor;
