import { NamedStable, Stable } from "../types/Stable";

const defaultValue: Stable = {
  name: "",
  questions: []
}

export const namedQuestion: NamedStable = {
  value: defaultValue,
  getValue() {
    return this.value;
  },
  setValue(value: Stable) {
    this.value = value;
  }
}