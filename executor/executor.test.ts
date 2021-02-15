import { assertEquals, assertTrue, fail, when } from "../test.utils.ts";
import { panic, unsafe, unsafeAsync } from "./executor.ts";

when("Executor", ({ when, test }) => {
  test("panic throws an exception", () => {
    try {
      panic("this is an exception");
      fail("must fail");
    } catch (e) {
      assertEquals(e.message, "this is an exception");
    }
  });

  when("unsafe", ({ test }) => {
    test("the function does not throw an exception returns the result", () => {
      const testDivision = () => 10 / 2;
      assertTrue(unsafe(testDivision).contains(5));
    });

    test("the function throws an exception and returns an error inside a result", () => {
      const testFn = () => {
        throw new Error("this is an error");
      };
      assertTrue(unsafe(testFn).containsErr("this is an error"));
    });
  });

  when("unsafeAsync", ({ test }) => {
    test("the function does not throw an exception returns the result", async () => {
      const testDivision = async () => await 10 / 2;
      assertTrue((await unsafeAsync(testDivision)).contains(5));
    });

    test("the function throws an exception and returns an error inside a result", async () => {
      const testFn = () => {
        throw new Error("this is an error");
      };
      assertTrue((await unsafeAsync(testFn)).containsErr("this is an error"));
    });
  });
});
