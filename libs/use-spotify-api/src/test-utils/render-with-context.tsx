import { ComponentProps, ReactNode } from "react";
import { render } from "@testing-library/react";
import { SpotifyContextProvider } from "../lib/context/spotify.context";

export const renderWithContext = (
  children: ReactNode,
  props: Partial<ComponentProps<typeof SpotifyContextProvider>> = {}
) => {
  return render(
    <SpotifyContextProvider {...props}>{children}</SpotifyContextProvider>
  );
};
