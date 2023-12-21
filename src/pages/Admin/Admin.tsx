import { Layout } from "@components/Layout"
import { MapsAPI } from "@shared"
import React from "react"

export function Admin() {
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

  return (
    <Layout>
      <h1>Admin</h1>
      <button type="button" onClick={request}>
        button
      </button>
    </Layout>
  )
}
