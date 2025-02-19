"use client";

import { ColumnDef } from "@tanstack/react-table";

import { type DataRow } from "@/lib/makeData";
import { TableImgText } from "@/components/date-table/table-img-text";
import { getColumnNumber } from "@/lib/TableHelpers";

export const columns: ColumnDef<DataRow>[] = [
  getColumnNumber<DataRow>(),
  {
    accessorFn: ({ title, art }) => `${title} ${art}`,
    id: "title",
    header: "Карточки",
    meta: {
      filterVariant: "text",
    },
    cell: ({ row: { original } }) => {
      return (
        <TableImgText
          image={{ src: original.image }}
          title={original.title}
          text={`Aрт: ${original.art}`}
        />
      );
    },
  },
  {
    accessorKey: "number4",
    header: "Продукт (ед)",
  },
  {
    accessorKey: "number5",
    header: "Товар (ед)",
  },
  {
    accessorKey: "number6",
    header: "Брак (ед)",
  },
  {
    accessorKey: "number7",
    header: "Расходники (ед)",
  },
  {
    accessorKey: "number8",
    header: "Возвраты с ПВЗ (ед)",
  },
];
