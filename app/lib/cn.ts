export function cn(
  ...classes: Array<string | false | null | undefined | 0 | number | bigint>
): string {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}
