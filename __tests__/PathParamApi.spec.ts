import { PathParamApi } from './PathParamApi';

describe('PathParamApi', () => {
  it('Should work for setCookie REST API', async () => {
    // make the call to get the data
    const cookieResponse = PathParamApi.setCookie('someName', 'someValue');

    // wait for it
    const cookie = await cookieResponse.promise;
    expect(cookie.config.url).toBe('https://httpbin.org/cookies/set?someName=someValue');
    expect(cookie.status).toBe(200);
    expect(cookie.statusText).toBe('OK');
    expect(cookie.data['cookies']).toBeDefined();
  });
});
