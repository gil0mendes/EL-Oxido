/**
 * Test if a value is primitive
 * 
 * @param v 
 */
// deno-lint-ignore no-explicit-any
export const isPrimitive = (v: any) => v !== Object(v);

/**
 * Checks whether a value is null or undefined
 * 
 * 
 * @param v 
 */
// deno-lint-ignore no-explicit-any
export const isNil = (v: any) => v === undefined || v === null;

/**
 * Returns true when the value is not either null or undefined.
 * 
 * @param v 
 */
// deno-lint-ignore no-explicit-any
export const isDef = (v: any) => !isNil(v);

/**
 * Determine type of an object.
 * 
 * @param v 
 */
// deno-lint-ignore no-explicit-any
export const type = (v: any) => isDef(v) ? v.constructor : v;

/**
 * Given a type, determine it's name.
 * 
 * @param v 
 */
// deno-lint-ignore no-explicit-any
export const typename = (v: any): string => isDef(v) ? v.name : `${v}`;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".
 * 
 * @param value 
 */
// deno-lint-ignore no-explicit-any
export const isObjectLike = (value: any) =>
  isDef(value) && typeof value === "object";

/**
 * Checks if `value` is a plain object, that is, an object created by the `Object` constructor or one with a 
 * `[[Prototype]]` of `null`.
 * 
 * @param value 
 */
// deno-lint-ignore no-explicit-any
export const isPlainObject = (value: any) => {
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
