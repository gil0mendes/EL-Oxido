import { assertFalse, assertTrue, when } from "../../test.utils.ts";
import { eq, uneq } from "./mod.ts";

when("equals trait", ({ when, test }) => {
  when("eq", ({ test }) => {
    test("compare primitive types", () => {
      assertTrue(eq(true, true));
      assertTrue(eq(null, null));
      assertTrue(eq(undefined, undefined));
      assertTrue(eq("test", "test"));
      assertTrue(eq(Symbol.iterator, Symbol.iterator));
      assertFalse(eq("", "asd"));
      assertFalse(eq(1, 2));
    });

    test("compare complex types", () => {
      assertTrue(eq([{ foo: 42 }], [{ foo: 42 }]));
      assertFalse(eq([{ foo: 42 }], [{ foo: 2 }]));
    });
  });

  test("uneq", () => {
    assertTrue(uneq(4, 5));
    assertFalse(uneq({}, {}));
  });
});
