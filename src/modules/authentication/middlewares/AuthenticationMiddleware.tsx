import { Navigate, useLocation } from "react-router-dom";

import { MiddlewareBaseProps } from "../../../@types/Middlewares";
import { Loading } from "../../../components/Loading";
import { useLoading } from "../../../hooks/useLoading";
import { useAuthenticationState } from "../hooks/useAuthenticationState";

export const AuthenticationMiddleware = ({ children }: MiddlewareBaseProps) => {
  const { pathname } = useLocation();

  const [{ authenticationStatus }, { executeInitialAuthenticationVerification }] =
    useAuthenticationState();
  const isAuthenticationStateLoading = useLoading([
    { callback: executeInitialAuthenticationVerification, params: [] },
  ]);

  if (isAuthenticationStateLoading) return <Loading />;

  switch (authenticationStatus) {
    case "authenticated": {
      if (pathname == "/login" || pathname == "/register") return <Navigate to="/" />;

      return children;
    }
    case "notAuthenticated": {
      if (pathname == "/login" || pathname == "/register") return children;

      return <Navigate to="/login" />;
    }
  }
};
