import { makeRestApi, RestApiResponse } from "synle-rest-utils";

interface CookieResponse {
  cookies: Record<string | number, string | number>;
}

export class PathParamApi {
  static setCookie(
    cookieName: string,
    cookieValue: string
  ): RestApiResponse<CookieResponse> {
    return makeRestApi(
      `https://httpbin.org/cookies/set?${cookieName}=${cookieValue}`
    );
  }
}
