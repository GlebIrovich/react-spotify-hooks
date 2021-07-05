import { useCallback, useRef, useState } from "react";
import { ApiHookReturnType, SpotifyResponse } from "../../types";
import { apiGetRequest, apiPostRequest, apiPutRequest } from "./spotify.api";
import { useSpotifyState } from "../context/spotify.context";

export function useSpotifyApiBase<Data = unknown>(
  method: "GET" | "POST" | "PUT"
): [(url: string, body?: any) => void, ApiHookReturnType] {
  const [loading, setLoading] = useState(false);
  const response = useRef<SpotifyResponse<Data>>({
    content: null,
    error: null,
  });
  const { tokenData } = useSpotifyState();
  const token = tokenData?.token || null;

  const lazyRequest = useCallback(
    (url: string, body?: any) => {
      if (!token) {
        console.warn("Spotify token is missing");
        return;
      }

      setLoading(true);
      if (method === "GET") {
        apiGetRequest<Data>(url, token)
          .then((apiResponse) => (response.current = apiResponse))
          .finally(() => setLoading(false));
      } else if (method === "POST") {
        apiPostRequest<Data>(url, token, body)
          .then((apiResponse) => (response.current = apiResponse))
          .finally(() => setLoading(false));
      } else {
        apiPutRequest<Data>(url, token, body)
          .then((apiResponse) => (response.current = apiResponse))
          .finally(() => setLoading(false));
      }
    },
    [token, method]
  );

  return [lazyRequest, { ...response.current, loading }];
}
