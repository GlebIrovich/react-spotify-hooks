### Search API

Example:
```tsx
const Component = () => {
  const [search, { error, content, loading }] = useSpotifySearch<any>();

  useEffect(() => search({
    types: ["album"],
    query: "Rammstein",
    market: "from_token",
    limit: 10,
    offset: 0,
    includeExternal: false
  }), []);

  if (loading) {
    return <div id="loading">Loading</div>;
  }

  if (error) {
    return <div id="error">{JSON.stringify(error)}</div>;
  }

  if (content) {
    return <div id="content">{JSON.stringify(content)}</div>;
  }

  return null;
};
```

Resulted function accepts and object of type `SearchApiParams` with search parameters.
Refer to the [official documentation](https://developer.spotify.com/documentation/web-api/reference/#category-search) for the description of the params.
Query encoding is handled by the hook. You can provide you query as a plain string.
