"use client";

import { cn } from "@/app/lib/cn";

export interface StatusDonutProps {
  closed: number;
  inProgress: number;
  open: number;
  total: number;
  className?: string;
}

const SEGMENTS = [
  { key: "closed", label: "Concluído", color: "#b45309", getValue: (p: StatusDonutProps) => p.closed },
  { key: "inProgress", label: "Em Atendimento", color: "#d97706", getValue: (p: StatusDonutProps) => p.inProgress },
  { key: "open", label: "Aberto", color: "#f5ab52", getValue: (p: StatusDonutProps) => p.open },
] as const;

const SIZE = 180;
const RADIUS = 90;
const INNER_RADIUS_RATIO = 0.72;
const STROKE_WIDTH = RADIUS * (1 - INNER_RADIUS_RATIO);

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function computeSegments(props: StatusDonutProps) {
  return SEGMENTS.reduce(
    (acc, seg) => {
      const value = seg.getValue(props);
      const sweep = props.total > 0 ? (value / props.total) * 360 : 0;
      const startAngle = acc.currentAngle;
      const endAngle = acc.currentAngle + sweep;
      acc.currentAngle = endAngle;
      return {
        ...acc,
        segments: [...acc.segments, { ...seg, value, sweep, startAngle, endAngle }],
      };
    },
    { currentAngle: 0, segments: [] as Array<{
      key: string;
      label: string;
      color: string;
      value: number;
      sweep: number;
      startAngle: number;
      endAngle: number;
    }> },
  ).segments;
}

export function StatusDonut({ closed, inProgress, open, total, className }: StatusDonutProps) {
  const props = { closed, inProgress, open, total };
  const segments = computeSegments(props);

  return (
    <div className={cn("rounded-xl border border-line bg-surface p-[20px_22px] flex flex-col gap-[18px]", className)}>
      <h3 className="text-[15px] font-bold text-primary">Por estado</h3>

      <div className="flex flex-col items-center gap-4">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg viewBox="0 0 180 180" width={SIZE} height={SIZE} role="img" aria-label={`Distribuição por estado: ${closed} concluídos, ${inProgress} em atendimento, ${open} abertos`}>
            {segments
              .filter((s) => s.sweep > 0)
              .map((seg) => (
                <path
                  key={seg.key}
                  d={describeArc(90, 90, RADIUS - STROKE_WIDTH / 2, seg.startAngle, seg.endAngle)}
                  stroke={seg.color}
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                  strokeLinecap="butt"
                />
              ))}
            <text
              x="90"
              y="64"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-white"
              style={{ fontSize: 27, fontWeight: 700, fontFamily: "var(--font-ui)" }}
            >
              {total}
            </text>
            <text
              x="90"
              y="101"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-muted"
              style={{ fontSize: 11, fontWeight: 400, fontFamily: "var(--font-ui)", color: "white" }}
            >
              pedidos
            </text>
          </svg>
        </div>

        <div className="flex flex-col gap-[10px] w-full max-w-xs">
          {segments.map((seg) => (
            <div key={seg.key} className="flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                <span
                  className="relative h-[8px] w-[8px] rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-[12.5px] text-white">{seg.label}</span>
              </div>
              <span className="text-[12.5px] font-mono font-semibold text-white">{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}