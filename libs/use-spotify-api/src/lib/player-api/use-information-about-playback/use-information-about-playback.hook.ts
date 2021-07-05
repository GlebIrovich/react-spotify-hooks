import { ApiHookReturnType } from "../../../types";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";
import { useCallback } from "react";
import { SPOTIFY_API_BASE } from "../../../constants";

export interface InformationAboutPlaybackParams {
  market?: string;
  additionalTypes?: ("track" | "episode")[];
}
export function useInformationAboutPlayback<Data = unknown>(): [
  (props: InformationAboutPlaybackParams) => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("GET");

  const request = useCallback(
    (props: InformationAboutPlaybackParams) => baseRequest(propsToUrl(props)),
    [baseRequest]
  );

  return [request, state];
}

function propsToUrl(props: InformationAboutPlaybackParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player`;

  url += `?market=${props.market || "from_token"}`;

  if (props.additionalTypes) {
    url += `&additional_types=${props.additionalTypes.join(",")}`;
  }

  return url;
}
