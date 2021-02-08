import { assertFalse, assertTrue, when } from "../test.utils.ts";
import { err, ok } from "./result.ts";

when("Result", ({ when }) => {
  when("isOk", ({ test }) => {
    test("with an Ok returns true", () => {
      const x = ok<number, string>(-1);
      assertTrue(x.isOk());
    });

    test("with an Err returns false", () => {
      const x = err<number, string>(-1);
      assertFalse(x.isOk());
    });
  });

  when("isErr", ({ test }) => {
    test("with an Ok returns false", () => {
      const x = ok<number, string>(-1);
      assertFalse(x.isErr());
    });

    test("with an Err returns true", () => {
      const x = err<number, string>(-1);
      assertTrue(x.isErr());
    });
  });
});
