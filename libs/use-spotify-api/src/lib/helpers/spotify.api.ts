import { SpotifyResponse } from "../../types";

export async function apiGetRequest<Data>(
  url: string,
  token: string
): Promise<SpotifyResponse<Data>> {
  return handleRequest(() =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}

export async function apiPostRequest<Data>(
  url: string,
  token: string,
  body?: any
): Promise<SpotifyResponse<Data>> {
  return handleRequest<Data>(() =>
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  );
}

export async function apiPutRequest<Data>(
  url: string,
  token: string,
  body?: any
): Promise<SpotifyResponse<Data>> {
  return handleRequest<Data>(() =>
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  );
}

async function handleRequest<Data>(
  request: () => Promise<Response>
): Promise<SpotifyResponse<Data>> {
  try {
    const response = await request();

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
