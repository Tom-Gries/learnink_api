import clientPromise from "../db.js"
import { namedStable } from "../namedObjects/Stable.js"
import { ObjectHandler } from "../types/ObjectHandler.js"
import { NamedStable } from "../types/Stable.js"

export const stableHandler: ObjectHandler<NamedStable> = {
  init: async function (): Promise<ObjectHandler<NamedStable>> {
    const client = await clientPromise
    const db = client.db("learnink")
    this.dbConnection = db.collection("staples")
    return this
  },
  dbConnection: null,
  getbyIndex: function (index: number): NamedStable {
    throw new Error("Function not implemented.")
  },
  getAll: async function (): Promise<NamedStable> {
    if (!this.dbConnection) throw new Error("DB-Verbindung nicht initialisiert")
    const data = await this.dbConnection.find().toArray()
    return namedStable.setValue(data)
  },
  add: function (value: NamedStable): void {
    throw new Error("Function not implemented.")
  },
  removeByIndex: function (index: number): void {
    throw new Error("Function not implemented.")
  },
  changeByIndex: function (index: number, value: NamedStable): void {
    throw new Error("Function not implemented.")
  },
  create: function (value: NamedStable): void {
    throw new Error("Function not implemented.")
  }
}