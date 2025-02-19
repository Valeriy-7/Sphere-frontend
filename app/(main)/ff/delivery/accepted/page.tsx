'use client';

import { columns } from './columns';
import React, { Fragment } from 'react';
import { makeData, DataRow } from '@/lib/makeData';
import { TableHead, TableHeader, TableRow, Table, TableBody } from '@/components/ui/table';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';

import { colSizeList } from '../common';
import { getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { TableRowNoGroup } from '../TableRowNoGroup';
import { TableRowExpandLevel } from '../TableRowExpandLevel';

const initData = makeData();
export default function DeliveryAcceptedPage() {
  const [data, setData] = React.useState(initData);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getRowId: (row) => row.uuid,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1>Поставки на фф принято</h1>
      <Table colSizeList={colSizeList}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id + 'Fragment'}>
              <TableRow rowSpace={false} key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className}
                    >
                      {header.isPlaceholder ? null : <TableHeaderSort header={header} />}
                    </TableHead>
                  );
                })}
              </TableRow>
            </Fragment>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment key={row.id}>
                <TableRowNoGroup
                  {...{
                    isAcceptance: true,
                    table: table,
                    row: row,
                    onClick: row.getToggleExpandedHandler(),
                    className: 'cursor-pointer',
                  }}
                />
                {row.getIsExpanded() && <TableRowExpandLevel row={row} table={table} />}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
