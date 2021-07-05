import {
  mockSuccessfulApiPutRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";
import { render } from "@testing-library/react";
import TestComponent from "../../../test-utils/test-component";
import {
  TransferPlaybackParams,
  useTransferPlayback,
} from "./use-transfer-playback.hook";

const Component = ({ configs }: { configs: TransferPlaybackParams }) => {
  const [request, data] = useTransferPlayback<any>();
  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useTransferPlayback", () => {
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
          play: true,
        }}
      />
    );

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "https://api.spotify.com/v1/me/player",
  "MY_TOKEN",
  Object {
    "device_ids": Array [
      "XYZ",
    ],
    "play": true,
  },
]
`);
    await findByTestId("content");
  });
});
