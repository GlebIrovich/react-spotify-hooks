import { render } from "@testing-library/react";
import TestComponent from "../../../test-utils/test-component";
import {
  mockSuccessfulApiGetRequest,
  mockUseSpotifyState,
} from "../../../test-utils/spy";
import {
  InformationAboutPlaybackParams,
  useInformationAboutPlayback,
} from "./use-information-about-playback.hook";

const Component = ({
  configs,
}: {
  configs: InformationAboutPlaybackParams;
}) => {
  const [request, data] = useInformationAboutPlayback<any>();
  return <TestComponent request={() => request(configs)} data={data} />;
};

describe("useInformationAboutPlayback", () => {
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
          market: "from_token",
          additionalTypes: ["track", "episode"],
        }}
      />
    );

    const expectedUrl =
      "https://api.spotify.com/v1/me/player?market=from_token&additional_types=track,episode";

    expect(fetchMock).toBeCalledWith(expectedUrl, token);
    await findByTestId("content");
  });
});
