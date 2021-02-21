import { assertEquals, assertFalse, assertTrue, when } from "../test.utils.ts";
import { emptyHashMap, HashMapFromIterator } from "./hash_map.ts";

when("HashMap", ({ when, test }) => {
  test("keys return an iterator with all map keys", () => {
    const x = emptyHashMap();
    x.insert("a", 1);
    x.insert("b", 2);

    const iter = x.keys();
    assertEquals(iter.next().unwrap(), "a");
    assertEquals(iter.next().unwrap(), "b");
    assertTrue(iter.next().isNone());
  });

  test("values return an iterator with all map keys", () => {
    const x = emptyHashMap();

    x.insert("a", 1);
    x.insert("b", 2);

    const iter = x.values();
    assertEquals(iter.next().unwrap(), 1);
    assertEquals(iter.next().unwrap(), 2);
    assertTrue(iter.next().isNone());
  });

  when("len", ({ test }) => {
    test("return 0 when the map is empty", () => {
      const x = emptyHashMap();
      assertEquals(x.len(), 0);
    });

    test("return 2 when the map has two elements", () => {
      const x = emptyHashMap<string, number>();
      x.insert("a", 1);
      x.insert("b", 12);
      assertEquals(x.len(), 2);
    });
  });

  when("insert", ({ test }) => {
    test("returns None when the key do not exist", () => {
      const x = emptyHashMap<string, number>();
      assertTrue(x.insert("a", 1).isNone());
    });

    test("returns Some with the old value when the key exists", () => {
      const x = emptyHashMap<string, number>();
      x.insert("a", 1000);
      assertEquals(x.insert("a", 40).unwrap(), 1000);
    });
  });

  when("containersKey", ({ test }) => {
    test("returns false when key do not exists", () => {
      const x = emptyHashMap();
      x.insert("a", 1);

      assertFalse(x.containsKey("b"));
    });

    test("returns true when key do exists", () => {
      const x = emptyHashMap();
      x.insert("a", 1);

      assertTrue(x.containsKey("a"));
    });
  });

  test("get returns value when exists and none otherwise", () => {
    const x = emptyHashMap();
    x.insert("a", 1);

    assertTrue(x.get("b").isNone());
    assertEquals(x.get("a").unwrap(), 1);
  });

  test("remove removes the key and value and returns the value, if no present returns none", () => {
    const x = emptyHashMap();
    x.insert("a", 1);

    assertTrue(x.remove("b").isNone());
    assertEquals(x.remove("a").unwrap(), 1);
    assertFalse(x.containsKey("a"));
  });
});
