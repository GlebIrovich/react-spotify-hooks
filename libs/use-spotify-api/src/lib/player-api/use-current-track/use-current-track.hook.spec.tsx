import { CurrentTrackParams, useCurrentTrack } from "./use-current-track.hook";
import { render } from "@testing-library/react";
import TestComponent from "../../../test-utils/test-component";
import {
  mockSuccessfulApiGetRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";

const configs: CurrentTrackParams = {};

const Component = ({ configs }: { configs: CurrentTrackParams }) => {
  const [request, data] = useCurrentTrack<any>();
  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useCurrentTrack", () => {
  it("should do nothing if token is not provided", () => {
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
