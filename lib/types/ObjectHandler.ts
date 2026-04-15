import { Collection, Document } from "mongodb"

export interface ObjectHandler<T> {
  dbConnection: Collection<Document> | null
  init: () => Promise<ObjectHandler<T>>
  getbyIndex: (index: number) => T | null
  getAll: () => Promise<T[]>
  add: (value: T) => void
  removeByIndex: (index: number) => void
  changeByIndex: (value: T) => Promise<T>
  create: (value: T) => Promise<T>
}