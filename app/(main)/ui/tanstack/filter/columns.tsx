"use client";

import { ColumnDef, Table } from "@tanstack/react-table";

import React from "react";
import { type DataRow } from "@/app/(main)/ui/tanstack/filter/makeData";

export const columns: ColumnDef<DataRow>[] = [
  {
    accessorKey: "key1",
    header: () => <div>123</div>,
    enableSorting: false,
    meta: {
      totalComponent: ({ getRowModel }: Table<DataRow>) => (
        <div>
          {" "}
          totalComponent{" "}
          {getRowModel().rows.map(({ original }) => original.key1)}
        </div>
      ),
    },
  },
  {
    accessorKey: "key2",
    enableColumnFilter: false,
    header: "Магазин",
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorKey: "key3",
    header: "Продукт (ед)",
    enableColumnFilter: false,
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "key4",
    header: "Товар (ед)",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "key5",
    header: "Брак (ед)",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "key6",
    header: "Расходники (ед)",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "key7",
    header: "Возвраты с ПВЗ (ед)",
    meta: {
      filterVariant: "range",
    },
  },
];
