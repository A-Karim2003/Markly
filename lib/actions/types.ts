export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type VoidResult = Result<null>;
