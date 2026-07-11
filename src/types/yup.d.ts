// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module 'yup' {
  interface SchemaDescription {
    fields: Record<string, unknown>;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface BaseSchema<T = any> {
    describe(): SchemaDescription;
    cast(value?: unknown, options?: unknown): T;
    validate(value?: unknown, options?: unknown): Promise<T>;
    nullable(): this;
    default(value: unknown): this;
    required(message?: string): this;
    max(limit: number, message?: string): this;
    min(limit: number, message?: string): this;
    shape(fields: Record<string, BaseSchema>): this;
    of(schema: BaseSchema): this;
    ensure(): this;
    oneOf(values: unknown[], message?: string): this;
    email(message?: string): this;
    url(message?: string): this;
    matches(regex: RegExp, message?: string): this;
    moreThan(limit: number, message?: string): this;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type StringSchema = BaseSchema<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type NumberSchema = BaseSchema<number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type DateSchema = BaseSchema<Date>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ArraySchema = BaseSchema<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ObjectSchema<T = Record<string, unknown>> = BaseSchema<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type MixedSchema = BaseSchema<any>;

  function string(): StringSchema;
  function number(): NumberSchema;
  function date(): DateSchema;
  function array(): ArraySchema;
  function object(): ObjectSchema;
  function mixed(): MixedSchema;
  function ref(path: string): unknown;
}
