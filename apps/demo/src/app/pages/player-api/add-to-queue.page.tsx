import React, { useState } from "react";
import { useAddItemToQueue } from "use-spotify-api";
import PageContentComponent from "../../components/page-content.component";

const AddToQueuePage = () => {
  const [uri, setUri] = useState("spotify:track:5wt835alK7N1uJD8hC3TnU");
  const [request, data] = useAddItemToQueue();

  return (
    <div>
      <input value={uri} onChange={(event) => setUri(event.target.value)} />
      <button onClick={() => request({ uri })}>Request</button>

      <PageContentComponent data={data} />
    </div>
  );
};

export default AddToQueuePage;
