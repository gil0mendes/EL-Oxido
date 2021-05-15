import { assertTrue, when } from "../../test.utils.ts";
import { defineTrait, defineTraitWithSymbol } from "./trait.ts";

when("trait", ({ test }) => {
  test("create and implement a Trait to a type and execute it", () => {
    const Size = defineTrait<number>("Size");
    // deno-lint-ignore ban-types
    const size = (x: Object) => Size.invoke(x);

    class TempClass {
      [Size.sym]() {
        return 42;
      }
    }

    assertTrue(size(new TempClass()).contains(42));
  });

  test("implement a Trait in a native type and execute it", () => {
    const Size = defineTrait<number>("Size");
    Size.impl(String, (x: string) => x.length);

    assertTrue(Size.invoke("asdf").contains(4));
  });

  test("implement a Trait in a native type using a custom symbol and execute it", () => {
    const Size = defineTraitWithSymbol<number>("Size", Symbol("custom-symbol"));
    Size.impl(String, (x: string) => x.length);

    assertTrue(Size.invoke("asdf").contains(4));
  });
});
