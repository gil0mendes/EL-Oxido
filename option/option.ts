import { panic } from "../executor.ts";
import {
  IOptionPattern,
  None as INone,
  Option,
  Some as ISome,
} from "./option.interface.ts";

class Some<T> implements ISome<T> {
  public tag: "some" = "some";

  constructor(private readonly value: T) {}

  or(_: Option<T>): Option<T> {
    return this;
  }
  filter(fn: (t: T) => boolean): Option<T> {
    return fn(this.value as NonNullable<T>)
      ? some(this.value as NonNullable<T>)
      : none<T>();
  }
  andThen<U>(f: (val: NonNullable<T>) => Option<U>): Option<U> {
    return f(this.value as NonNullable<T>);
  }

  and<U>(optb: Option<U>): Option<U> {
    return optb;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(val: NonNullable<T>): T {
    return this.value;
  }

  unwrapOrElse(fn: () => NonNullable<T>): T {
    return this.value;
  }

  tap(val: Partial<IOptionPattern<T, void>>): void {
    typeof val.some === "function" && val.some(this.value as NonNullable<T>);
  }

  tapNone(fn: () => void): void {
    // Do nothing
  }

  tapSome(fn: (val: NonNullable<T>) => void): void {
    fn(this.value as NonNullable<T>);
  }

  match<R>(pattern: IOptionPattern<T, R>): R {
    return pattern.some(this.value as NonNullable<T>);
  }

  map<R>(fn: (t: NonNullable<T>) => NonNullable<R>): Option<R> {
    const value = fn(this.value as NonNullable<T>);
    return option(value);
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }
}

class None<T> implements INone<T> {
  public tag: "none" = "none";

  constructor() {}

  or(optb: Option<T>): Option<T> {
    return optb;
  }
  filter(_: (t: T) => boolean): Option<T> {
    return none<T>();
  }

  andThen<U>(f: (val: NonNullable<T>) => Option<U>): Option<U> {
    return none<U>();
  }

  and<U>(_: Option<U>): Option<U> {
    return none<U>();
  }

  unwrap(): T {
    panic("Called unwrap on a None");
  }

  unwrapOr(val: NonNullable<T>): T {
    return val;
  }

  unwrapOrElse(fn: () => NonNullable<T>): T {
    return fn();
  }

  tap(val: Partial<IOptionPattern<T, void>>): void {
    typeof val.none === "function" && val.none();
  }

  tapNone(fn: () => void): void {
    fn();
  }

  tapSome(fn: (val: NonNullable<T>) => void): void {
    // do nothing
  }

  match<R>(pattern: IOptionPattern<T, R>): R {
    return pattern.none();
  }

  map<R>(fn: (t: NonNullable<T>) => NonNullable<R>): Option<R> {
    return none<R>();
  }

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }
}

/**
 * Create a new None.
 */
export function none<T>(): Option<T> {
  return new None<T>();
}

/**
 * Create a new Some.
 * 
 * @param value value to be wrapped into an Option.
 */
export function some<T>(value: NonNullable<T>): Option<NonNullable<T>> {
  return new Some(value);
}

/**
 * Create a new Option.
 * 
 * @param value value to be warped inside an Option.
 */
export function option<T>(value?: T): Option<T> {
  return typeof value === "undefined" || value === null
    ? none<T>()
    : some(value as NonNullable<T>);
}
