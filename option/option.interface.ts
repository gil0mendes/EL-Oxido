/**
 * Define a contract to unwrap Option objects.
 */
export interface IOptionPattern<TIn, TOut> {
  /**
   * Function to handle when a value exists.
   */
  some(val: NonNullable<TIn>): TOut;

  /**
   * Function to handle when a value is undefined.
   */
  none(): TOut;
}

/**
 * Abstract for handling possibility of undefined or null values.
 */
export interface IOption<T> {
  /**
   * Returns None if the option is None, otherwise returns optb.
   */
  and<U>(optb: Option<U>): Option<U>;

  /**
   * Returns None if the option is None, otherwise calls f with the wrapped value and returns the result.
   * 
   * Some languages call this operation flatmap.
   * 
   * @param f Function being executed when is a Some.
   */
  andThen<U>(f: (val: NonNullable<T>) => Option<U>): Option<U>;

  /**
   * Returns None if the option is None, otherwise calls predicate with the wrapped value and returns:
   * 
   * - Some(t) if predicate returns true (where t is the wrapped value), and
   * - None if predicate returns false.
   */
  filter(fn: (t: T) => boolean): Option<T>;

  /**
   * Returns the option if it contains a value, otherwise returns optb.
   * 
   * Arguments passed to or are eagerly evaluated; if you are passing the result of a function call, it is recommended 
   * to use or_else, which is lazily evaluated.
   */
  or(optb: Option<T>): Option<T>;

  /**
   * Moves the value out of the Option if it is Some.
   *
   * In general, because this function may panic, its use is discouraged. Instead, prefer to use pattern matching and
   * handle the None case explicitly.
   */
  unwrap(): T;

  /**
   * Unwrap a Option with a default value.
   */
  unwrapOr(val: NonNullable<T>): T;

  /**
   * Unwrap a Option with a default computed value.
   */
  unwrapOrElse(fn: () => NonNullable<T>): T;

  /**
   * Execute functions with side-effects.
   */
  tap(val: Partial<IOptionPattern<T, void>>): void;

  /**
   * Execute a function with side-effects when maybe is a none
   */
  tapNone(fn: () => void): void;

  /**
   * Execute a function with side-effect when maybe is a some
   */
  tapSome(fn: (val: NonNullable<T>) => void): void;

  /**
   * Unwrap and apply MaybePattern function
   */
  match<R>(pattern: IOptionPattern<T, R>): R;

  /**
   * Convert an Option<T> into Option<R> by applying a function to a contained value.
   */
  map<R>(fn: (t: NonNullable<T>) => NonNullable<R>): Option<R>;

  /**
   * Returns true if value is not empty
   */
  isSome(): boolean;

  /**
   * Return true if value is empty
   */
  isNone(): boolean;
}

export interface Some<T> extends IOption<T> {
  tag: "some";
}

export interface None<T> extends IOption<T> {
  tag: "none";
}

/**
 * This is a union type to allow custom match syntax using the typechecker.
 */
export type Option<T> = Some<T> | None<T>;
