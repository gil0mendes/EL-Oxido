import { IMonad, Map } from "./monad.interface.ts";

export abstract class Monad<T> implements IMonad<T> {
  abstract of(x: T): IMonad<T>;
  abstract flatMap<U>(fn: Map<T, IMonad<U>>): IMonad<U>;
}
