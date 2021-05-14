/**
 * Set of utils that are really handy on day to day development as well as for us that we are developing this library.
 */

/**
 * Unsafe data type for that cases that we really don't know what type will be.
 * 
 * Note: avoid using this as much as possible, this must only be used for base functions, not on production code.
 */
// deno-lint-ignore no-explicit-any
export type UnsafeType = any;

/**
 * Test if a value is primitive
 * 
 * @param v 
 */
export const isPrimitive = (v: UnsafeType) => v !== Object(v);

/**
 * Checks whether a value is null or undefined
 * 
 * 
 * @param v 
 */
export const isNil = (v: UnsafeType) => v === undefined || v === null;

/**
 * Returns true when the value is not either null or undefined.
 * 
 * @param v 
 */
export const isDef = (v: UnsafeType) => !isNil(v);

/**
 * Determine type of an object.
 * 
 * @param v 
 */
export const type = (v: UnsafeType) => isDef(v) ? v.constructor : v;

/**
 * Given a type, determine it's name.
 * 
 * @param v 
 */
export const typename = (v: UnsafeType): string => isDef(v) ? v.name : `${v}`;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".
 * 
 * @param value 
 */
export const isObjectLike = (value: UnsafeType) =>
  isDef(value) && typeof value === "object";

/**
 * Checks if `value` is a plain object, that is, an object created by the `Object` constructor or one with a 
 * `[[Prototype]]` of `null`.
 * 
 * @param value 
 */
export const isPlainObject = (value: UnsafeType) => {
  if (!isObjectLike(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }

  const Ctor = Object.hasOwnProperty.call(proto, "constructor") &&
    proto.constructor;

  return typeof Ctor === "function" && Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object);
};
