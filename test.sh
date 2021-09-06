rm -rf test

mkdir -p test

pushd test

echo '''
{
  "name": "test-rest-utils",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npx ts-node index.ts"
  },
  "author": "Sy Le",
  "license": "ISC",
  "dependencies": {}
}
''' > package.json

echo """
import { makeRestApi, RestApiResponse } from 'synle-rest-utils';

interface UserAgentResponse {
  'user-agent': string
}

class UserApi {
  static getUserAgent(): RestApiResponse<UserAgentResponse> {
    return makeRestApi('https://httpbin.org/user-agent');
  }
}

// sample do work routine
(async () => {
  // make the call to get the data
  const userAgentResponse = UserApi.getUserAgent();

  // wait for it
  try {
    const userAgent = await userAgentResponse.promise;

    // userAgent is of AxiosResponse => should have all the data
    // like data, headers, etc...
    console.log('SUCCESS: ', userAgent.data);
  } catch (err) {
    console.log('ERROR: ', err);
  }
})();
""" > index.ts

npm i --save synle-rest-utils
npm i --saveDev typescript @types/node
npm start

popd
