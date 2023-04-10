// import { SearchContextProvider } from "./context/searchContext";
import NotFound from "./NotFound";
import Auth from "./auth";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import SectionRoute from "./components/SectionRoute";
import { WindowTitle } from "./components/WindowTitle";
import { APP_MOUNT_URI, GTM_ID } from "./config";
import AppStateProvider from "./containers/AppState";
import { AuthContextProvider, useAuth } from "./contexts/authContext";
import { SearchContextProvider, useSearch } from "./contexts/searchContext";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Write from "./pages/Write";
import WriteUpdate from "./pages/Write/views/WriteUpdate";
import errorTracker from "./services/errorTracking";
import {
  accountPageUrl,
  homePageUrl,
  updateWritingUrl,
  writingSection
} from "./urls";
import AppLayout from "@components/AppLayout";
import EditorLayout from "@components/EditorLayout";
import "@copydeck/baseStyles/dark.css";
import "@copydeck/baseStyles/main.css";
import "@copydeck/baseStyles/style.css";
// import { useFetch } from "@copydeck/hooks/makeRequest";
import useAppState from "@copydeck/hooks/useAppState";
import { ConfigProvider } from "antd";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import TagManager from "react-gtm-module";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import serviceWorker from "./sw";

if (GTM_ID.length > 0) {
  TagManager.initialize({ gtmId: GTM_ID });
}

errorTracker.init();

const App: React.FC = () => (
  <BrowserRouter basename={APP_MOUNT_URI}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e95402"
        }
      }}
    >
      <AppStateProvider>
        <AuthContextProvider>
          <SearchContextProvider>
            <AppRoutes />
          </SearchContextProvider>
        </AuthContextProvider>
      </AppStateProvider>
    </ConfigProvider>
  </BrowserRouter>
);

const AppRoutes: React.FC = () => {
  const { fetchSearchResults, dispatch } = useSearch();
  const { user } = useAuth();
  const [, dispatchAppState] = useAppState();
  const [showPlanType, setShowPlanType] = useState(false);

  const toggleShowPlanType = () => {
    setShowPlanType(!showPlanType);
  };

  const getCurrentURL = window.location.pathname;

  const myErrorHandler = (error: Error, _info: { componentStack: string }) => {
    // Do something with the error
    // E.g. log to an error logging client here
    const errorId = errorTracker.captureException(error);

    dispatchAppState({
      payload: {
        error: "unhandled",
        errorId
      },
      type: "displayError"
    });
  };

  const ErrorPageComponent = () => <ErrorPage />;

  const fetchSearch = async (searchQuery: any) => {
    dispatch({ type: "newSearch" });
    try {
      await fetchSearchResults(searchQuery).then(response => {
        const {
          data: { results }
        } = response;

        // const filteredResults = results.filter(result => result.media_type !== 'person');
        // setSearchResult(results);

        dispatch({ type: "searchSuccess", payload: results });
      });
    } catch (err) {
      // errorTracker.captureException(err);
      dispatch({ type: "actionFailure", payload: err.message });
      return [];
    }
    return [];
  };

  return (
    <>
      <WindowTitle title="Dashboard" />
      <ErrorBoundary
        FallbackComponent={ErrorPageComponent}
        onError={myErrorHandler}
      >
        {user ? (
          <Routes>
            <Route
              element={
                <AppLayout
                  showPlanType={showPlanType}
                  toggleShowPlanType={toggleShowPlanType}
                  fetchSearch={fetchSearch}
                  currentUrl={getCurrentURL}
                />
              }
            >
              <Route path={homePageUrl} element={<ProtectedRoute />}>
                <Route index element={<Home />} />
                <Route path={accountPageUrl} element={<Settings />} />
              </Route>
            </Route>
            <Route
              element={
                <EditorLayout
                  showPlanType={showPlanType}
                  toggleShowPlanType={toggleShowPlanType}
                  currentUrl={getCurrentURL}
                />
              }
            >
              <Route path={writingSection} element={<ProtectedRoute />}>
                <Route
                  index
                  element={<Write toggleShowPlanType={toggleShowPlanType} />}
                />
                <Route
                  path={updateWritingUrl}
                  element={
                    <WriteUpdate toggleShowPlanType={toggleShowPlanType} />
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Auth />
        )}
      </ErrorBoundary>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
// serviceWorker();
