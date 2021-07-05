import { ApiHookReturnType } from "../../../types";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";
import { useCallback } from "react";
import { SPOTIFY_API_BASE } from "../../../constants";

export interface TransferPlaybackParams {
  deviceId: string;
  play?: boolean;
}

export function useTransferPlayback<Data = unknown>(): [
  (props: TransferPlaybackParams) => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("PUT");

  const request = useCallback(
    (props: TransferPlaybackParams) =>
      baseRequest(`${SPOTIFY_API_BASE}/me/player`, propsToBody(props)),
    [baseRequest]
  );

  return [request, state];
}

function propsToBody(props: TransferPlaybackParams) {
  return {
    device_ids: [props.deviceId],
    play: props.play,
  };
}
