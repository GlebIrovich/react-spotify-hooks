import { ApiHookReturnType } from "../../../types";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";
import { useCallback } from "react";
import { SPOTIFY_API_BASE } from "../../../constants";

export interface StartResumePlaybackParams {
  deviceId?: string;

  contextUri?: string;
  uris?: string[];
  positionMs?: number;
  offsetPosition?: number;
}

export function useStartResumePlayback<Data = unknown>(): [
  (props: StartResumePlaybackParams) => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("PUT");

  const request = useCallback(
    (props: StartResumePlaybackParams) =>
      baseRequest(propsToUrl(props), propsToBody(props)),
    [baseRequest]
  );

  return [request, state];
}

function propsToUrl(props: StartResumePlaybackParams): string {
  let url = `${SPOTIFY_API_BASE}/me/player/play`;

  if (props.deviceId) {
    url += `&device_id=${props.deviceId}`;
  }

  return url;
}

function propsToBody(props: StartResumePlaybackParams) {
  return {
    ...(props.contextUri ? { context_uri: props.contextUri } : {}),
    ...(props.uris ? { uris: props.uris } : {}),
    ...(props.positionMs ? { position_ms: props.positionMs } : {}),
    ...(props.offsetPosition
      ? { offset: { position: props.offsetPosition } }
      : {}),
  };
}
