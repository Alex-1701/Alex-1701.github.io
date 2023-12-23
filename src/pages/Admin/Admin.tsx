import React from "react"
import { useNavigate } from "react-router"
import { Layout } from "@components"
import { MapsAPI, UserActions } from "@shared"
import { Pages } from "../config"

export function Admin() {
  const navigate = useNavigate()

  const request = async () => {
    // FirestoreAPI.pushDoc(
    //   collections.MAPS,
    //   data
    // );

    const maps = await MapsAPI.getAllMaps()
    console.log(maps)

    const map = await MapsAPI.getMap("lol")
    console.log(map)

    // FirestoreAPI.setDocDB(dbCollections.MAPS, "lol kek", data);
  }

  const logOut = async () => {
    await UserActions.logout()
    navigate(Pages.login.path)
  }

  return (
    <Layout>
      <h1>Admin</h1>
      <button type="button" onClick={request}>
        button
      </button>

      <button type="button" onClick={logOut}>
        log out
      </button>
    </Layout>
  )
}
