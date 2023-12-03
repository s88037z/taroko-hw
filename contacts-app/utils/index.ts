import { transform, snakeCase, isObject, isArray } from "lodash";
import { SnakeCase } from "@/utils/types";

export function toSnakeCaseKey<T extends Record<string, any>>(
  object: T
): SnakeCase<T> {
  const result = transform<Record<string, any>, Record<string, any>>(
    object,
    (acc, value, key, target) => {
      const snakeKey = isArray(target) ? key : snakeCase(key);

      acc[snakeKey] = isObject(value) ? toSnakeCaseKey(value) : value;
    }
  );
  return result as SnakeCase<T>;
}
