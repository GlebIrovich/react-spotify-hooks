import React, { useState } from "react";
import PageContentComponent from "../components/page-content.component";
import { useSpotifySearch } from "use-spotify-api";

const SearchApiPage = () => {
  const [search, setSearch] = useState("");
  const [request, data] = useSpotifySearch();

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button onClick={() => request({ query: search, types: ["track"] })}>
        Request
      </button>

      <PageContentComponent data={data} />
    </div>
  );
};

export default SearchApiPage;
