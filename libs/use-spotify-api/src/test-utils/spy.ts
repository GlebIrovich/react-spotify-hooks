import * as context from "../lib/context/spotify.context";
import { useSpotifyState } from "../lib/context/spotify.context";
import * as apiHelpers from "../lib/helpers/spotify.api";
import { SpotifyResponse } from "../types";

export function mockUseSpotifyState(
  returnValue: ReturnType<typeof useSpotifyState>
) {
  return jest.spyOn(context, "useSpotifyState").mockReturnValue(returnValue);
}

export function mockSuccessfulApiGetRequest(resolveValue: SpotifyResponse) {
  return jest
    .spyOn(apiHelpers, "apiGetRequest")
    .mockResolvedValue(resolveValue);
}

export function mockSuccessfulApiPostRequest(resolveValue: SpotifyResponse) {
  return jest
    .spyOn(apiHelpers, "apiPostRequest")
    .mockResolvedValue(resolveValue);
}

export function mockSuccessfulApiPutRequest(resolveValue: SpotifyResponse) {
  return jest
    .spyOn(apiHelpers, "apiPutRequest")
    .mockResolvedValue(resolveValue);
}
