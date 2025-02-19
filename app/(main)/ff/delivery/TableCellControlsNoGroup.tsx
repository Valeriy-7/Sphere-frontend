import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

export function TableCellControlsNoGroup<TData>({
  table,
  row,
  isAcceptance,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  isAcceptance?: boolean;
}) {
  return (
    <>
      <TableCell />
      <TableCell />
      <TableCell>
        {!isAcceptance ? (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={row.getToggleSelectedHandler()}
            onClick={(e) => {
              e.stopPropagation(); //  <------ Here is the magic
            }}
          />
        ) : null}
      </TableCell>
    </>
  );
}
