import { apiGetRequest } from "./spotify.api";

const responseMock = (data: any, isOk: boolean): Response =>
  ({ json: async () => data, ok: isOk } as Response);

describe("apiGetRequest", () => {
  it("should return content if request was successful", async () => {
    (global.fetch as any) = jest
      .fn()
      .mockResolvedValue(responseMock({ data: "DATA" }, true));
    expect(await apiGetRequest("", "")).toMatchInlineSnapshot(`
Object {
  "content": Object {
    "data": "DATA",
  },
  "error": null,
}
`);
  });

  it("should return error if request was not successful", async () => {
    (global.fetch as any) = jest
      .fn()
      .mockResolvedValue(responseMock({ error: "ERROR" }, false));
    expect(await apiGetRequest("", "")).toMatchInlineSnapshot(`
Object {
  "content": null,
  "error": "ERROR",
}
`);
  });

  it("should return error if request was not successful and there is no error key in the response", async () => {
    (global.fetch as any) = jest
      .fn()
      .mockResolvedValue(responseMock("THIS WAS A BIG MISTAKE", false));
    expect(await apiGetRequest("", "")).toMatchInlineSnapshot(`
Object {
  "content": null,
  "error": "THIS WAS A BIG MISTAKE",
}
`);
  });

  it("should return error if there was runtime error", async () => {
    (global.fetch as any) = jest.fn().mockResolvedValue({
      json: async () => {
        throw new Error("BOOM");
      },
    } as any);
    expect(await apiGetRequest("", "")).toMatchInlineSnapshot(`
Object {
  "content": null,
  "error": [Error: BOOM],
}
`);
  });
});
