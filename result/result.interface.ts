import { Option } from "../option/option.interface.ts";

/**
 * Interface that describe a structure that handlers error and their propagation.
 */
interface IResult<T, E> {
  /**
   * Returns true if the result is Ok.
   */
  isOk(): boolean;

  /**
   * Returns true if the result is Err.
   */
  isErr(): boolean;

  /**
   * Returns true if the result is an Ok value containing the given value.
   */
  contains(x: T): boolean;

  /**
   * Returns true if the result is an Err value containing the given value.
   * 
   * @param f 
   */
  containsErr(f: E): boolean;

  /**
   * Converts from Result<T, E> to Option<T>.
   * 
   * Converts this into an Option<T>, consuming this, and discarding the error, if any.
   */
  ok(): Option<T>;

  /**
   * Converts from Result<T, E> to Option<E>.
   * 
   * Converts this into an Option<E>, consuming this, and discarding the success value, if any.
   */
  err(): Option<E>;
}

export interface Ok<T, E> extends IResult<T, E> {
  tag: "ok";
}

export interface Err<T, E> extends IResult<T, E> {
  tag: "error";
}

/**
 * Result is a type that represents either success (Ok) or failure (Err).
 */
export type Result<T, E> = Ok<T, E> | Err<T, E>;
