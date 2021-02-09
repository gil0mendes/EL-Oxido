import { assertFalse, assertTrue, when } from "../test.utils.ts";
import { err, ok } from "./result.ts";

when("Result", ({ when }) => {
  when("isOk", ({ test }) => {
    test("with an Ok returns true", () => {
      const x = ok<number, string>(-1);
      assertTrue(x.isOk());
    });

    test("with an Err returns false", () => {
      const x = err<number, string>("this is an error");
      assertFalse(x.isOk());
    });
  });

  when("isErr", ({ test }) => {
    test("with an Ok returns false", () => {
      const x = ok<number, string>(-1);
      assertFalse(x.isErr());
    });

    test("with an Err returns true", () => {
      const x = err<number, string>("this is an error");
      assertTrue(x.isErr());
    });
  });

  when("contains", ({ test }) => {
    test("with Ok given the same value returns true", () => {
      const x = ok(2);
      assertTrue(x.contains(2));
    });

    test("with Ok given a different value returns false", () => {
      const x = ok(3);
      assertFalse(x.contains(2));
    });

    test("with Err returns false", () => {
      const x = err<number, string>("Some error message");
      assertFalse(x.contains(2));
    });
  });
});
