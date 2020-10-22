# rest-utils
Sample rest utils library based on Axios.js works on both frontend and backend, this also provide an easy interface to abort pending request.


## TODO:
make this a librrary

## How to use

### Define the API

#### YammerAuthApi.ts
```
import { makeRestApi, getRestClient, RestApiResponse, MakeRestApiFunc } from 'synle/rest-utils';

// ... define YAMMER_CONFIGS somewhere

export class YammerAuthApi {
  static getAccessToken(code: string): RestApiResponse<YammerUserProfileResponse> {
    const url = `${BASE_YAMMER_FEED_URL}/oauth2/access_token`;

    return makeRestApi(url, {
      method: 'POST',
      data: {
        client_id: YAMMER_CONFIGS.APP_ID,
        client_secret: YAMMER_CONFIGS.APP_SECRET,
        code,
        grant_type: 'authorization_code',
      },
    });
  }
}
```

#### index.ts
```
import {YammerAuthApi} from './YammerAuthApi';


// one-liner
async function getAccessToken(code){
   (await YammerAuthApi.getAccessToken(code).promise).data
}

// or set up the promise for abort
const api = YammerAuthApi.getAccessToken(code);
api.promise.then(res => console.log(res.data));

// to abort it
api.abort();
```
