import qs from "qs";
import { makeRestApi, RestApiResponse } from "synle-rest-utils";

interface BasicApiResponse {
  args: Record<string | number, string | number>;
  data: Record<string | number, string | number>;
  files: Record<string | number, string | number>;
  form: Record<string | number, string | number>;
  headers: Record<string | number, string | number>;
  json: Record<string | number, string | number>;
  url: string;
}

interface AuthenticatedResponse {
  authenticated: boolean;
  user: string;
}

export class BasicApi {
  static doGet(data: any): RestApiResponse<BasicApiResponse> {
    return makeRestApi(`https://httpbin.org/get?${qs.stringify(data)}`);
  }

  static doPost(data: any): RestApiResponse<BasicApiResponse> {
    return makeRestApi(`https://httpbin.org/post`, {
      method: "POST",
      data: data,
    });
  }

  static doAuthenticatedCall(
    userPasswordHash: string
  ): RestApiResponse<AuthenticatedResponse> {
    return makeRestApi(`https://httpbin.org/basic-auth/aaa/bbb`, {
      method: "GET",
      headers: {
        authorization: `Basic ${userPasswordHash}`,
      },
    });
  }
}
