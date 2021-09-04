# rest-utils

Sample rest utils library based on Axios.js works on both frontend and backend, this also provide an easy interface to abort pending request.

## How to use

```
npm i --save synle/rest-utils
npm i --saveDev typescript @types/node
```

### Define the API

#### UserApi.ts

Note that here I make it static, but you can instantiate and use it normally like other classes.

```
import { makeRestApi, RestApiResponse } from 'rest-utils';

export interface UserAgentResponse {
  "user-agent": string
}

export class UserApi {
  static getUserAgent(): RestApiResponse<UserAgentResponse> {
    return makeRestApi('https://httpbin.org/user-agent');
  }
}
```

#### Using that API

```
import UserApi from 'UserApi';

// sample do work routine
(async () => {
  // make the call to get the data
  const userAgentResponse = UserApi.getUserAgent();

  // wait for it
  try {
    const userAgent = await userAgentResponse.promise;

    // userAgent is of AxiosResponse => should have all the data
    // like `data`, `headers`, etc...
    console.log('SUCCESS: ', userAgent.data);
  } catch (err) {
    console.log('ERROR: ', err);
  }
})();
```
