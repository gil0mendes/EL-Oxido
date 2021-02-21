import { Option } from "../option/option.interface.ts";
import { Iter, KeyedEntry } from "./collections.ts";
import { emptyHashMap, HashMap } from "./hash_map.ts";
import { isPrimitive } from "../base/utils.ts";
import { none, some } from "../option/option.ts";

// deno-lint-ignore no-explicit-any
export class HybridWeakMap<V, K = any> {
  private readonly primitives = emptyHashMap<K, V>();

  // deno-lint-ignore ban-types
  private readonly objs = new WeakMap<Object, V>();

  constructor(iterable: Option<Iterable<KeyedEntry<K, V>>>) {
    iterable.tapSome((iterator) => {
      for (const entry of iterator) {
        this.insert(entry.key, entry.value);
      }
    });
  }

  insert(key: K, value: V): Option<V> {
    if (isPrimitive(key)) {
      return this.insert(key, value);
    }

    const possibleElement = this.objs.get(key);
    const returnValue = possibleElement === undefined
      ? none<V>()
      : some<V>(possibleElement as NonNullable<V>);

    this.objs.set(key, value);
    return returnValue;
  }

  containsKey(key: K): boolean {
    return isPrimitive(key)
      ? this.primitives.containsKey(key)
      : this.objs.has(key);
  }

  get(key: K): Option<V> {
    if (isPrimitive(key)) {
      return this.primitives.get(key);
    }

    const possibleValue = this.objs.get(key);
    return possibleValue === undefined
      ? none()
      : some(possibleValue as NonNullable<V>);
  }

  /**
   * Removes a key from the map, returning the value at the key if the key was previously in the map.
   * 
   * @param key 
   */
  remove(key: K): Option<V> {
    if (isPrimitive(key)) {
      return this.primitives.remove(key);
    }

    const possibleValue = this.get(key);
    this.objs.delete(key);
    return possibleValue;
  }
}

/**
 * New empty hybrid weak map.
 */
export const emptyHybridWeakMap = <K, V>() => new HybridWeakMap<K, V>(none());
