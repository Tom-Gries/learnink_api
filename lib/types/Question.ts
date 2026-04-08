import { NamedObject } from "@lib/types/NamedObject";

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

export interface NamedQuestion extends NamedObject<Question> { }