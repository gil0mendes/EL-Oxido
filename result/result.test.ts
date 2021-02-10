import { assertEquals, assertFalse, assertTrue, when } from "../test.utils.ts";
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

  when("containsErr", ({ test }) => {
    test("with Ok return false", () => {
      const x = ok<number, string>(2);
      assertFalse(x.containsErr("Some error message"));
    });

    test("with Err given the same message returns true", () => {
      const x = err("Some error message");
      assertTrue(x.containsErr("Some error message"));
    });

    test("with Err given an different message returns false", () => {
      const x = err("Some error message");
      assertFalse(x.containsErr("Some other error message"));
    });
  });

  when("ok", ({ test }) => {
    test("with Ok return a Some with the Ok value", () => {
      const x = ok(2);
      assertEquals(x.ok().unwrap(), 2);
    });

    test("with Err return a None", () => {
      const x = err("nothing here");
      assertTrue(x.ok().isNone());
    });
  });

  when("err", ({ test }) => {
    test("with Ok return a None", () => {
      const x = ok(2);
      assertTrue(x.err().isNone());
    });

    test("with Err return a Some with the error value", () => {
      const x = err("nothing here");
      assertEquals(x.err().unwrap(), "nothing here");
    });
  });
});
