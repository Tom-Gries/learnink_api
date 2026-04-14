import { NamedQuestion, Question } from "../types/Question.js";

const defaultQuestion: Question = {
  text: "",
  answers: []
}

export const namedQuestion: NamedQuestion = {
  value: defaultQuestion,
  getValue() {
    return this.value;
  },
  setValue(value: any) {
    if (value.text === undefined) throw new Error("Text fehlt")
    if (value.answers === undefined) throw new Error("Antworten fehlen")

    this.value = {
      text: value.text,
      answers: value.answers
    }

    return this
  },
}