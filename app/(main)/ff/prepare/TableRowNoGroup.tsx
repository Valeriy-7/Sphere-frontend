import { Table as TTable } from "@tanstack/react-table";
import { Row } from "@tanstack/react-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils/formatDate";
import { TableCardImgText } from "@/components/date-table/table-img-text";
import { TableCellControlsGroup } from "./TableCellControlsGroup";
import React from "react";

export function TableRowNoGroup<TData>({
  table,
  row,
  onClick,
  className,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  onClick: () => void;
  className?: string;
}) {
  console.log();

  return (
    <TableRow className={className} onClick={onClick}>
      <TableCell>1</TableCell>
      <TableCell>{formatDate(row.original.groupDate1)}</TableCell>

      <TableCell>
        <TableCardImgText
          image={{ src: row.original.image }}
          title={row.original.groupStoreName}
          text={row.original.groupPlace}
        />
      </TableCell>
      <TableCell>{row.original.number1to3}</TableCell>

      <TableCellControlsGroup<TData> row={row} />
    </TableRow>
  );
}
