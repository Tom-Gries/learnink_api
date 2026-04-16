import { ObjectId } from "mongodb";
import { NamedObject } from "./NamedObject.js"

export type Answer = {
  id?: string;
  text: string;
  isCorrect: boolean;
}

export type Question = {
  id?: string;
  text: string;
  answers: Answer[];
};

export interface Stable {
  _id?: ObjectId
  name: string
  questions: Question[]
}


export interface NamedStable extends NamedObject<Stable> { }