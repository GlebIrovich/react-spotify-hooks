import { renderWithContext } from "../../test-utils/render-with-context";
import { screen } from "@testing-library/react";
import { useSpotifyAuthorization } from "./use-spotify-authorization.hook";

const SCOPES = ["SCOPE_1", "SCOPE_2"];
const STATE = "random_string";
const CLIENT_ID = "MY_CLIENT_ID";
const REDIRECT_URI = "REDIRECT_URI";

const Component = () => {
  const authUrl = useSpotifyAuthorization({
    scopes: SCOPES,
    state: STATE,
    showDialog: true,
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
  });
  return <p data-testid="authUrl">{authUrl}</p>;
};

describe("useSpotifyAuthorization", () => {
  it("should generate correct auth url", async () => {
    renderWithContext(<Component />);
    const actualAuthUrl = (await screen.findByTestId("authUrl")).innerHTML;

    expect(actualAuthUrl).toContain(`client_id=${CLIENT_ID}`);
    expect(actualAuthUrl).toContain(`state=${STATE}`);
    expect(actualAuthUrl).toContain(`show_dialog=true`);
    expect(actualAuthUrl).toContain(`scope=${SCOPES.join("+")}`);
    expect(actualAuthUrl).toContain(`redirect_uri=${REDIRECT_URI}`);
  });
});
