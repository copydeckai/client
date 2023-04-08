// import useUser from "@vidor/hooks/useUser";
// import NotFound from "@vidor/NotFound";
import React from "react";
import { Outlet, RouteProps } from "react-router-dom";

// import { PermissionEnum } from "../../types/globalTypes";
// import { hasPermission } from "../misc";

type SectionRouteProps = RouteProps & {
  // permissions?: PermissionEnum[];
  permissions?: any;
  element?: React.ReactNode;
  path?: string;
};

export const SectionRoute: React.FC<SectionRouteProps> = () => (
  // const { user } = useUser();

  // const hasPermissions =
  //   !permissions ||
  //   permissions
  //     .map(permission => hasPermission(permission, user))
  //     .reduce((prev, curr) => prev && curr);
  // return hasPermissions ? <Route {...props} /> : <NotFound />;
  <Outlet />
);
SectionRoute.displayName = "Route";
export default SectionRoute;
