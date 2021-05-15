import { UnsafeType } from "../utils.ts";
import { defineTrait } from "./trait.ts";

const CopyTrait = defineTrait("CopyTrait");

/**
 * CopyTrait an object.
 * @param a
 */
export const copy = (a: UnsafeType) => CopyTrait.invoke(a);
