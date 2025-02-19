import { Table } from "@tanstack/react-table";

import React, { Fragment } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableHeaderSort } from "@/components/date-table/table-header-sort";
import { TableRowTotal } from "@/app/(main)/delivery-mp/TableRowTotal";

type DataTableHeaderProps<TData> = { table: Table<TData> };

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <Fragment key={headerGroup.id + "Fragment"}>
          <TableRow rowSpace={false} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={header.column.columnDef.meta?.className}
                >
                  {header.isPlaceholder ? null : (
                    <TableHeaderSort header={header} />
                  )}
                </TableHead>
              );
            })}
          </TableRow>
          <TableRowTotal<TData> table={table} />
        </Fragment>
      ))}
    </TableHeader>
  );
}
