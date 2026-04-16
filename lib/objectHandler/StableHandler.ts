import { ObjectId } from "mongodb"
import clientPromise from "../db.js"
import { createNamedStable } from "../namedObjects/CreateNamedStable.js"
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
  getAll: async function (): Promise<NamedStable[]> {
    if (!this.dbConnection) throw new Error("DB-Verbindung nicht initialisiert")
    const data = await this.dbConnection.find().toArray()
    const value = data.map((item) => createNamedStable(item))
    return value
  },
  add: function (value: NamedStable): void {
    throw new Error("Function not implemented.")
  },
  removeByIndex: function (index: number): void {
    throw new Error("Function not implemented.")
  },
  changeByIndex: async function (value: NamedStable): Promise<NamedStable> {
    if (!this.dbConnection) {
      throw new Error("DB-Verbindung nicht initialisiert");
    }

    const plain = value.getValue();

    if (!plain._id) {
      throw new Error("Kein _id vorhanden");
    }

    const { _id, ...rest } = plain;

    // Sicherstellen, dass _id korrekt ein ObjectId ist
    const id = typeof _id === "string" ? new ObjectId(_id) : _id;

    const updatedDocument = await this.dbConnection.findOneAndUpdate(
      { _id: id },
      { $set: rest },
      { returnDocument: "after" }
    );

    if (!updatedDocument) {
      throw new Error("Dokument nicht gefunden");
    }

    return createNamedStable(updatedDocument);
  },
  create: async function (value: NamedStable): Promise<NamedStable> {
    if (!this.dbConnection) {
      throw new Error("DB-Verbindung nicht initialisiert")
    }

    const plain = value.getValue()
    const result = await this.dbConnection.insertOne({
      name: plain.name,
      questions: plain.questions,
    })

    return createNamedStable({
      ...plain,
      _id: result.insertedId
    })
  }
}