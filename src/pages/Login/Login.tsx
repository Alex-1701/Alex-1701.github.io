import React, { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UserActions } from "@shared"
import { Layout } from "@components"
import styles from "./Login.module.scss"
import { Pages } from "../config"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    console.log("submit")
    event.preventDefault()
    UserActions.login(email, password)
      .then(() => {
        // this navigate is useless
        // navigate(Pages.admin.path)
      })
      .catch(() => {
        alert("Error")
      })
  }

  return (
    <Layout>
      <h1>Login</h1>

      <button
        onClick={() => {
          navigate(Pages.admin.path)
        }}
      >
        Navigate
      </button>

      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div className={styles.inputWithLabel}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputWithLabel}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </Layout>
  )
}
