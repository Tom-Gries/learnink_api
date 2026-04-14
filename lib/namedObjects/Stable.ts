import { NamedStable, Stable } from "../types/Stable.js";
import { namedQuestion } from "../namedObjects/Questions.js"

const defaultValue: Stable = {
  name: "",
  questions: [],
  _id: undefined
}

export const namedStable: NamedStable = {
  value: defaultValue,
  getValue() {
    return this.value;
  },
  setValue(value: any): NamedStable {
    if (value.name === undefined) throw new Error(value)
    if (value.questions === undefined) throw new Error("Questions fehlen")


    throw new Error(value.questions)
    this.value = {
      _id: value._id,
      name: value.name,
      questions: value.questions.map((q: any) => namedQuestion.setValue(q)),
    }
    return this
  },
}