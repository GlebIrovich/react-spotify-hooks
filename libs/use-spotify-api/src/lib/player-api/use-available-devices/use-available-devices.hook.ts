import { ApiHookReturnType } from "use-spotify-api";
import { useSpotifyApiBase } from "../../helpers/use-spotify-api-base.hook";
import { useCallback } from "react";
import { SPOTIFY_API_BASE } from "../../../constants";

export function useAvailableDevices<Data = unknown>(): [
  () => void,
  ApiHookReturnType<Data>
] {
  const [baseRequest, state] = useSpotifyApiBase<Data>("GET");

  const request = useCallback(
    () => baseRequest(`${SPOTIFY_API_BASE}/me/player/devices`),
    [baseRequest]
  );

  return [request, state];
}
