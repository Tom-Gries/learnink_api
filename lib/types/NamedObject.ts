export interface NamedObject<T = string> {
  value: T | T[]
  getValue: () => T | T[]
  setValue: (value: any) => NamedObject<T>
  handleValue: (value: any) => void
  createByArray: (arr: any[]) => T[]
  createValue: (value: any) => T
}