import React, { useEffect } from "react"
import { Route, Routes } from "react-router"
import { Admin, Game, Login, NotFound, Pages } from "./pages"
import { ProtectedRoute } from "@components"
import { BrowserRouter } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@shared"

export function App() {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Game />} path={Pages.game.path} />
        <Route element={<Login />} path={Pages.login.path} />
        <Route element={<NotFound />} path={"*"} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Admin />} path={Pages.admin.path} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
