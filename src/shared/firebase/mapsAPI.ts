import { dbCollections, FirestoreAPI } from "@shared";

export const MapsAPI = {
  getAllMaps: async function () {
    return FirestoreAPI.getAllDocs(dbCollections.MAPS);
  },

  getMap: async function (id: string) {
    return FirestoreAPI.getDocById(dbCollections.MAPS, id);
  },
};
