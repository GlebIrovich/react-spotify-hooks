import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

export interface SpotifyConfigs {
  clientId: string;
  redirectUri: string;
  scopes?: string[];
}

interface TokenData {
  token: string;
  validUntil?: Date;
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
  tokenAutoDetect?: boolean;
}

export const SpotifyContextProvider: FC<Props> = ({
  children,
  configs,
  tokenAutoDetect = true,
}) => {
  const [state, dispatch] = useReducer(stateReducer, { configs });

  useEffect(() => {
    if (!tokenAutoDetect) {
      return;
    }
    const currentParams = new URLSearchParams(
      window.location.hash.replace("#", "")
    );

    const token = currentParams.get("access_token");
    const expiresIn = currentParams.get("expires_in");
    if (token && expiresIn) {
      dispatch({
        type: "set-token",
        payload: {
          token,
          validUntil: new Date(Date.now() + parseInt(expiresIn, 10) * 1000),
        },
      });
      window.history.replaceState(null, "", "");
    }
  }, []);

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

export function useSetSpotifyToken() {
  const dispatch = useSpotifyDispatch();

  return useCallback(
    (tokenData: TokenData) =>
      dispatch({ type: "set-token", payload: tokenData }),
    [dispatch]
  );
}
