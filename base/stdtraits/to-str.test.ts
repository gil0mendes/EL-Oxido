import { toStr } from "./mod.ts";
import { assertEquals, when } from "../../test.utils.ts";

when("toStr trait", ({ test }) => {
  test("primitive types has a string representation", () => {
    console.log("test test test");
    assertEquals(toStr("asd"), "asd");
    assertEquals(toStr(1000), "1000");
    assertEquals(toStr(true), "true");
    assertEquals(toStr(false), "false");
  });
});
