import { Size } from "../base/stdtraits/size.trait.ts";
import { Option } from "../option/option.interface.ts";
import { none, some } from "../option/option.ts";
import { createIterator, Iter, KeyedIter } from "./collections.ts";

/**
 * An iterator over the keys of a HashMap.
 */
type Keys<T> = Iter<T>;

/**
 * An iterator over the values of a HashMap.
 */
type Values<T> = Iter<T>;

/**
 * A hash map implementation.
 */
export interface HashMap<K, V> {
  /**
   * An iterator visiting all keys in arbitrary order.
   */
  keys(): Keys<K>;

  /**
   * An iterator visiting all values in arbitrary order.
   */
  values(): Values<V>;

  /**
   * Returns the number of elements in the map.
   */
  len(): number;

  /**
   * Inserts a key-value pair into the map.
   *
   * If the map did not have this key present, None is returned.
   *
   * If the map did have this key present, the value is updated, and the old value is returned.
   */
  insert(key: K, value: V): Option<V>;

  /**
   * Returns true if the map contains a value for the specified key.
   *
   * @param key
   */
  containsKey(key: K): boolean;

  /**
   * Returns the value corresponding to the key.
   *
   * @param key
   */
  get(key: K): Option<V>;

  /**
   * Removes a key from the map, returning the value at the key if the key was previously in the map.
   *
   * @param key
   */
  remove(key: K): Option<V>;
}

export class HashMapImpl<K, V> implements HashMap<K, V> {
  /**
   * Internal map here we hold the values.
   */
  private readonly internalMap = new globalThis.Map<K, V>();

  keys(): Keys<K> {
    return createIterator(this.internalMap.keys());
  }

  values(): Values<V> {
    return createIterator(this.internalMap.values());
  }

  len() {
    return this.internalMap.size;
  }

  insert(key: K, value: V): Option<V> {
    const previousElement = this.internalMap.get(key);
    const returnValue = previousElement === undefined
      ? none<V>()
      : some<V>(previousElement as NonNullable<V>);

    this.internalMap.set(key, value);

    return returnValue;
  }

  containsKey(key: K): boolean {
    return this.internalMap.has(key);
  }

  get(key: K): Option<V> {
    const possibleValue = this.internalMap.get(key);
    return possibleValue === undefined
      ? none()
      : some(possibleValue as NonNullable<V>);
  }

  remove(key: K): Option<V> {
    const removedValue = this.get(key);
    this.internalMap.delete(key);
    return removedValue;
  }

  // TODO: implement iterator
}

/**
 * Creates an empty HashMap.
 */
export function emptyHashMap<K, V>(): HashMap<K, V> {
  return new HashMapImpl<K, V>();
}

/**
 * Create a new HashMap with the data given by the iterator.
 *
 * @param iter
 */
export function HashMapFromIterator<K, V>(
  iter: KeyedIter<K, V>,
): HashMap<K, V> {
  const map = new HashMapImpl<K, V>();

  for (const entry of iter) {
    // map.
  }

  return map;
}
