import {
  SpotifyContextProvider,
  useSpotifyAuthorization,
  useSpotifyState,
} from "use-spotify-api";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import SearchApiPage from "./pages/search-api.page";
import PlaybackApiPage from "./pages/playback-api.page";

function App() {
  const { tokenData } = useSpotifyState();
  const authUrl = useSpotifyAuthorization();

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/search-api">Search API</Link>
          </li>
          <li>
            <Link to="/playback-api">Playback API</Link>
          </li>
        </ul>
      </nav>

      <div>
        <a href={authUrl}>Authorize</a>
        <div>{tokenData ? "Authorized" : "Not Authorized"}</div>
      </div>

      <Switch>
        <Route component={SearchApiPage} path={"/search-api"} />
        <Route component={PlaybackApiPage} path={"/playback-api"} />
      </Switch>
    </BrowserRouter>
  );
}

function AppWithProviders() {
  return (
    <SpotifyContextProvider
      configs={{
        clientId: process.env.NX_SPOTIFY_CLIENT_ID as string,
        redirectUri: "http://localhost:4200/",
        scopes: ["user-read-currently-playing", "user-read-playback-state"],
      }}
    >
      <App />
    </SpotifyContextProvider>
  );
}

export default AppWithProviders;
