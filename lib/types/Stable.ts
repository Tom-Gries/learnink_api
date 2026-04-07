import { NamedObject } from "./NamedObject"
import { Question } from "./Question"

export interface Stable {
  _id?: string
  name: string
  questions: Question[]
}

export interface NamedStable extends NamedObject<Stable> { }