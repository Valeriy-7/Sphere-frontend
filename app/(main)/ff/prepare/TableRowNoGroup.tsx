import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import { TableCellControlsGroup } from './TableCellControlsGroup';
import React from 'react';
import { useWbCabinetInfo } from '@/app/(main)/ff/delivery/hooks/useWbCabinetInfo';

export function TableRowNoGroup<TData>({
  table,
  row,
  onClick,
  className,
  context = 'new',
}: {
  table: TTable<TData>;
  row: Row<TData>;
  onClick: () => void;
  className?: string;
  context?: 'new' | 'inprogress' | 'completed';
}) {
  const rowData = row.original as any; // Type assertion for DataRow properties
  const { wbCabinetInfo } = useWbCabinetInfo();

  return (
    <TableRow className={className} onClick={onClick}>
      <TableCell>1</TableCell>
      <TableCell>{formatDate(rowData.groupDate1)}</TableCell>

      <TableCell>
        <TableCardImgText
          image={{ src: rowData.image }}
          title={rowData.groupStoreName}
          text={wbCabinetInfo?.legalCompanyName}
        />
      </TableCell>
      <TableCell>{rowData.number1to3}</TableCell>

      <TableCellControlsGroup<TData> table={table} row={row} context={context} />
    </TableRow>
  );
}
