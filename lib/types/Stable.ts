import { ObjectId } from "mongodb";
import { NamedObject } from "./NamedObject.js"
import { Question } from "./Question.js";

export interface Stable {
  _id?: ObjectId
  name: string
  questions: Question[]
}


export interface NamedStable extends NamedObject<Stable> { }