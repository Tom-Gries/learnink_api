import { NamedQuestion, Question } from "../types/Question";

const defaultQuestion: Question = {
  text: "",
  answers: []
}

export const namedQuestion: NamedQuestion = {
  value: defaultQuestion,
  getValue() {
    return this.value;
  },
  setValue(value: Question) {
    this.value = value;
  }
}