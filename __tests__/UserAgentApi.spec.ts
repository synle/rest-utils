import { UserAgentApi } from "./UserAgentApi";

describe("UserAgentApi", () => {
  it("Should work for basic test", async () => {
    // make the call to get the data
    const userAgentResponse = UserAgentApi.getUserAgent();

    // wait for it
    const userAgent = await userAgentResponse.promise;
    expect(userAgent.status).toBe(200);
    expect(userAgent.statusText).toBe("OK");
    expect(userAgent.data["user-agent"]).toContain("axios/");
  });
});
