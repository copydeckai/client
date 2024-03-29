// import { useLocation } from "react-router-dom";
import appStateReducer, { AppStateReducerAction } from "./reducer";
import IAppState, { initialAppState } from "./state";
import React from "react";

export type AppStateContextType = [
  IAppState,
  React.Dispatch<AppStateReducerAction>
];
export const AppStateContext = React.createContext<AppStateContextType>([
  initialAppState,
  () => undefined
]);
const AppStateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //   const location = useLocation();
  const stateAndDispatch = React.useReducer(appStateReducer, initialAppState);
  const [state, dispatch] = stateAndDispatch;

  React.useEffect(() => {
    if (!!state.error) {
      dispatch({
        payload: {
          error: undefined
        },
        type: "displayError"
      });
    }
  });

  return (
    <AppStateContext.Provider value={stateAndDispatch}>
      {children}
    </AppStateContext.Provider>
  );
};

export const { Consumer } = AppStateContext;

export default AppStateProvider;
