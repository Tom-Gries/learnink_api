import { Collection } from "mongodb"
import { NamedObject } from "./NamedObject.js"


export interface ObjectHandler<T = NamedObject> {
  dbConnection: Collection<Document> | null
  init: () => Promise<ObjectHandler<T>>
  getbyIndex: (index: number) => T | null
  getAll: () => Promise<T>
  add: (value: T) => void
  removeByIndex: (index: number) => void
  changeByIndex: (index: number, value: T) => void
  create: (value: T) => void
}