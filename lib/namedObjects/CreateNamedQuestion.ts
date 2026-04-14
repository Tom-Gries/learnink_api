import { NamedQuestion, Question } from "../types/Question.js";

export function createNamedQuestion(value: any): NamedQuestion {
  if (value.text === undefined) throw new Error("Text fehlt");
  if (value.answers === undefined) throw new Error("Antworten fehlen");

  const internalValue: Question = {
    text: value.text,
    answers: value.answers
  };

  return {
    getValue() {
      return internalValue;
    }
  };
}