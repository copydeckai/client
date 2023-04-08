// import logo from "@assets/images/logo.svg";
import ErrorPage from "../ErrorPage";
import PlanType from "../PlanType";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
// import WriterSidebar from '../WriterSidebar';
import "./content.css";
import useAppState from "@copydeck/hooks/useAppState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { Toaster } from 'react-hot-toast';
// import SVG from "react-inlinesvg";
import { Outlet } from "react-router-dom";

interface AppLayoutProps {
  showPlanType: any;
  currentUrl: any;
  fetchSearch: (any) => void;
  toggleShowPlanType: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  toggleShowPlanType,
  currentUrl,
  showPlanType,
  fetchSearch
}) => {
  const queryClient = new QueryClient();
  const [appState] = useAppState();
  React.useEffect(() => {
    document.body.classList.remove("collapsed-active");
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: 'toast-toast'
        }}
      /> */}
      <Sidebar />
      <main className="hp-bg-color-dark-90 d-flex min-vh-100">
        <div className="hp-main-layout">
          {showPlanType ? (
            <PlanType toggleShowPlanType={toggleShowPlanType} />
          ) : (
            <>
              {currentUrl !== "/write" && (
                <Topbar currentUrl={currentUrl} fetchSearch={fetchSearch} />
              )}
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
          {/* <div className="my-16 px-24 col-12">
              <p className="hp-p1-body text-center hp-text-color-black-60 mb-8">© 2023 Copydeck Inc.</p>
          </div> */}
        </div>
      </main>
    </QueryClientProvider>
  );
};

AppLayout.displayName = "AppLayout";
export default AppLayout;
