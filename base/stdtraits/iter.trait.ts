import { defineTrait } from "./trait.ts";
import { createIterator, Iter } from "../../collections/collections.ts";
import { UnsafeType } from "../utils.ts";

/**
 * Trait that defines a iterator.
 */
export const IterTrait = defineTrait<Iter<UnsafeType>>("iter");

export const iter = <T>(x: T) => IterTrait.invoke(x);

// Implement iterator for primitive array type
IterTrait.impl(Array, (obj: Array<UnsafeType>) => createIterator(obj.values()));

// Implement iterator for strings
IterTrait.impl(String, (obj: string) => createIterator(obj.split("").values()));
