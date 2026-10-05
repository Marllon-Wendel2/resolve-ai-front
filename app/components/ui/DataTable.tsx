"use client";

import { cn } from "@/app/lib/cn";
import { DataTableColumn } from "@/app/types";
import { Button } from "./Button";

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  loadMore?: {
    shown: number;
    total: number;
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
  };
  onRowClick?: (item: T) => void;
}

function SkeletonRow({ columnCount }: { columnCount: number }) {
  const cells = [];
  for (let i = 0; i < columnCount; i++) {
    cells.push(
      <td key={i} className="px-4">
        <div
          className="h-4 bg-zinc-700 rounded"
          style={{ width: i === 1 ? "60%" : "80px" }}
        />
      </td>
    );
  }
  return <tr className="h-16 border-b border-zinc-800 animate-pulse">{cells}</tr>;
}

function DataRow<T>({
  item,
  rowIndex,
  columns,
  onRowClick,
}: {
  item: T;
  rowIndex: number;
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
}) {
  const cells = columns.map((col) => (
    <td
      key={col.key}
      className={cn(
        "px-4",
        col.align === "center" && "text-center",
        col.align === "right" && "text-right"
      )}
      style={{ width: col.width === "fill" ? undefined : col.width }}
    >
      {col.render
        ? col.render(item, rowIndex)
        : String((item as Record<string, unknown>)[col.key] ?? "")}
    </td>
  ));

  return (
    <tr
      className={cn(
        "h-16 border-b border-zinc-800/50 transition-colors",
        onRowClick && "cursor-pointer hover:bg-zinc-900/50"
      )}
      onClick={() => onRowClick?.(item)}
    >
      {cells}
    </tr>
  );
}

function EmptyState({
  columns,
  message,
}: {
  columns: DataTableColumn<unknown>[];
  message: string;
}) {
  return (
    <tr>
      <td colSpan={columns.length} className="px-4 py-12 text-center text-secondary">
        {message}
      </td>
    </tr>
  );
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = "Nenhum registo encontrado",
  className,
  loadMore,
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className={cn("rounded-xl border border-line bg-surface overflow-hidden", className)}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="h-10 bg-zinc-900/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 text-left text-[10.5px] font-bold uppercase tracking-widest text-secondary",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                    style={{ width: col.width === "fill" ? undefined : col.width }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} columnCount={columns.length} />
              ))}
            </tbody>
          </table>
        </div>
        {loadMore && (
          <div className="h-14 bg-zinc-900/50 border-t border-zinc-800 animate-pulse" />
        )}
      </div>
    );
  }

  const header = (
    <thead>
      <tr className="h-10.5 bg-zinc-950/80 border-b border-zinc-800">
        {columns.map((col) => (
          <th
            key={col.key}
            className={cn(
              "px-4 text-left text-[10.5px] font-bold uppercase tracking-widest text-secondary",
              col.align === "center" && "text-center",
              col.align === "right" && "text-right"
            )}
            style={{ width: col.width === "fill" ? undefined : col.width }}
          >
            {col.title}
          </th>
        ))}
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {data.length === 0 ? (
        <EmptyState columns={columns as DataTableColumn<unknown>[]} message={emptyMessage} />
      ) : (
        data.map((item, rowIndex) => (
          <DataRow
            key={rowIndex}
            item={item}
            rowIndex={rowIndex}
            columns={columns}
            onRowClick={onRowClick}
          />
        ))
      )}
    </tbody>
  );

  return (
    <div className={cn("rounded-xl border border-line bg-surface overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {header}
          {body}
        </table>
      </div>
      {loadMore && (
        <div className="min-h-14 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between gap-4 px-4 py-2.5">
          <span className="text-[12.5px] text-secondary">
            {loadMore.total > 0 ? (
              <>
                A mostrar {loadMore.shown > 0 ? `1–${Math.min(loadMore.shown, loadMore.total)}` : 0} de{" "}
                {loadMore.total} solicitações
              </>
            ) : (
              <>A mostrar {loadMore.shown} solicitações</>
            )}
          </span>
          {loadMore.hasMore && (
            <Button
              variant="outline"
              size="sm"
              loading={loadMore.loading}
              onClick={loadMore.onLoadMore}
              className="shrink-0"
            >
              Buscar mais solicitações
            </Button>
          )}
        </div>
      )}
    </div>
  );
}