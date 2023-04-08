import { AppStateContext } from "../containers/AppState";
import React from "react";

function useAppState() {
  const stateAndDispatch = React.useContext(AppStateContext);

  return stateAndDispatch;
}

export default useAppState;
