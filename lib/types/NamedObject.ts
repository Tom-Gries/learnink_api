export interface NamedObject<T = string> {
  value: T
  getValue: () => T
  setValue: (value: T) => void
}