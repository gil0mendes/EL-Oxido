import { UnsafeType } from "../utils.ts";
import { Trait } from "./trait.ts";
import { none } from "../../option/option.ts";
import { HashMap, HashMapImpl } from "../../collections/hash_map.ts";

/**
 * Implement this to get the size of a type/container.
 */
export const Size = new Trait<number>("Size", none());

// implement the Size trait into the native JS types
[String, Array].map((Type: unknown) => Size.impl(Type, (x) => x.length));

[Map, Set].map((Type: unknown) => Size.impl(Type, (x) => x.size));

// NOTE: We can't implement this directly on the type definition because this type is used by the Trait implementation.
// That creates a circular dependency.
Size.impl(HashMapImpl, <K, V>(hm: HashMap<K, V>) => hm.len());

// TODO: implement for Object

/**
 * Determine the size of a container.
 *
 * This uses the Size trait.
 *
 * @param what
 * @returns
 */
export const size = (what: UnsafeType) => Size.invoke(what);

/**
 * Determine if a container is empty.
 *
 * @param what
 * @returns
 */
export const empty = (what: UnsafeType): boolean => size(what).contains(0);
