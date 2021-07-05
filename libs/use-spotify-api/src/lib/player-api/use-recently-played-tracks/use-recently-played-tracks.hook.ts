import { ApiHookReturnType } from "../../../types";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";
import { useCallback } from "react";
import { SPOTIFY_API_BASE } from "../../../constants";

export interface RecentlyPlayedTracksParams {
  limit?: number;
  after?: number;
  before?: number;
}

export function useRecentlyPlayedTracks<Data = unknown>(): [
  (props: RecentlyPlayedTracksParams) => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("GET");

  const request = useCallback(
    (props: RecentlyPlayedTracksParams) => baseRequest(propsToUrl(props)),
    [baseRequest]
  );

  return [request, state];
}

function propsToUrl(props: RecentlyPlayedTracksParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player/recently-played`;
  let isFirst = true;
  const connector = () => {
    if (isFirst) {
      isFirst = false;
      return "?";
    }

    return "&";
  };

  if (props.limit) {
    url += `${connector()}limit=${props.limit}`;
  }

  if (props.after) {
    url += `${connector()}after=${props.after}`;
  }

  if (props.before) {
    url += `${connector()}before=${props.before}`;
  }

  return url;
}
