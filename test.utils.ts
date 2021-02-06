import { assertEquals, fail } from "./deps-test.ts";
export { assertEquals, fail };

/**
 * Type of the test function.
 */
type TTestFn = () => void;

/**
 * Type of the when function.
 */
type TWhenFn = (
  str: string,
  fn: (fns: IWhenFns) => IWhenFns | void,
) => (IWhenFns | void);

/**
 * Type returned by the when function.
 */
interface IWhenFns {
  test: (name: string, fn: TTestFn) => void;
  when: TWhenFn;
}

/**
 * Util function to declare a test case.
 * 
 * @param name test name
 * @param fn test function
 */

export const test = (name: string, fn: TTestFn) =>
  Deno.test({
    name,
    fn,
  });

/**
 * Check if the value is true.
 * 
 * @param value value to be tested
 */
export const assertTrue = (value: boolean) => assertEquals(value, true);

/**
 * Check if the value is false.
 * 
 * @param value value to be tested
 */
export const assertFalse = (value: boolean) => assertEquals(value, false);

export function when(
  str: string,
  fn: (fns: IWhenFns) => IWhenFns | void,
): IWhenFns | void {
  const testWithStr = (name: string, fn: TTestFn) =>
    test(`when ${str} ${name}`, fn);

  const whenWithStr: TWhenFn = (
    name: string,
    fn: (fns: IWhenFns) => IWhenFns | void,
  ) => when(`${str} when ${name}`, fn);

  return fn({
    test: testWithStr,
    when: whenWithStr,
  });
}
