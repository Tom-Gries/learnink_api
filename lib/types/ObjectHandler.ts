import { Collection } from "mongodb"

export interface ObjectHandler<T, S extends Document> {
  dbConnection: Collection<S> | null
  init: () => Promise<ObjectHandler<T, S>>
  getbyIndex: (index: number) => T | null
  getAll: () => Promise<T>
  add: (value: T) => void
  removeByIndex: (index: number) => void
  changeByIndex: (index: number, value: T) => void
  create: (value: T) => Promise<T>
}