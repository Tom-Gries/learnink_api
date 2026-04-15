import { ObjectId } from "mongodb";
import { NamedObject } from "./NamedObject.js"
import { NamedQuestion } from "./Question.js";

export interface Stable {
  _id?: ObjectId
  name: string
  questions: NamedQuestion[]
}


export interface NamedStable extends NamedObject<Stable> { }