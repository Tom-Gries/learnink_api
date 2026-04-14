import { NamedObject } from "./NamedObject.js";

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

export interface DBQuestion extends Question, Document { }

export interface NamedQuestion extends NamedObject<Question> { }