import { makeRestApi, RestApiResponse } from "synle-rest-utils";

interface UserAgentResponse {
  "user-agent": string;
}

export class UserAgentApi {
  static getUserAgent(): RestApiResponse<UserAgentResponse> {
    return makeRestApi("https://httpbin.org/user-agent");
  }
}
