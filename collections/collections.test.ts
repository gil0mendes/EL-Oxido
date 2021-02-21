import { assertEquals, assertTrue, when } from "../test.utils.ts";
import { createIterator } from "./collections.ts";

when("collections", ({ when }) => {
  when("iter", ({ test }) => {
    test("with more element next gives the first element", () => {
      const x = createIterator([12, 34, 23].values());
      assertEquals(x.next().unwrap(), 12);
    });

    test("with no more elements next return None", () => {
      const x = createIterator([12].values());
      x.next();

      assertTrue(x.next().isNone());
      assertTrue(x.next().isNone());
    });
  });
});
