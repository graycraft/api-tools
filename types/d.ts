/**
 * Type definitions for common application use cases.
 */

export type Dict<T = string> = {
  [key: string]: T;
};
export type DictLike<T = string> = {
  [key: string]: T | T[];
};
