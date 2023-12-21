import { Navigate, Outlet } from "react-router"
import { Pages } from "../../pages"

export function ProtectedRoute() {
  let auth = { token: false }
  return auth.token ? <Outlet /> : <Navigate to={Pages.login.path} />
}
