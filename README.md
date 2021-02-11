# rest-utils
Sample rest utils library based on Axios.js works on both frontend and backend, this also provide an easy interface to abort pending request.


## TODO:
make this a librrary

## How to use

### Define the API

#### UserApi.ts
```
import { makeRestApi, RestApiResponse } from 'synle/RestUtils';

export interface UserProfileResponse {
  id: string;
  email: string;
  mobilePhone: string;
  givenName: string;
  displayName: string;
}

export default class UserApi {
  static getUserProfile(): RestApiResponse<UserProfileResponse> {
    return makeRestApi('/api/me');
  }
}
```
