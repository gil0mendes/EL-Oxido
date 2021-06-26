import { assertEq, assertTrue, when } from "../../test.utils.ts";
import { iter } from "./iter.trait.ts";

when("Trait: iter", ({ when, test }) => {
  when("primitive types", ({ test }) => {
    test("array", () => {
      const arrayIter = iter([1, 2, 3]);
      assertEq(arrayIter.next().unwrap(), 1);
      assertEq(arrayIter.next().unwrap(), 2);
      assertEq(arrayIter.next().unwrap(), 3);
      assertTrue(arrayIter.next().isNone());
    });

    test("string", () => {
      const arrayIter = iter("abc");
      assertEq(arrayIter.next().unwrap(), "a");
      assertEq(arrayIter.next().unwrap(), "b");
      assertEq(arrayIter.next().unwrap(), "c");
      assertTrue(arrayIter.next().isNone());
    });
  });
});
