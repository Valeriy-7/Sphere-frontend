import { flexRender, Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';

import { getTotalColumn } from '@/lib/TableHelpers';
import { TableCellControlsGroup } from './TableCellControlsGroup';
import React from 'react';

export function TableRowGroupHeader<TData>({
  table,
  row,
  isAcceptance,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  isAcceptance?: boolean;
}) {
  const column = table.getColumn('number1to3');
  const { rowSelection } = table.getState();

  /* let sum = 0;
    row.getLeafRows().forEach(row=>{
        console.table(row.id, rowSelection,row.getValue('number1to3'));
        if(rowSelection && rowSelection[row.id]) {
            sum = sum + row.getValue('number1to3')
        }
    })*/

  const sum = row
    .getLeafRows()
    .map((row) => (rowSelection[row.id] ? row.getValue('number1to3') : 0))
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  const cargoPlaces_volume = row
    .getLeafRows()
    .map((row) => {
      const [a, space, b] = row.getValue('cargoPlaces_volume');
      if (rowSelection[row.id]) {
        return [a, b];
      }
      return [0, 0];
    })
    .reduce((previousValue, currentValue) => {
      return [previousValue[0] + currentValue[0], previousValue[1] + currentValue[1]];
    });
  const sum_cargoPlaces_volume = [cargoPlaces_volume[0], ' / ', cargoPlaces_volume[1]];
  return (
    <>
      <TableRow>
        <TableCell>Сегодня</TableCell>
        <TableCell className={'text-primary'}>{formatDate(row.getValue('deliveryDate'))}</TableCell>

        <TableCell className={'text-primary'}>{row.original.groupPlace}</TableCell>
        <TableCell></TableCell>
        <TableCell>{sum}</TableCell>
        <TableCell>{sum_cargoPlaces_volume}</TableCell>
        <TableCellControlsGroup<TData>
          row={row}
          table={table}
          isGroupHeader
          isAcceptance={isAcceptance}
        />
      </TableRow>
    </>
  );
}
