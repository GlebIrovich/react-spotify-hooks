import { SPOTIFY_API_BASE } from "../../../constants";
import { useCallback, useRef, useState } from "react";
import { ApiHookReturnType, SpotifyResponse } from "../../../types";
import { apiPostRequest } from "../../helpers/spotify.api";
import { useSpotifyState } from "../../context/spotify.context";

export interface AddItemToQueueParams {
  uri: string;
  device?: string;
}

export function useAddItemToQueue<Data = unknown>(): [
  (props: AddItemToQueueParams) => void,
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
    (props: AddItemToQueueParams) => {
      if (!token) {
        console.warn("useAddItemToQueue: Spotify token is missing");
        return;
      }

      const url = propsToUrl(props);
      setLoading(true);
      apiPostRequest<Data>(url, token)
        .then((apiResponse) => (response.current = apiResponse))
        .finally(() => setLoading(false));
    },
    [token]
  );

  return [lazyRequest, { ...response.current, loading }];
}

function propsToUrl(props: AddItemToQueueParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player/queue?uri=${props.uri}`;

  if (props.device) {
    url += `&device=${props.device}`;
  }

  return url;
}
