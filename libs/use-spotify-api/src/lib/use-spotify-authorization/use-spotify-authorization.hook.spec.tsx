import { useSpotifyAuthorization } from "use-spotify-api";
import { renderWithContext } from "../../test-utils/render-with-context";
import { screen } from "@testing-library/react";

const Component = () => {
  const authUrl = useSpotifyAuthorization();
  return <p data-testid="authUrl">{authUrl}</p>;
};

describe("useSpotifyAuthorization", () => {
  it("should generate correct auth url", async () => {
    const { testProps } = renderWithContext(<Component />, {
      tokenAutoDetect: false,
    });
    const actualAuthUrl = (await screen.findByTestId("authUrl")).innerHTML;

    expect(actualAuthUrl).toContain(`client_id=${testProps.configs.clientId}`);
    expect(actualAuthUrl).toContain(
      `scope=${testProps.configs.scopes?.join("+")}`
    );
    expect(actualAuthUrl).toContain(
      `redirect_uri=${testProps.configs.redirectUri}`
    );
  });

  it("should generate correct auth url when scope is missing", async () => {
    renderWithContext(<Component />, {
      tokenAutoDetect: false,
      configs: {
        scopes: undefined,
      } as any,
    });
    const actualAuthUrl = (await screen.findByTestId("authUrl")).innerHTML;

    expect(actualAuthUrl).not.toContain(`scope`);
  });
});
