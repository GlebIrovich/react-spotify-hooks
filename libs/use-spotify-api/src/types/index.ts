export interface SpotifyResponse<Data = any> {
  content: Data | null;
  error: any | null;
}

export interface ApiHookReturnType<Data = any> extends SpotifyResponse<Data> {
  loading: boolean;
}
