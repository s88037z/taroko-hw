type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;

export type CamelCase<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: CamelCase<T[K]>;
    }
  : T;
export type SnakeCase<T> = T extends object
  ? {
      [K in keyof T as CamelToSnakeCase<K & string>]: SnakeCase<T[K]>;
    }
  : T;
