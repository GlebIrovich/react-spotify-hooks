import { SPOTIFY_ACCOUNT_BASE } from "../../constants";

interface AuthorizationConfigs {
  client_id: string;
  response_type: string;
  redirect_uri: string;
  state?: string;
  scope?: string;
  show_dialog?: boolean;
}

export interface AuthorizationParams {
  clientId: string;
  redirectUri: string;
  scopes?: string[];
  showDialog?: boolean;
  state?: string;
}

export function useSpotifyAuthorization(params: AuthorizationParams) {
  return generateAuthUrl(params);
}

function generateAuthUrl(params: AuthorizationParams) {
  const authConfigs = generateConfigs(params);
  const urlParams = new URLSearchParams(Object.entries(authConfigs));

  return `${SPOTIFY_ACCOUNT_BASE}/authorize?${urlParams.toString()}`;
}

function generateConfigs(params: AuthorizationParams): AuthorizationConfigs {
  return {
    client_id: params.clientId,
    response_type: "token",
    redirect_uri: params.redirectUri,
    ...(params.scopes ? { scope: params.scopes.join(" ") } : {}),
    ...(params.state ? { state: params.state } : {}),
    ...(params.showDialog ? { show_dialog: params.showDialog } : {}),
  };
}
