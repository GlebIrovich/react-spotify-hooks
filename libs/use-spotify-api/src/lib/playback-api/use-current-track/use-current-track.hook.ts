import { ApiHookReturnType, SpotifyResponse } from "../../../types";
import { useCallback, useRef, useState } from "react";
import { useSpotifyState } from "../../context/spotify.context";
import { apiGetRequest } from "../../helpers/spotify.api";
import { SPOTIFY_API_BASE } from "../../../constants";

export interface CurrentTrackParams {
  market?: string;
  additionalTypes?: ("track" | "episode")[];
}

export function useCurrentTrack<Data = unknown>(): [
  (props: CurrentTrackParams) => void,
  ApiHookReturnType<Data>
] {
  const [loading, setLoading] = useState(false);
  const response = useRef<SpotifyResponse<Data>>({
    content: null,
    error: null,
  });
  const { tokenData } = useSpotifyState();
  const token = tokenData?.token || null;

  const lazyRequest = useCallback(
    (props: CurrentTrackParams) => {
      if (!token) {
        console.warn("useCurrentTrack: Spotify token is missing");
        return;
      }

      const url = propsToUrl(props);
      setLoading(true);
      apiGetRequest<Data>(url, token)
        .then((apiResponse) => (response.current = apiResponse))
        .finally(() => setLoading(false));
    },
    [token]
  );

  return [lazyRequest, { ...response.current, loading }];
}

function propsToUrl(props: CurrentTrackParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player/currently-playing`;

  url += `?market=${props.market || "from_token"}`;

  if (props.additionalTypes) {
    url += `&additional_types=${props.additionalTypes.join(",")}`;
  }

  return url;
}
