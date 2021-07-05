import { ApiHookReturnType } from "../../../types";
import { useCallback } from "react";
import { SPOTIFY_API_BASE } from "../../../constants";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";

export interface CurrentTrackParams {
  market?: string;
  additionalTypes?: ("track" | "episode")[];
}

export function useCurrentTrack<Data = unknown>(): [
  (props: CurrentTrackParams) => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("GET");

  const request = useCallback(
    (props: CurrentTrackParams) => baseRequest(propsToUrl(props)),
    [baseRequest]
  );

  return [request, state];
}

function propsToUrl(props: CurrentTrackParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player/currently-playing`;

  url += `?market=${props.market || "from_token"}`;

  if (props.additionalTypes) {
    url += `&additional_types=${props.additionalTypes.join(",")}`;
  }

  return url;
}
