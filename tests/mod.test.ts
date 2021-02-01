import { assertEquals } from "../deps-test.ts";
import { getHelloWorld } from "../mod.ts";

Deno.test("test get hellow world", () => {
  assertEquals(getHelloWorld(), "\x1b[1mHello World\x1b[22m");
});
