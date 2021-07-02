import { SearchApiParams, useSpotifySearch } from "./use-spotify-search.hook";
import * as context from "../context/spotify.context";
import { useEffect } from "react";
import { renderWithContext } from "../../test-utils/render-with-context";
import * as apiHelpers from "../helpers/spotify.api";

const configs: SearchApiParams = {
  types: ["album"],
  query: "QUERY",
};

const Component = ({ configs }: { configs: SearchApiParams }) => {
  const [search, { error, content, loading }] = useSpotifySearch<any>();

  useEffect(() => search(configs), []);

  if (error) {
    return <div data-testid="error">{JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div data-testid="loading">{JSON.stringify(loading)}</div>;
  }

  if (content) {
    return <div data-testid="content">{JSON.stringify(content)}</div>;
  }

  return null;
};

describe("useSpotifySearch", () => {
  it("should do nothing if token is not provided", () => {
    jest.spyOn(console, "warn").mockReturnValue();
    jest
      .spyOn(context, "useSpotifyState")
      .mockReturnValue({ tokenData: undefined } as any);
    const {
      renderResult: { container },
    } = renderWithContext(<Component configs={configs} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it("should return results if request was successful", async () => {
    const token = "MY_TOKEN";
    jest
      .spyOn(context, "useSpotifyState")
      .mockReturnValue({ tokenData: { token } } as any);
    const fetchMock = jest
      .spyOn(apiHelpers, "apiGetRequest")
      .mockResolvedValue({ content: { data: "DATA" }, error: null });
    const {
      renderResult: { container, rerender, findByTestId },
    } = renderWithContext(<Component configs={configs} />);

    const expectedUrl1 = "https://api.spotify.com/v1/search?q=QUERY&type=album";
    expect(fetchMock).toBeCalledWith(expectedUrl1, token);
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

    rerender(
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

    const expectedUrl2 =
      "https://api.spotify.com/v1/search?q=QUERY&type=album&market=from_token&limit=10&offset=10&include_external=true";
    expect(fetchMock).toBeCalledWith(expectedUrl2, token);
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
