import React from "react";
import { ApiHookReturnType } from "use-spotify-api";

interface Props {
  data: ApiHookReturnType;
}

const PageContentComponent = ({ data }: Props) => {
  return (
    <div>
      <div>Is Lading: {JSON.stringify(data.loading)}</div>
      <div>Error: {JSON.stringify(data.error)}</div>
      <div>Content: {JSON.stringify(data.content, undefined, 2)}</div>
    </div>
  );
};

export default PageContentComponent;
