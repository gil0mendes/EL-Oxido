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

  /**
   * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
   * 
   * This function can be used to compose the results of two functions.
   * 
   * @param f 
   */
  map<U>(f: (val: T) => U): Result<U, E>;

  /**
   * Applies a function to the contained value (if Ok), or returns the provided default (if Err).
   * 
   * Arguments passed to mapOr are eagerly evaluated; if you are passing the result of a function call, it is 
   * recommended to use mapOrElse, which is lazily evaluated.
   * 
   * @param defaultVal 
   * @param f 
   */
  mapOr<U>(defaultVal: U, f: (val: T) => U): U;

  /**
   * Maps a Result<T, E> to U by applying a function to a contained Ok value, or a fallback function to a contained Err 
   * value.
   * 
   * This function can be used to unpack a successful result while handling an error.
   * 
   * @param defaultF 
   * @param f 
   */
  mapOrElse<U>(defaultF: (val: E) => U, f: (val: T) => U): U;

  /**
   * Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
   * 
   * This function can be used to pass through a successful result while handling an error.
   * 
   * @param op 
   */
  mapErr<F>(op: (val: E) => F): Result<T, F>;
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
