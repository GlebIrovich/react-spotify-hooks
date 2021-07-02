# Use Spotify API

#### React Hooks for using Spotify API

### Supported APIs
-[x] Getting access token using [Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)
-[x] [Search API](./libs/use-spotify-api/src/lib/search-api/README.md)
-[ ] Browse API
-[ ] Follow API
-[ ] Playlist API
-[ ] Library API
-[ ] Artist API
-[ ] Markets API
-[ ] Personalization API
-[ ] User Profile API
-[ ] Albums API
-[ ] Tracks API
-[ ] Episodes API
-[ ] Shows API


### Quick Start Guide

#### 1. Install
`npm install use-spotify-api`

#### 2. Create Developer Account
[Set up your Spotify app](https://developer.spotify.com/documentation/general/guides/app-settings/) to obtain `clientId` and provide `redirectUri`

#### 3. Wrap your app with `SpotifyContextProvider`

`use-spotify-api` helps to abstract authentication logic by using React Context API.

```tsx
ReactDOM.render(
  <SpotifyContextProvider
    configs={{
      clientId: YOU_CLIENT_ID,
      redirectUri: REDIRECT_URL,
    }}
  >
    <App />
  </SpotifyContextProvider>,
  document.getElementById('root')
);
```

#### 4. Use `useSpotifyAuthorization` hook to generate auth url.

```tsx
function App() {
  const authUrl = useSpotifyAuthorization();

  return (
    <main>
      <a href={authUrl}>Authorize</a>
    </main>
  );
}
```

Once user gives your app, she will be redirected to the url which you specified as `redirectUrl`.
`SpotifyContextProvider` will extract token from the url and remove the hash from the location href.

### Accessing `SpotifyContextProvider`'s state

In some case you might need to get access to you token. You can use `useSpotifyState` hook to
retrieve information from the context.

```tsx
function App() {
  const authUrl = useSpotifyAuthorization();
  const { tokenData } = useSpotifyState();

  return (
    <main>
      <a href={authUrl}>Authorize</a>
      <p>{JSON.stringify(tokenData)}</p>
    </main>
  );
}
```

### Opting out from token auto-detection

If you use a different authorization flow, you might need to provide token to the context yourself.
This is very simple. Use `useSetSpotifyToken` hook to update context state.

```tsx
function App({token}: {token: string}) {
  const { tokenData } = useSpotifyState();
  const setToken = useSetSpotifyToken();
  
  useEffect(() => {
    setToken({token})
  },[token, setToken])

  return (
    <main>
      <p>{JSON.stringify(tokenData)}</p>
    </main>
  );
}
```
