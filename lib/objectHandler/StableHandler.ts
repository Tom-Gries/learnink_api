import clientPromise from "../db.js"
import { namedStable } from "../namedObjects/Stable.js"
import { ObjectHandler } from "../types/ObjectHandler.js"
import { NamedStable, DBStable } from "../types/Stable.js"

export const stableHandler: ObjectHandler<NamedStable, DBStable> = {
  init: async function (): Promise<ObjectHandler<NamedStable, DBStable>> {
    const client = await clientPromise
    const db = client.db("learnink")
    this.dbConnection = db.collection<DBStable>("staples")
    return this
  },
  dbConnection: null,
  getbyIndex: function (index: number): NamedStable {
    throw new Error("Function not implemented.")
  },
  getAll: async function (): Promise<NamedStable[]> {
    if (!this.dbConnection) throw new Error("DB-Verbindung nicht initialisiert")
    const data = await this.dbConnection.find().toArray()
    const value = data.map((item) => namedStable.setValue(item))
    return value
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
  create: async function (value: NamedStable): Promise<NamedStable> {
    if (!this.dbConnection) {
      throw new Error("DB-Verbindung nicht initialisiert")
    }

    const plain = value.toDB()

    if (Array.isArray(plain)) {
      throw new Error("create erwartet ein einzelnes Objekt")
    }

    const result = await this.dbConnection.insertOne(plain)

    return namedStable.setValue({
      ...plain,
      _id: result.insertedId
    })
  }
}