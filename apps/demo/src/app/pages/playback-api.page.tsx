import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import CurrentTrackPage from "./current-track.page";

const PlaybackApiPage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/playback-api/current-track">Current track</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route
          component={CurrentTrackPage}
          path={"/playback-api/current-track"}
        />
      </Switch>
    </div>
  );
};

export default PlaybackApiPage;
