import { render } from "@testing-library/react";
import TestComponent from "../../test-utils/test-component";
import {
  mockSuccessfulApiGetRequest,
  mockSuccessfulApiPostRequest,
  mockUseSpotifyState,
} from "../../test-utils/spy";
import { useSpotifyApiBase } from "../helpers/use-spotify-api-base.hook";

interface TestComponentProps {
  url: string;
  method: "GET" | "POST";
  body?: any;
}

const Component = ({ url, body, method }: TestComponentProps) => {
  const [request, data] = useSpotifyApiBase<any>(method, body);
  return <TestComponent request={() => request(url)} data={data} />;
};

describe("useCurrentTrack", () => {
  it("should do nothing if token is not provided", () => {
    mockUseSpotifyState({ tokenData: undefined } as any);

    const { container } = render(<Component url={""} method={"GET"} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it("should return results if GET request was successful", async () => {
    const token = "MY_TOKEN";
    const URL = "MY_URL";

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiGetRequest({
      content: { data: "DATA" },
      error: null,
    });

    const { container, findByTestId } = render(
      <Component url={URL} method={"GET"} />
    );

    expect(fetchMock).toBeCalledWith(URL, token);
    await findByTestId("content");

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="content"
  >
    {"data":"DATA"}
  </div>
</div>
`);
  });

  it("should return error if GET request was not successful", async () => {
    const token = "MY_TOKEN";
    const URL = "MY_URL";

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiGetRequest({
      content: null,
      error: { reason: "ERROR" },
    });

    const { container, findByTestId } = render(
      <Component url={URL} method={"GET"} />
    );

    expect(fetchMock).toBeCalledWith(URL, token);
    await findByTestId("error");

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="error"
  >
    {"reason":"ERROR"}
  </div>
</div>
`);
  });

  it("should return results if POST request was successful", async () => {
    const token = "MY_TOKEN";
    const URL = "MY_URL";
    const body = { data: "some data" };

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiPostRequest({
      content: { data: "DATA" },
      error: null,
    });

    const { container, findByTestId } = render(
      <Component url={URL} method={"POST"} body={body} />
    );

    expect(fetchMock).toBeCalledWith(URL, token, body);
    await findByTestId("content");

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="content"
  >
    {"data":"DATA"}
  </div>
</div>
`);
  });

  it("should return results if POST request was not successful", async () => {
    const token = "MY_TOKEN";
    const URL = "MY_URL";
    const body = { data: "some data" };

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiPostRequest({
      content: null,
      error: { reason: "ERROR" },
    });

    const { container, findByTestId } = render(
      <Component url={URL} method={"POST"} body={body} />
    );

    expect(fetchMock).toBeCalledWith(URL, token, body);
    await findByTestId("error");

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    data-testid="error"
  >
    {"reason":"ERROR"}
  </div>
</div>
`);
  });
});
