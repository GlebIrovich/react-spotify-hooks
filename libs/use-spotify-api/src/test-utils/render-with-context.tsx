import { ComponentProps, ReactNode } from "react";
import { render } from "@testing-library/react";
import {
  SpotifyConfigs,
  SpotifyContextProvider,
} from "../lib/context/spotify.context";

const spotifyConfigMock: SpotifyConfigs = {
  clientId: "CLIENT_ID",
  scopes: ["USER_DATA", "USER_EMAIL"],
  redirectUri: "REDIRECT_URI",
};

export const renderWithContext = (
  children: ReactNode,
  props: Partial<ComponentProps<typeof SpotifyContextProvider>> = {}
) => {
  const propsWithDefaults: ComponentProps<typeof SpotifyContextProvider> = {
    ...props,
    configs: {
      ...spotifyConfigMock,
      ...(props.configs || {}),
    },
  };

  return {
    renderResult: render(
      <SpotifyContextProvider {...propsWithDefaults}>
        {children}
      </SpotifyContextProvider>
    ),
    testProps: propsWithDefaults,
  };
};
