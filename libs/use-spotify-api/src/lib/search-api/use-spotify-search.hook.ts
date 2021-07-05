import { SPOTIFY_API_BASE } from "../../constants";
import { useCallback } from "react";
import { ApiHookReturnType } from "../../types";
import { useSpotifyApiBase } from "../helpers/use-spotify-api-base.hook";

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
  const [baseRequest, state] = useSpotifyApiBase<Data>("GET");

  const request = useCallback(
    (props: SearchApiParams) => baseRequest(propsToUrl(props)),
    [baseRequest]
  );

  return [request, state];
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
