// import logo from "@assets/images/logo.svg";
import ErrorPage from "../ErrorPage";
import PlanType from "../PlanType";
import Sidebar from "../Sidebar";
import useAppState from "@copydeck/hooks/useAppState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { Toaster } from 'react-hot-toast';
// import SVG from "react-inlinesvg";
import { Outlet } from "react-router-dom";

interface EditorLayoutProps {
  showPlanType: any;
  currentUrl: any;
  toggleShowPlanType: () => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  showPlanType,
  toggleShowPlanType
}) => {
  const queryClient = new QueryClient();
  const [appState] = useAppState();
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <main className="hp-bg-color-dark-90 d-flex min-vh-100">
        <div className="hp-main-layout">
          {showPlanType ? (
            <PlanType toggleShowPlanType={toggleShowPlanType} />
          ) : (
            <>
              {appState.error ? (
                appState.error.type === "unhandled" && (
                  <ErrorPage
                    id={appState.error.id}
                    // onBack={handleErrorBack}
                  />
                )
              ) : (
                <Outlet />
              )}
            </>
          )}
        </div>
      </main>
    </QueryClientProvider>
  );
};

EditorLayout.displayName = "EditorLayout";
export default EditorLayout;
