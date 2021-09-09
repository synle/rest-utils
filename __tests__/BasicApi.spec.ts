import { BasicApi } from './BasicApi';

describe('BasicApi', () => {
  it('Should work for doGet', async () => {
    const response = BasicApi.doGet({
      someName1: 'someValue1',
      someName2: 'someValue2',
    });

    // wait for it
    const resp = await response.promise;
    expect(resp.config.method).toBe('get');
    expect(resp.config.url).toBe('https://httpbin.org/get?someName1=someValue1&someName2=someValue2');
    expect(resp.status).toBe(200);
    expect(resp.statusText).toBe('OK');
    expect(resp.data.args).toStrictEqual({
      someName1: 'someValue1',
      someName2: 'someValue2',
    });
  });

  it('Should work for doPost', async () => {
    const response = BasicApi.doPost({
      someName1: 'someValue1',
      someName2: 'someValue2',
    });

    // wait for it
    const resp = await response.promise;
    expect(resp.config.method).toBe('post');
    expect(resp.config.url).toBe('https://httpbin.org/post');
    expect(resp.status).toBe(200);
    expect(resp.statusText).toBe('OK');
    expect(resp.data.data).toBe(JSON.stringify({ someName1: 'someValue1', someName2: 'someValue2' }));
  });

  it('Should work for doPost', async () => {
    const response = BasicApi.doAuthenticatedCall('YWFhOmJiYg==');

    // wait for it
    const resp = await response.promise;
    expect(resp.config.method).toBe('get');
    expect(resp.config.url).toBe('https://httpbin.org/basic-auth/aaa/bbb');
    expect(resp.status).toBe(200);
    expect(resp.statusText).toBe('OK');
    expect(resp.data.authenticated).toBe(true);
    expect(resp.data.user).toBe('aaa');
  });
});
