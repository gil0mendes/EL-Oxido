import { assertEquals, assertFalse, assertTrue, when } from "../test.utils.ts";
import {
  isDef,
  isNil,
  isObjectLike,
  isPlainObject,
  isPrimitive,
  type,
} from "./utils.ts";

when("utils", ({ test }) => {
  test("isPrimitive", () => {
    assertTrue(isPrimitive(null));
    assertTrue(isPrimitive(undefined));
    assertTrue(isPrimitive(42));
    assertTrue(isPrimitive(Symbol("test")));

    assertFalse(isPrimitive({}));
    assertFalse(isPrimitive(new Number(42)));
  });

  test("isNil", () => {
    assertTrue(isNil(null));
    assertTrue(isNil(undefined));

    assertFalse(isNil(0));
    assertFalse(isNil(false));
  });

  test("isDef", () => {
    assertFalse(isDef(null));
    assertFalse(isDef(undefined));

    assertTrue(isDef(0));
    assertTrue(isDef(false));
  });

  test("type", () => {
    class Test {}

    assertEquals(type(null), null);
    assertEquals(type(undefined), undefined);
    assertEquals(type(42), Number);
    assertEquals(type(new Number(31)), Number);
    assertEquals(type(new Test()), Test);
  });

  test("isObjectLike", () => {
    assertTrue(isObjectLike({}));
    assertTrue(isObjectLike([1, 2, 3]));

    assertFalse(isObjectLike(() => {}));
    assertFalse(isObjectLike(null));
    assertFalse(isObjectLike(undefined));
  });

  test("isPlainObject", () => {
    class Foo {
    }

    assertFalse(isPlainObject(new Foo()));
    assertFalse(isPlainObject([1, 2, 3]));

    assertTrue(isPlainObject({ x: 1, y: 2 }));
    assertTrue(isPlainObject(Object.create(null)));
  });
});
