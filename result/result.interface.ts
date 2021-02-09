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
   * 
   * @param f 
   */
  containsErr(f: E): boolean;
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
