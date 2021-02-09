import { Err as IErr, Ok as IOk, Result } from "./result.interface.ts";

class Ok<T, E> implements IOk<T, E> {
  public readonly tag: "ok" = "ok";

  /**
   * Create a new Ok instance.
   * 
   * @param value 
   */
  public constructor(private readonly value: T) {}

  contains(x: T): boolean {
    // TODO: implement complex equality logic
    return this.value === x;
  }

  isErr(): boolean {
    return false;
  }

  isOk(): boolean {
    return true;
  }
}

class Err<T, E> implements IErr<T, E> {
  public readonly tag: "error" = "error";

  /**
   * Create a new Err instance.
   * 
   * @param value 
   */
  public constructor(private readonly value: E) {}

  contains(_: T): boolean {
    return false;
  }

  isErr(): boolean {
    return true;
  }

  isOk(): boolean {
    return false;
  }
}

/**
 * Create a new Ok value.
 * 
 * @param value 
 */
export function ok<T, E>(value: T): Result<T, E> {
  return new Ok(value);
}

/**
 * Create a new Err value.
 * 
 * @param value 
 */
export function err<T, E>(value: E): Result<T, E> {
  return new Err(value);
}
