import React from "react";
import { Navigate } from "react-router-dom";

import { APP_ROUTES } from "../../shared";
import { Layout } from "../layout";

interface PrivateRouteProps {
  children: React.ReactNode;
  token: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ token, children }) => {
  return (
    <>
      {token ? <Layout token={token}>{children}</Layout> : <Navigate to={APP_ROUTES.login} />}
    </>
  );
};

export default PrivateRoute;
