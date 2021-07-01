import {
  SpotifyContextProvider,
  useSpotifyAuthorization,
  useSpotifyState,
} from "use-spotify-api";

function App() {
  const { tokenData } = useSpotifyState();
  const authUrl = useSpotifyAuthorization();

  return (
    <div>
      <header className="flex">
        <h1>Welcome to demo!</h1>
      </header>
      <main>
        <p>{JSON.stringify(tokenData)}</p>
        <a href={authUrl}>Authorize</a>
      </main>
    </div>
  );
}

function AppWithProviders() {
  return (
    <SpotifyContextProvider
      configs={{
        clientId: process.env.NX_SPOTIFY_CLIENT_ID as string,
        redirectUri: "http://localhost:4200/",
      }}
    >
      <App />
    </SpotifyContextProvider>
  );
}

export default AppWithProviders;
