import {
  assertEquals,
  assertFalse,
  assertTrue,
  test,
  when,
} from "../../test.utils.ts";
import { empty, size } from "./size.trait.ts";

when("Size trait", ({ test }) => {
  test("size", () => {
    assertEquals(size({ foo: 42 }), 1);
    assertEquals(size([1, 2, 3]), 3);
  });

  test("empty", () => {
    assertTrue(empty([]));
    assertTrue(empty({}));
    assertFalse(empty([1]));
    assertFalse(empty({ a: 123 }));
  });
});
