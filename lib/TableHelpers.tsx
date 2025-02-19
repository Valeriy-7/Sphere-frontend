import React, { PropsWithChildren } from "react";
import { ColumnDef, RowData, Table as TTable } from "@tanstack/react-table";
import { type FormatCurrency, formatCurrency } from "@/lib/formatCurrency";
import { FilterFn } from "@tanstack/table-core";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

import type { DataRow } from "@/lib/makeData";

export type ColSizeList = { colSizeList?: Array<string> };
export function getColSizeList(classList?: Array<string>) {
  return { colSizeList: classList };
}
export function getColSizeComponent(classList?: Array<string>) {
  return {
    ColSizeComponent: () => (
      <colgroup>
        {classList?.map((className) => <col className={className} />)}
      </colgroup>
    ),
  };
}

export function getColumnNumber<T>(): ColumnDef<T> {
  return {
    accessorKey: "number",
    header: "№",
    accessorFn: (originalRow, index) => index,
    cell: ({ getValue }) => {
      return getValue();
    },
  };
}

export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table, column }) => {
    const value = getValue();
    if (typeof value === "number") {
      return formatCurrency(value);
    }
    return value;
  },
};

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    totalComponent?: (props: PropsWithChildren) => React.ReactNode;
    className?: string;
    editDisabled?: boolean;
    formatCurrency?: FormatCurrency;
  }

  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function getTotalColumn<TData>({
  table,
  key,
}: {
  table: TTable<TData>;
  key: keyof DataRow;
}) {
  const list = table.getPreGroupedRowModel().rows.map((row) => {
    return row.original[key] ?? 0;
  });

  return list.reduce((accumulator, currentValue) => accumulator + currentValue);
}

export type TableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};
