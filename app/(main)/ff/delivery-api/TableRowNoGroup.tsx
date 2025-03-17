import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getTotalColumn } from '@/lib/TableHelpers';
import { TableCellControlsGroup } from './TableCellControlsGroup';
import { TableCellControlsNoGroup } from './TableCellControlsNoGroup';
import React from 'react';

export function TableRowNoGroup<TData>({
  table,
  row,
  onClick,
  className,
  isAcceptance,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  onClick: () => void;
  className?: string;
  isAcceptance?: boolean;
}) {
  console.log();

  return (
    <TableRow className={className} onClick={onClick}>
      <TableCell>1</TableCell>
      <TableCell>{formatDate(row.original.deliveryDate)}</TableCell>

      <TableCell>
        <TableCardImgText
          image={{ src: row.original.image }}
          title={row.original.groupStoreName}
          text={row.original.groupPlace}
        />
      </TableCell>
      <TableCell>
        <TableCardImgText
          image={{ src: row.original.image }}
          title={row.original.city}
          text={row.original.streetAddress}
        />
      </TableCell>
      <TableCell>{row.original.number1to3}</TableCell>
      <TableCell>{row.getValue('cargoPlaces_volume')}</TableCell>

      {!table.getState().grouping.length ? (
        <TableCellControlsGroup<TData> row={row} isAcceptance={isAcceptance} />
      ) : (
        <TableCellControlsNoGroup<TData> row={row} isAcceptance={isAcceptance} />
      )}
    </TableRow>
  );
}
