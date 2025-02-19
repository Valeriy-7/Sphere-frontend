"use client";

import { ColumnDef } from "@tanstack/react-table";

import { type DataRow } from "@/lib/makeData";
import { getColumnNumber } from "@/lib/TableHelpers";
import { formatDate } from "@/lib/utils/formatDate";

export const columns: ColumnDef<DataRow>[] = [
  { ...getColumnNumber<DataRow>(), enableSorting: false },
  {
    accessorKey: "groupDate1",
    header: "Дата поставки",
    getGroupingValue: (row) =>
      `${formatDate(row.groupDate1)} ${row.groupPlace}`,
    enableSorting: false,
  },

  {
    accessorKey: "groupPlace",
    enableSorting: false,
    header: "Поставщик",
  },
  {
    enableSorting: false,
    accessorFn: ({ streetAddress, city }) => `${city} ${streetAddress}`,
    id: "streetAddress",
    header: "Магазин",
  },
  {
    accessorKey: "number1to3",
    header: "Кол-во товаров (ед)",

    enableSorting: false,
  },
  {
    accessorKey: "number1to5_number1to10",
    header: "Гр. мест (ед) Объём (м3)",
    accessorFn: ({ number1to5, number1to10 }) => [
      number1to5,
      " / ",
      number1to10,
    ],
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Ответственный",
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: "Тип логистики",
    enableSorting: false,
  },
  {
    enableSorting: false,
    accessorKey: "date2",
    header: "Дата поставки",
  },
];
