/**
 * Test if a value is primitive
 * 
 * @param v 
 */
// deno-lint-ignore no-explicit-any
export const isPrimitive = (v: any) => v !== Object(v);
