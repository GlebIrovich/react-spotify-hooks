import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import CurrentTrackPage from "./current-track.page";
import AddToQueuePage from "./add-to-queue.page";

const PlayerApiPage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/player-api/current-track">Current track</Link>
          </li>
          <li>
            <Link to="/player-api/add-to-queue">Add to queue</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route
          component={CurrentTrackPage}
          path={"/player-api/current-track"}
        />
        <Route component={AddToQueuePage} path={"/player-api/add-to-queue"} />
      </Switch>
    </div>
  );
};

export default PlayerApiPage;
