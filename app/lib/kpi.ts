const POSITIVE_COLOR = "#4ade80";
const NEGATIVE_COLOR = "#f87171";
const NEUTRAL_COLOR = "#90909a";

export function formatSignedPct(value: number | null): string | undefined {
  if (value === null) return undefined;
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

export function formatSignedInt(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}`;
}

export function deltaColor(value: number | null): string {
  if (value === null || value === 0) return NEUTRAL_COLOR;
  return value > 0 ? POSITIVE_COLOR : NEGATIVE_COLOR;
}
