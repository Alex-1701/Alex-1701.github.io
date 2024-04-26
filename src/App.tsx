import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@shared"
import { ProtectedRoute } from "@components"
import { Admin, AutoGame, Game, Login, NotFound, Pages } from "./pages"

export function App() {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
        navigate(Pages.admin.path)
      }
    })
  }, [])

  return (
    <Routes>
      <Route element={<Game />} path={Pages.game.path} />
      <Route element={<AutoGame />} path={Pages.autoGame.path} />
      <Route element={<Login />} path={Pages.login.path} />
      <Route element={<NotFound />} path={"*"} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Admin />} path={Pages.admin.path} />
      </Route>
    </Routes>
  )
}
