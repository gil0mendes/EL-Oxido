import { assertFalse, assertTrue, when } from "../test.utils.ts";
import { isPrimitive } from "./utils.ts";

when("utils", ({ test }) => {
  test("isPrimitive", () => {
    assertTrue(isPrimitive(null));
    assertTrue(isPrimitive(undefined));
    assertTrue(isPrimitive(42));
    assertTrue(isPrimitive(Symbol("test")));

    assertFalse(isPrimitive({}));
    assertFalse(isPrimitive(new Number(42)));
  });
});
