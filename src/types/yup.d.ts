declare module 'yup' {
  interface SchemaDescription {
    fields: Record<string, unknown>;
  }
  interface BaseSchema<T = unknown> {
    describe(): SchemaDescription;
    cast(value?: unknown, options?: unknown): T;
    validate(value?: unknown, options?: unknown): Promise<T>;
  }
  interface StringSchema extends BaseSchema<string> {
    required(message?: string): this;
    max(limit: number, message?: string): this;
    min(limit: number, message?: string): this;
    email(message?: string): this;
    url(message?: string): this;
    matches(regex: RegExp, message?: string): this;
    ensure(): this;
    oneOf(values: unknown[], message?: string): this;
  }
  interface NumberSchema extends BaseSchema<number> {
    required(message?: string): this;
    moreThan(limit: number, message?: string): this;
    default(value: number): this;
  }
  interface DateSchema extends BaseSchema<Date> {
    nullable(): this;
  }
  interface ArraySchema extends BaseSchema<unknown[]> {
    of(schema: BaseSchema): this;
    ensure(): this;
  }
  interface ObjectSchema<T = Record<string, unknown>> extends BaseSchema<T> {
    shape(fields: Record<string, BaseSchema>): this;
  }
  interface MixedSchema extends BaseSchema {
    nullable(): this;
    default(value: unknown): this;
  }
  function string(): StringSchema;
  function number(): NumberSchema;
  function date(): DateSchema;
  function array(): ArraySchema;
  function object(): ObjectSchema;
  function mixed(): MixedSchema;
  function ref(path: string): unknown;
}
