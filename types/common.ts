/**
 * Type definitions for common application use cases.
 */

export type dictLike<T = string> = {
  [key: string]: T | T[];
};

export type dictionary<T = string> = {
  [key: string]: T;
};
