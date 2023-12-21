import React, { FormEvent, useState } from "react"
import styles from "./Login.module.scss"
import { Layout } from "@components/Layout"
import { UserActions } from "@shared/firebase"
import { useNavigate } from "react-router"
import { Pages } from "../config"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    UserActions.loginWithEmailAndPassword(email, password)
      .then(() => {
        navigate(Pages.admin.path)
      })
      .catch(() => {
        alert("Error")
      })
  }

  return (
    <Layout>
      <h1>Login</h1>

      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button">Login</button>
      </form>
    </Layout>
  )
}
