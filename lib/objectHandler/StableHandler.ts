import clientPromise from "../db.js"
import { namedStable } from "../namedObjects/Stable.js"
import { ObjectHandler } from "../types/ObjectHandler.js"
import { NamedStable, Stable } from "../types/Stable.js"

export const stableHandler: ObjectHandler<NamedStable, Stable> = {
  init: async function (): Promise<ObjectHandler<NamedStable, Stable>> {
    const client = await clientPromise
    const db = client.db("learnink")
    this.dbConnection = db.collection<Stable>("staples")
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
  create: async function (value: NamedStable): Promise<NamedStable> {
    if (!this.dbConnection) {
      throw new Error("DB-Verbindung nicht initialisiert")
    }

    const plain = value.getValue()

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