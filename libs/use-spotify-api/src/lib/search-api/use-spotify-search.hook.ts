import { SPOTIFY_API_BASE } from "../../constants";
import { useSpotifyState } from "../context/spotify.context";
import { useCallback, useRef, useState } from "react";
import { ApiHookReturnType, SpotifyResponse } from "../../types";
import { apiGetRequest } from "../helpers/spotify.api";

export interface SearchApiParams {
  query: string;
  types: ("album" | "artist" | "playlist" | "track" | "show" | "episode")[];
  market?: "from_token" | string;
  limit?: number;
  offset?: number;
  includeExternal?: boolean;
}

export function useSpotifySearch<Data = unknown>(): [
  (props: SearchApiParams) => void,
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
    (props: SearchApiParams) => {
      if (!token) {
        console.warn("useSpotifySearch: Spotify token is missing");
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

function propsToUrl(props: SearchApiParams): string {
  let url = `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(
    props.query
  )}&type=${props.types.join(",")}`;
  if (props.market) {
    url += `&market=${props.market}`;
  }

  if (props.limit !== undefined) {
    url += `&limit=${props.limit}`;
  }

  if (props.offset !== undefined) {
    url += `&offset=${props.offset}`;
  }

  if (props.includeExternal !== undefined) {
    url += `&include_external=${props.includeExternal}`;
  }

  return url;
}
