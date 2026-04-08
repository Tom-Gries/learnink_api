import { NamedQuestion, Question } from "@lib/types/Question";

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
    this.handleValue(value)
    return this
  },
  handleValue(value: any) {
    if (Array.isArray(value)) {
      this.value = this.createByArray(value)
    } else {
      this.value = this.createValue(value)
    }
  },
  createValue(value: any) {
    if (value.text === undefined) throw new Error("Text fehlt")
    if (value.answers === undefined) throw new Error("Antworten fehlen")
    return {
      text: value.text,
      answers: value.answers
    }
  },
  createByArray(arr: any[]) {
    return arr.map(item => {
      return this.createValue(item)
    })
  },
}