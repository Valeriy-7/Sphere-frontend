import { Row, Table as TTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow, TableRowExpand } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { type ColSizeList } from '@/lib/TableHelpers';
import React from 'react';
import type { DataRow } from '@/lib/makeData';
import { TableImgText } from '@/components/date-table/table-img-text';
import { DeliveryStatusProps } from './common';

export function TableRowExpandLevel<TData>({
  row,
  colSizeList,
  table,
}: { row: Row<TData>; table: TTable<TData> } & ColSizeList) {
  return (
    <TableRowExpand colSpan={row.getVisibleCells().length}>
      <Table colSizeList={colSizeList}>
        <TableBody>
          <TableRow rowSpace={false}>
            <TableCell level={1} rowSpan={row.original.subRows.length + 2}></TableCell>
            <TableCell level={1} rowSpan={row.original.subRows.length + 2}>
              <ul>
                <li>Кристина</li>
                <li>+7 (922) 333-08-32</li>
              </ul>
            </TableCell>
            <TableCell level={1} rowSpan={row.original.subRows.length + 2} className={'text-left'}>
              <ul>
                <li>Ул. Тихорецкий б-р 1</li>
                <li>Секция А 2Д-08</li>
                <li>Время с 08:00 до 18:00</li>
                <li>ИП Смирнов С. Д.</li>
              </ul>
            </TableCell>
          </TableRow>
          {row.original.subRows.map((subRow, index) => (
            <TableSubRow<TData>
              table={table}
              status={row.original.status}
              index={index}
              length={row.original.subRows.length}
              key={subRow.uuid}
              row={subRow}
            />
          ))}
        </TableBody>
      </Table>
    </TableRowExpand>
  );
}

function TableSubRow<TData>({
  row,
  length,
  index,
  table,
  status,
}: {
  table: TTable<TData>;
  row: DataRow;
  length: number;
  index: number;
} & DeliveryStatusProps) {
  const [value, setValue] = React.useState('');

  const onBlur = () => {
    console.log(row.uuid, value);
    table.options.meta?.updateProductPlace(row.uuid, value);
  };
  return (
    <>
      <TableRow rowSpace={false}>
        <TableCell level={1}>{row.number1}</TableCell>
        <TableCell level={1} colSpan={4}>
          <TableImgText image={{ src: row.image }} title={row.title} text={`Aрт: ${row.art}`} />
        </TableCell>
      </TableRow>
    </>
  );
}
