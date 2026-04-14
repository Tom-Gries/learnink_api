import { NamedStable, Stable } from "../types/Stable.js";
import { createNamedQuestion } from "../namedObjects/Questions.js";

export function createNamedStable(value: any): NamedStable {
  if (value.name === undefined) throw new Error("Name fehlt");
  if (value.questions === undefined) throw new Error("Questions fehlen");

  const internalValue: Stable = {
    _id: value._id,
    name: value.name,
    questions: value.questions.map((q: any) => createNamedQuestion(q)),
  };

  return {
    getValue() {
      return internalValue;
    }
  };
}