import { SpotifyResponse } from "../../types";

export async function apiGetRequest<Data>(
  url: string,
  token: string
): Promise<SpotifyResponse<Data>> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { error: null, content: null };
    }

    const content = await response.json();
    if (!response.ok) {
      return { error: content?.error || content, content: null };
    }

    return { content, error: null };
  } catch (error) {
    return { error, content: null };
  }
}
