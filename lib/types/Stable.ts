import { NamedObject } from "@lib/types/NamedObject"
import { NamedQuestion } from "@lib/types/Question";

export interface Stable {
  _id?: string
  name: string
  questions: NamedQuestion | null
}

export interface NamedStable extends NamedObject<Stable> { }