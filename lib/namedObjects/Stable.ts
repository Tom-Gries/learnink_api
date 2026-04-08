import { NamedStable, Stable } from "../types/Stable.js";
import { namedQuestion } from "../namedObjects/Questions.js"

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
    if (value.name === undefined) throw new Error(value)
    if (value.questions === undefined) throw new Error("Questions fehlen")
    return {
      name: value.name,
      questions: namedQuestion.setValue(value.questions)
    }
  },
  createByArray(arr: any[]) {
    return arr.map(item => {
      return this.createValue(item)
    })
  },
  setValue(value: any) {
    this.handleValue(value)
    return this
  }
}