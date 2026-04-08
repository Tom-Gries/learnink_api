export interface NamedObject<T = string> {
  value: T | (T | null)[] | null
  getValue: () => T | (T | null)[] | null
  setValue: (value: any) => NamedObject<T>
  handleValue: (value: any) => void
  createByArray: (arr: any[]) => (T | null)[]
  createValue: (value: any) => T | null
}