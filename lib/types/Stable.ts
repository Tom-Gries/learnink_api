import { NamedObject } from "./NamedObject"
import { NamedQuestion } from "./Question";

export interface Stable {
  _id?: string
  name: string
  questions: NamedQuestion | null
}

export interface NamedStable extends NamedObject<Stable> { }