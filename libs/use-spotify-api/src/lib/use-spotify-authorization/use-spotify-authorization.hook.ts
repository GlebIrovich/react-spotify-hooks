import { SpotifyConfigs, useSpotifyState } from "../context/spotify.context";
import { SPOTIFY_ACCOUNT_BASE } from "../../constants";

interface AuthorizationConfigs {
  client_id: string;
  response_type: string;
  redirect_uri: string;
  state?: string;
  scope?: string;
  show_dialog?: boolean;
}

export function useSpotifyAuthorization() {
  const { configs } = useSpotifyState();

  return generateAuthUrl(configs);
}

function generateAuthUrl(configs: SpotifyConfigs) {
  const authConfigs = generateConfigs(configs);
  const params = new URLSearchParams(Object.entries(authConfigs));

  return `${SPOTIFY_ACCOUNT_BASE}/authorize?${params.toString()}`;
}

function generateConfigs(configs: SpotifyConfigs): AuthorizationConfigs {
  return {
    client_id: configs.clientId,
    response_type: "token",
    redirect_uri: configs.redirectUri,
    ...(configs.scopes ? { scope: configs.scopes.join(" ") } : {}),
  };
}