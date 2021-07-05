import TestComponent from "../../../test-utils/test-component";
import {
  mockSuccessfulApiGetRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";
import { render } from "@testing-library/react";
import { useAvailableDevices } from "./use-available-devices.hook";

const Component = () => {
  const [request, data] = useAvailableDevices<any>();
  return <TestComponent request={() => request()} data={data} />;
};

describe("useAvailableDevices", () => {
  it("should return results if request was successful", async () => {
    const token = "MY_TOKEN";

    mockUseSpotifyState({ tokenData: { token } } as any);
    const fetchMock = mockSuccessfulApiGetRequest({
      content: { data: "DATA" },
      error: null,
    });

    const { findByTestId } = render(<Component />);

    expect(fetchMock.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "https://api.spotify.com/v1/me/player/devices",
  "MY_TOKEN",
]
`);
    await findByTestId("content");
  });
});
