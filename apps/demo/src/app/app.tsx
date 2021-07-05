import {
  SpotifyContextProvider,
  useSetSpotifyToken,
  useSpotifyAuthorization,
  useSpotifyState,
} from "use-spotify-api";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import SearchApiPage from "./pages/search-api.page";
import PlayerApiPage from "./pages/player-api/player-api.page";
import { useCallback, useEffect } from "react";

function App() {
  const setToken = useSetSpotifyToken();
  const { tokenData } = useSpotifyState();

  const setTokenFromLocalStorage = useCallback(() => {
    const token = localStorage.getItem("MY_APP_NAME");
    if (token) {
      setToken({
        token,
      });
    }
  }, [setToken]);

  useEffect(setTokenFromLocalStorage, [setTokenFromLocalStorage]);

  const authUrl = useSpotifyAuthorization({
    scopes: [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-modify-playback-state",
    ],
    showDialog: true,
    clientId: process.env.NX_SPOTIFY_CLIENT_ID as string,
    redirectUri: "http://localhost:4200/",
  });

  const openAuthPopup = () => {
    const popupWindow = window.open(
      authUrl,
      "popUpWindow",
      "height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,directories=no, status=yes"
    ) as Window;

    const intervalId = setInterval(() => {
      if (popupWindow.closed) {
        setTokenFromLocalStorage();
        clearInterval(intervalId);
      }
    }, 1000);
  };

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/search-api">Search API</Link>
          </li>
          <li>
            <Link to="/player-api">Player API</Link>
          </li>
        </ul>
      </nav>

      <div>
        <button onClick={openAuthPopup}>Authorize</button>
        <div>{tokenData ? "Authorized" : "Not Authorized"}</div>
      </div>

      <Switch>
        <Route component={SearchApiPage} path={"/search-api"} />
        <Route component={PlayerApiPage} path={"/player-api"} />
      </Switch>
    </BrowserRouter>
  );
}

function AppWithProviders() {
  return (
    <SpotifyContextProvider
      onTokenObtained={({ token }) => {
        localStorage.setItem("MY_APP_NAME", token);
        window.close();
      }}
    >
      <App />
    </SpotifyContextProvider>
  );
}

export default AppWithProviders;
