import { NamedObject } from "./NamedObject.js"
import { DBQuestion, NamedQuestion } from "./Question.js";
import { Document } from "mongodb"

export interface Stable {
  _id?: string
  name: string
  questions: NamedQuestion | null
}

export interface DBStable extends Document {
  _id?: string
  name: string
  questions: DBQuestion[] | null
}

export interface NamedStable extends NamedObject<Stable> { }