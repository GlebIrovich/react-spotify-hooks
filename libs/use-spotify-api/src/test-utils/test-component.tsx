import React, { useEffect } from "react";
import { ApiHookReturnType } from "use-spotify-api";

interface Props {
  request: () => void;
  data: ApiHookReturnType;
}

const TestComponent = ({
  data: { error, loading, content },
  request,
}: Props) => {
  useEffect(request, []);

  if (error) {
    return <div data-testid="error">{JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div data-testid="loading">{JSON.stringify(loading)}</div>;
  }

  if (content) {
    return <div data-testid="content">{JSON.stringify(content)}</div>;
  }

  return null;
};

export default TestComponent;
