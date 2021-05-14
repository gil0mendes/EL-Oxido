import { defineTrait } from "../trait.ts";
import { UnsafeType } from "../utils.ts";

/**
 * Implement this to get the size of a type/container.
 */
export const Size = defineTrait<number>("Size");

// implement the Size trait into the native JS types
[String, Array].map((Type: unknown) => Size.impl(Type, (x) => x.length));

[Map, Set].map((Type: unknown) => Size.impl(Type, (x) => x.size));

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
