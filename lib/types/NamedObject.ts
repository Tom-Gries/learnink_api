
export interface NamedObject<T = string,> {
  value: T
  getValue: () => T
  setValue: (value: any) => NamedObject<T>
}