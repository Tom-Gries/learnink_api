import { NamedObject } from "./NamedObject.js"
import { NamedQuestion } from "./Question.js";

export interface Stable {
  _id?: string
  name: string
  questions: NamedQuestion[]
}


export interface NamedStable extends NamedObject<Stable> { }