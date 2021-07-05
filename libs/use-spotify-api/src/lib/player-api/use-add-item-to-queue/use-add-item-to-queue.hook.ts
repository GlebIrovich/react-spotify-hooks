import { SPOTIFY_API_BASE } from "../../../constants";
import { useCallback } from "react";
import { ApiHookReturnType } from "../../../types";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";

export interface AddItemToQueueParams {
  uri: string;
  device?: string;
}

export function useAddItemToQueue<Data = unknown>(): [
  (props: AddItemToQueueParams) => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("POST");

  const request = useCallback(
    (props: AddItemToQueueParams) => baseRequest(propsToUrl(props)),
    [baseRequest]
  );

  return [request, state];
}

function propsToUrl(props: AddItemToQueueParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player/queue?uri=${props.uri}`;

  if (props.device) {
    url += `&device=${props.device}`;
  }

  return url;
}
