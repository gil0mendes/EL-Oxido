import { UnsafeType } from "../utils.ts";
import { defineTrait } from "./trait.ts";

/**
 * Implement to get a string representation of a type.
 */
export const ToStr = defineTrait("ToStr");

/**
 * Get type string representation.
 *
 * @param what
 * @returns
 */
export const toStr = (what: UnsafeType) => ToStr.invoke(what);
