import { none, some } from "../option/option.ts";
import { Option } from "../option/option.interface.ts";
import {
  emptyHybridWeakMap,
  HybridWeakMap,
} from "../collections/hybrid_weak_map.ts";
import { isDef, isObjectLike, type, typename } from "./utils.ts";
import { Result } from "../result/result.interface.ts";
import { err, ok } from "../result/result.ts";

/**
 * Object that will implement the Trait.
 */
// deno-lint-ignore no-explicit-any
type ObjectType = any;

/**
 * Implementing function type.
 */
// deno-lint-ignore no-explicit-any
type TraitImplFn<R> = (obj: ObjectType, ...args: Array<any>) => R;

/**
 * There is no trait implemented gor the given object.
 */
class TraitNotImplemented<R> extends Error {
  constructor(msg: string, public readonly trait: Trait<R>) {
    super();
  }
}

/**
 * Class for implementing generic functions/protocols.
 */
export class Trait<R> {
  /**
   * Symbol that uniquely identifies the Trait.
   */
  public readonly sym: symbol;

  private readonly table: HybridWeakMap<TraitImplFn<R>> = emptyHybridWeakMap();

  /**
   * Create a new Trait instance.
   * 
   * @param name Name of the Trait
   * @param sym Symbol associated with the trait. This symbol is available under `MyTrait.sym` for developers to 
   *  implement their interfaces with. This parameter is usually left empty; in this case a new symbol is created for 
   *  the Trait.
   */
  constructor(private readonly name: string, sym: Option<symbol>) {
    this.sym = sym.unwrapOrElse(() => Symbol(name));
  }

  private lookupTypeTable(Type: ObjectType): Option<TraitImplFn<R>> {
    return this.table.get(Type);
  }

  private lookupProperty(what: ObjectType): Option<TraitImplFn<R>> {
    const prop = isDef(what) && what[this.sym];
    return prop ? some((w, ...args) => prop.apply(w, args)) : none();
  }

  private lookupMethod(Type: ObjectType): Option<TraitImplFn<R>> {
    const method = isDef(Type) && Type.prototype[this.sym];
    return method ? some((w, ...args) => method.apply(w, args)) : none();
  }

  /**
   * Find the implementation of this trait for a specific value.
   * 
   * @param what 
   */
  lookupValue(what: ObjectType): Option<TraitImplFn<R>> {
    const Type = type(what);

    const badType = Type === Object &&
      (!isObjectLike(what) || typeof what[Symbol.iterator] === "function" ||
        typeof what[Symbol.asyncIterator] === "function");
    const allowType = badType ? undefined : true;

    return this.lookupProperty(what)
      .orElse(() => allowType ? this.lookupTypeTable(Type) : none());
  }

  /**
   * Invoke the implementation.
   * 
   * @param what 
   */
  invoke(
    what: ObjectType,
    // deno-lint-ignore no-explicit-any
    ...args: Array<any>
  ): Result<R, TraitNotImplemented<R>> {
    const impl = this.lookupValue(what);

    if (impl.isNone()) {
      const error = new TraitNotImplemented(
        `No implementation of trait ${typename(this)} for ${what} of type ${
          typename(type(what))
        }.`,
        this,
      );
      return err(error);
    }

    return ok(impl.unwrap()(what, args));
  }

  /**
   * Implement this Trait for a class as a 'meth­od'.
   * 
   * @param type 
   * @param impl 
   */
  impl(type: ObjectType, impl: TraitImplFn<R>) {
    this.table.insert(type, impl);
  }
}

/**
 * Define a new Trait.
 * 
 * @param name Name of the Trait
 */
export function defineTrait<R>(name: string): Trait<R> {
  return new Trait(name, none());
}

/**
 * Define a new Trait with the given symbol.
 * 
 * @param name Name of the Trait
 * @param sym Symbol associated with the trait. This symbol is available under `MyTrait.sym` for developers to 
   *  implement their interfaces with. This parameter is usually left empty; in this case a new symbol is created for 
   *  the Trait.
 */
export function defineTraitWithSymbol<R>(name: string, sym: symbol): Trait<R> {
  return new Trait(name, some(sym));
}
