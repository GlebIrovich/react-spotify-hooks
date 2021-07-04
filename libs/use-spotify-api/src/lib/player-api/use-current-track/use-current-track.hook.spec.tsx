import { CurrentTrackParams, useCurrentTrack } from "./use-current-track.hook";
import { useEffect } from "react";
import * as context from "../../context/spotify.context";
import * as apiHelpers from "../../helpers/spotify.api";
import { render } from "@testing-library/react";

const configs: CurrentTrackParams = {};

const Component = ({ configs }: { configs: CurrentTrackParams }) => {
  const [search, { error, content, loading }] = useCurrentTrack<any>();

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

describe("useCurrentTrack", () => {
  it("should do nothing if token is not provided", () => {
    jest.spyOn(console, "warn").mockReturnValue();
    jest
      .spyOn(context, "useSpotifyState")
      .mockReturnValue({ tokenData: undefined } as any);
    const { container } = render(<Component configs={configs} />);
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
    const { container, findByTestId } = render(
      <Component
        configs={{
          ...configs,
          market: "from_token",
          additionalTypes: ["track", "episode"],
        }}
      />
    );

    const expectedUrl =
      "https://api.spotify.com/v1/me/player/currently-playing?market=from_token&additional_types=track,episode";

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
