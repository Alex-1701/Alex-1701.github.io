import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Layout } from "@components/Layout";
import { UserActions } from "@shared/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    UserActions.loginWithEmailAndPassword(email, password);
  };

  return (
    <Layout>
      <h1>Login</h1>
      <p>admin@example.com - qwerty</p>

      <form className={styles.authForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button type="button" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </Layout>
  );
}
