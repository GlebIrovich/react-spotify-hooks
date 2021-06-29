import React, { FC, useContext, useReducer } from "react";

export interface SpotifyConfigs {
  clientId: string;
  redirectUri: string;
  scopes?: string[];
}

interface TokenData {
  token: string;
  validUntil: Date;
}

type Action = { type: "set-token"; payload: TokenData };
type Dispatch = (action: Action) => void;
interface SpotifyContextState {
  tokenData?: TokenData;
  configs: SpotifyConfigs;
}

const SpotifyStateContext = React.createContext<
  SpotifyContextState | undefined
>(undefined);
const SpotifyDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function stateReducer(
  state: SpotifyContextState,
  action: Action
): SpotifyContextState {
  switch (action.type) {
    case "set-token": {
      return { ...state, tokenData: action.payload };
    }
    default: {
      throw new Error(
        `SpotifyContextProvider: unhandled action type: ${action.type}`
      );
    }
  }
}

interface Props {
  configs: SpotifyConfigs;
}

export const SpotifyContextProvider: FC<Props> = ({ children, configs }) => {
  const [state, dispatch] = useReducer(stateReducer, { configs });

  return (
    <SpotifyStateContext.Provider value={state}>
      <SpotifyDispatchContext.Provider value={dispatch}>
        {children}
      </SpotifyDispatchContext.Provider>
    </SpotifyStateContext.Provider>
  );
};

export function useSpotifyState() {
  const context = useContext(SpotifyStateContext);

  if (context === undefined) {
    throw new Error(
      "useSpotifyState must be used within a SpotifyContextProvider"
    );
  }

  return context;
}

export function useSpotifyDispatch() {
  const context = useContext(SpotifyDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useSpotifyDispatch must be used within a SpotifyContextProvider"
    );
  }

  return context;
}
