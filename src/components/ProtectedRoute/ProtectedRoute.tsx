import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
