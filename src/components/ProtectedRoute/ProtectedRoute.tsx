import { Navigate, Outlet } from "react-router"
import { Pages } from "../../pages"
import { auth } from "@shared"

export function ProtectedRoute() {
  return auth.currentUser ? <Outlet /> : <Navigate to={Pages.login.path} />
}
