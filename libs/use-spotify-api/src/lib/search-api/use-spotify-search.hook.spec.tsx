import { SearchApiParams, useSpotifySearch } from "./use-spotify-search.hook";
import TestComponent from "../../test-utils/test-component";
import {
  mockSuccessfulApiGetRequest,
  mockUseSpotifyState,
} from "../../test-utils/spy";
import { render } from "@testing-library/react";

const configs: SearchApiParams = {
  types: ["album"],
  query: "QUERY",
};

const Component = ({ configs }: { configs: SearchApiParams }) => {
  const [request, data] = useSpotifySearch<any>();

  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useSpotifySearch", () => {
  it("should do nothing if token is not provided", () => {
    jest.spyOn(console, "warn").mockReturnValue();
    mockUseSpotifyState({ tokenData: undefined } as any);
    const { container } = render(<Component configs={configs} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it("should return results if request was successful", async () => {
    const token = "MY_TOKEN";
    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiGetRequest({
      content: { data: "DATA" },
      error: null,
    });
    const { container, findByTestId } = render(
      <Component
        configs={{
          ...configs,
          market: "from_token",
          includeExternal: true,
          limit: 10,
          offset: 10,
        }}
      />
    );

    const expectedUrl =
      "https://api.spotify.com/v1/search?q=QUERY&type=album&market=from_token&limit=10&offset=10&include_external=true";
    expect(fetchMock).toBeCalledWith(expectedUrl, token);
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
});
