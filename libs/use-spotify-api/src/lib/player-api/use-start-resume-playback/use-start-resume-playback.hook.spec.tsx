import TestComponent from "../../../test-utils/test-component";
import {
  mockSuccessfulApiPutRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";
import { render } from "@testing-library/react";
import {
  StartResumePlaybackParams,
  useStartResumePlayback,
} from "./use-start-resume-playback.hook";

const Component = ({ configs }: { configs: StartResumePlaybackParams }) => {
  const [request, data] = useStartResumePlayback<any>();
  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useStartResumePlayback", () => {
  it("should return results if request was successful", async () => {
    const token = "MY_TOKEN";

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiPutRequest({
      content: { data: "DATA" },
      error: null,
    });

    const { findByTestId } = render(
      <Component
        configs={{
          deviceId: "XYZ",
          contextUri: "CONTEXT_URI",
          uris: ["URI"],
          positionMs: 1000,
          offsetPosition: 2,
        }}
      />
    );

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "https://api.spotify.com/v1/me/player/play&device_id=XYZ",
  "MY_TOKEN",
  Object {
    "context_uri": "CONTEXT_URI",
    "offset": Object {
      "position": 2,
    },
    "position_ms": 1000,
    "uris": Array [
      "URI",
    ],
  },
]
`);
    await findByTestId("content");
  });
});
