import { flexRender, Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';

import { getTotalColumn } from '@/lib/TableHelpers';
import { TableCellControlsGroup } from './TableCellControlsGroup';
import React from 'react';
import { TableCardImgText } from '@/components/date-table/table-img-text';

export function TableHeaderGroupDateRoute<TData>({
  table,
  row,
  isAcceptance,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  isAcceptance?: boolean;
}) {
  const { rowSelection } = table.getState();

  const sum = row
    .getLeafRows()
    .map((row) => (rowSelection[row.id] ? row.getValue('number1to3') : 0))
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  const number1to5_number1to10 = row
    .getLeafRows()
    .map((row) => {
      const [a, space, b] = row.getValue('number1to5_number1to10');
      if (rowSelection[row.id]) {
        return [a, b];
      }
      return [0, 0];
    })
    .reduce((previousValue, currentValue) => {
      return [previousValue[0] + currentValue[0], previousValue[1] + currentValue[1]];
    });
  const sum_number1to5_number1to10 = [number1to5_number1to10[0], ' / ', number1to5_number1to10[1]];

  return (
    <>
      <TableRow>
        <TableCell></TableCell>
        <TableCell className={'text-primary'}>{formatDate(row.original.deliveryDate)}</TableCell>

        <TableCell>
          {!table.getState().hasGroupingRoute ? (
            <TableCardImgText
              image={{ src: undefined }}
              title={row.original.cabinetInfo.name}
              text={row.original.cabinetInfo.legalCompanyName}
            />
          ) : (
            <div className={'text-primary'}>{row.original.name}</div>
          )}
        </TableCell>
        <TableCell></TableCell>
        <TableCell>{sum}</TableCell>
        <TableCell>{sum_number1to5_number1to10}</TableCell>
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
