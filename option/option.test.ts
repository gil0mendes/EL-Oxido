import { assertEquals } from "../deps-test.ts";
import { assertFalse, assertTrue, fail, when } from "../test.utils.ts";
import { None } from "./option.interface.ts";
import { none, option, some } from "./option.ts";

when("Option", ({ when, test }) => {
  when("Factory", ({ test }) => {
    test("option must create a Some monad with the given value", () => {
      const value = option(4);
      assertTrue(value.isSome());
    });

    test("option must create a None monad when no value is given", () => {
      const value = option();
      assertTrue(value.isNone());
    });

    test("some must create a Some monad", () => {
      const value = some(4);
      assertTrue(value.isSome());
    });

    test("none must create a None monad", () => {
      const value = none();
      assertTrue(value.isNone());
    });
  });

  test("unwrap a Some returns the value", () => {
    const testValue = 1000;
    const value = some(testValue);
    assertEquals(value.unwrap(), testValue);
  });

  test("unwrap a None panics", () => {
    const value = none<number>();

    try {
      value.unwrap();
      fail("must panic");
    } catch (_) {
      return;
    }
  });

  test("unwrapOr a Some must return the value", () => {
    const testValue = "test-value";
    const otherValue = "other";

    const value = some(testValue);

    assertEquals(testValue, value.unwrapOr(otherValue));
  });

  test("unwrapOr a None must return the parameter", () => {
    const otherValue = "other";

    const value = none();

    assertEquals(otherValue, value.unwrapOr(otherValue));
  });

  test("unwrapOrElse a Some must return the value", () => {
    const testValue = "test-value";
    const otherValue = "other";

    const value = some(testValue);

    assertEquals(testValue, value.unwrapOrElse(() => otherValue));
  });

  test("unwrapOrElse a None must return the other value", () => {
    const otherValue = "other";

    const value = none();

    assertEquals(otherValue, value.unwrapOrElse(() => otherValue));
  });

  test("tap Some executes some side-effect function", () => {
    let controlBool = false;
    const testValue = "test-value";

    const value = some(testValue);
    value.tap({
      some(val) {
        controlBool = true;
        assertEquals(val, testValue);
      },
      none() {
        fail("must execute some function");
      },
    });

    !controlBool && fail("must execute some function");
  });

  test("tap None executes none side-effect function", () => {
    let controlBool = false;
    const value = none();

    value.tap({
      some() {
        fail("must execute none function");
      },
      none() {
        controlBool = true;
      },
    });

    !controlBool && fail("must execute none function");
  });

  test("tapNone on Some doesn't execute", () => {
    const value = some("value");

    value.tapNone(() => {
      fail("can be executed when is a Some value");
    });
  });

  test("tapNone on None execute the side-function", () => {
    let control = false;
    const value = none();

    value.tapNone(() => {
      control = true;
    });

    !control && fail("must execute the tapNone function");
  });

  test("tapSome on Some execute the side-effect function", () => {
    let control = false;
    const value = some("value");

    value.tapSome(() => {
      control = true;
    });

    !control && fail("must execute the tapSome function");
  });

  test("tapSome on None do not call the function", () => {
    const value = none();

    value.tapSome(() => {
      fail("must not call the function");
    });
  });

  test("match Some executes some side-effect function", () => {
    let controlBool = false;
    const testValue = "test-value";

    const value = some(testValue);
    value.match({
      some(val) {
        controlBool = true;
        assertEquals(val, testValue);
      },
      none() {
        fail("must execute some function");
      },
    });

    !controlBool && fail("must execute some function");
  });

  test("match None executes none side-effect function", () => {
    const testValue = 1000;
    const value = none();

    const result = value.match<number>({
      some() {
        fail("must execute none function");
        return 0;
      },
      none() {
        return testValue;
      },
    });

    assertEquals(result, testValue);
  });

  test("map executes when is a Some and return the new value", () => {
    const testValue = 40;
    const testResult = 1000;

    const value = some(testValue);
    const result = value.map((innerVal) => {
      assertEquals(innerVal, testValue);
      return testResult;
    });

    assertEquals(result.unwrap(), testResult);
  });

  test("map do not executes with a None", () => {
    const value = none();
    const result = value.map((_) => {
      fail("must not be executed on a None");
      return 40;
    });

    assertTrue(result.isNone());
  });

  test("isSome return true with a Some", () => {
    const value = some(400);
    assertTrue(value.isSome());
  });

  test("isSome return false with a None", () => {
    const value = none();
    assertTrue(value.isNone());
  });

  test("isNone return false with a Some", () => {
    const value = some(1000);
    assertFalse(value.isNone());
  });

  test("isNone return true with a None", () => {
    const value = none();
    assertTrue(value.isNone());
  });

  test("and on Some with None as parameter returns None", () => {
    const x = some(2);
    const y = none<number>();

    assertTrue(x.and(y).isNone());
  });

  test("and on None return None", () => {
    const x = none();
    const y = some("foo");

    assertTrue(x.and(y).isNone());
  });

  test("and on Some return the given Some", () => {
    const resultValue = 1000;

    const value = some(123);
    const result = value.and(some(resultValue));

    assertEquals(result.unwrap(), resultValue);
  });

  test("and on None given a None return None", () => {
    const x = none();
    const y = none();

    assertTrue(x.and(y).isNone());
  });

  when("andThen", ({ test }) => {
    const sq = (x: number) => some(x * x);
    const nope = (_: number) => none<number>();

    test("return None is the option is None", () => {
      assertTrue(some(2).andThen(nope).andThen(sq).isNone());
      assertTrue(some(2).andThen(sq).andThen(nope).isNone());
      assertTrue(none<number>().andThen(sq).andThen(sq).isNone());
    });

    test("call f when is Some", () => {
      assertEquals(some(2).andThen(sq).andThen(sq).unwrap(), 16);
    });
  });
});
