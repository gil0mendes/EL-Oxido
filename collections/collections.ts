import { none, some } from "../option/option.ts";
import { Option } from "../option/option.interface.ts";

/**
 * Data type that represented a keyed value.
 * 
 * This is used by HashMaps collections.
 */
export type KeyedEntry<K, V> = {
  key: K;
  value: V;
};

/**
 * Iterator for keyed values.
 */
export type KeyedIter<K, V> = Iterable<KeyedEntry<K, V>>;

/**
 * An interface for dealing with iterators.
 */
export interface Iter<T> {
  /**
   * Advances the iterator and returns the next value.
   * 
   * Returns None when iteration is finished.
   */
  next(): Option<T>;
}

/**
 * Base generic iterator.
 * 
 * This must be the base for other iterators.
 */
export abstract class BaseIter<T> implements Iter<T> {
  abstract next(): Option<T>;
}

/**
 * Generic iterator to be used with native Iterators.
 */
class GenericIterator<V> extends BaseIter<V> {
  constructor(private readonly iterator: Iterator<V>) {
    super();
  }

  next(): Option<V> {
    const nextItem = this.iterator.next();
    return nextItem.done
      ? none<V>()
      : some<V>(nextItem.value as NonNullable<V>);
  }
}

/**
 * Create a new iterator based on a native Iterator.
 * 
 * @param iterator 
 */
export function createIterator<T>(iterator: Iterator<T>) {
  return new GenericIterator(iterator);
}
