import TestComponent from "../../../test-utils/test-component";
import {
  mockSuccessfulApiGetRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";
import { render } from "@testing-library/react";
import {
  RecentlyPlayedTracksParams,
  useRecentlyPlayedTracks,
} from "./use-recently-played-tracks.hook";

const Component = ({ configs }: { configs: RecentlyPlayedTracksParams }) => {
  const [request, data] = useRecentlyPlayedTracks<any>();
  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useRecentlyPlayedTracks", () => {
  it("should return results if request was successful", async () => {
    const token = "MY_TOKEN";

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiGetRequest({
      content: { data: "DATA" },
      error: null,
    });

    const { findByTestId } = render(
      <Component
        configs={{
          limit: 1000,
          after: 200,
          before: 200,
        }}
      />
    );

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "https://api.spotify.com/v1/me/player/recently-played?limit=1000&after=200&before=200",
  "MY_TOKEN",
]
`);
    await findByTestId("content");
  });
});
