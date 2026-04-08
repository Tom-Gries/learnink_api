import { NamedStable, Stable } from "../types/Stable";
import { namedQuestion } from "./Questions";

const defaultValue: Stable = {
  name: "",
  questions: null
}

export const namedStable: NamedStable = {
  value: defaultValue,
  getValue() {
    return this.value;
  },
  handleValue(value: any) {
    if (Array.isArray(value)) {
      this.value = this.createByArray(value)
    } else {
      this.value = this.createValue(value)
    }
  },
  createValue(value: any): Stable {
    if (value.text === undefined) throw new Error("Text fehlt")
    if (value.questions === undefined) throw new Error("Antworten fehlen")
    return {
      name: value.text,
      questions: namedQuestion.setValue(value.questions)
    }
  },
  createByArray(arr: any[]) {
    return arr.map(item => {
      return this.createValue(item)
    })
  },
  setValue(value: any) {
    if (value.name === undefined) throw new Error("Name fehlt")
    this.handleValue(value)
    return this
  }
}