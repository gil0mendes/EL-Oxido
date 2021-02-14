import { none, some } from "../option/option.ts";
import { Option } from "../option/option.interface.ts";
import { Err as IErr, Ok as IOk, Result } from "./result.interface.ts";

class Ok<T, E> implements IOk<T, E> {
  public readonly tag: "ok" = "ok";

  /**
   * Create a new Ok instance.
   * 
   * @param value 
   */
  public constructor(private readonly value: T) {}

  and<U>(res: Result<U, E>): Result<U, E> {
    return res;
  }

  andThen<U>(op: (val: T) => Result<U, E>): Result<U, E> {
    return op(this.value);
  }

  mapErr<F>(op: (val: E) => F): Result<T, F> {
    return ok<T, F>(this.value);
  }

  mapOrElse<U>(_: (val: E) => U, f: (val: T) => U): U {
    return f(this.value);
  }

  mapOr<U>(_: U, f: (val: T) => U): U {
    return f(this.value);
  }

  map<U>(f: (val: T) => U): Result<U, E> {
    return ok<U, E>(f(this.value));
  }

  err(): Option<E> {
    return none<E>();
  }

  ok(): Option<T> {
    return some(this.value as NonNullable<T>);
  }

  containsErr(f: E): boolean {
    return false;
  }

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

  and<U>(_: Result<U, E>): Result<U, E> {
    return err(this.value);
  }

  andThen<U>(op: (val: T) => Result<U, E>): Result<U, E> {
    return err(this.value);
  }

  mapErr<F>(op: (val: E) => F): Result<T, F> {
    return err(op(this.value));
  }

  mapOrElse<U>(defaultF: (val: E) => U, _: (val: T) => U): U {
    return defaultF(this.value);
  }

  mapOr<U>(defaultVal: U, _: (val: T) => U): U {
    return defaultVal;
  }

  map<U>(f: (val: T) => U): Result<U, E> {
    return err<U, E>(this.value);
  }

  err(): Option<E> {
    return some<E>(this.value as NonNullable<E>);
  }

  ok(): Option<T> {
    return none<T>();
  }

  containsErr(f: E): boolean {
    // TODO: implement complex equality logic
    return this.value === f;
  }

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
