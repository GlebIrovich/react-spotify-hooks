import React from "react";
import { useCurrentTrack } from "use-spotify-api";
import PageContentComponent from "../components/page-content.component";

const CurrentTrackPage = () => {
  const [request, data] = useCurrentTrack();

  return (
    <div>
      <button onClick={() => request({})}>Request</button>

      <PageContentComponent data={data} />
    </div>
  );
};

export default CurrentTrackPage;
