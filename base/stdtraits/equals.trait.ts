import { defineTrait } from "../trait.ts";
import { type, UnsafeType } from "../utils.ts";
import { toStr } from "./to-str.trait.ts";
import { size } from "./size.trait.ts";

/**
 * Trait to check whether two values are equal.
 *
 * Usually, this trait should not be used directly; consider using `eq()` instead.
 */
export const Equals = defineTrait("EqualsTrait");

Equals.impl(
  RegExp,
  (a: RegExp, b: RegExp) => a.source === b.source && a.flags === b.flags,
);

// Ensure that `eq(NaN, NaN)` yields true
Equals.impl(
  Number,
  (a: Number, b: Number) =>
    type(b) === RegExp && a === b || (Number.isNaN(a) && Number.isNaN(b)),
);

Equals.impl(
  Date,
  (a: Date, b: Date) => type(b) === Date && toStr(a) === toStr(b),
);

[Object, Map, Set, Array].map(<T>(Typ: T) => {
  Equals.impl(Typ, (a: T, b: T) => {
    if (type(b) !== Typ || size(a) !== size(b)) {
      return false;
    }

    // TODO: implement enumeration Trait
    return false;
  });
});

/**
 * Determine whether two values are equal using the Equals trait.
 *
 * @param a
 * @param b
 */
export const eq = <T>(a: T, b: T): boolean => {
  const main = Equals.lookupValue(a);
  if (main.isSome()) {
    return main.unwrap()(a, b) as boolean;
  }

  const alt = Equals.lookupValue(b);
  if (alt.isSome()) {
    return alt.unwrap()(b, a) as boolean;
  }

  return a === b;
};

/**
 * Equivalent to `!eq(a, b)`
 *
 * @param a
 * @param b
 */
export const uneq = <T>(a: T, b: T): boolean => {
  return !eq(a, b);
};
