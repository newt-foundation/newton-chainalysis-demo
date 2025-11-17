export function safeStringify(value: any, space?: number): string {
  return JSON.stringify(
    value,
    (_, v) => (typeof v === "bigint" ? v.toString() : v),
    space
  );
}
