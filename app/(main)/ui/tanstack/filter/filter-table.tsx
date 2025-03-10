'use client';
import React, { Fragment, PropsWithChildren, ReactNode } from 'react';

import {
  Table as TTable,
  Header,
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getExpandedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { DataTablePagination } from '@/components/date-table/data-table-pagination';

import { type FormatCurrency } from '@/lib/formatCurrency';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableRowExpand,
} from '@/components/ui/table';

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
    totalComponent?: (props: PropsWithChildren) => React.ReactNode;
    className?: string;
    editDisabled?: boolean;
    formatCurrency?: FormatCurrency;
  }
}

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function FilterTable<TData, TValue>({ columns, data }: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id + 'Fragment'}>
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : <TableHeaderSort header={header} />}
                    </TableHead>
                  );
                })}
              </TableRow>
              <TableRow key={headerGroup.id + 'total'}>
                {headerGroup.headers.map((header) => {
                  const totalComponent = header.column.columnDef.meta?.totalComponent;
                  return (
                    <TableHead isTotal key={header.id + 'total'} colSpan={header.colSpan}>
                      {header.column.getCanFilter() ? (
                        <TableFilter column={table.getColumn(header.id)}></TableFilter>
                      ) : null}
                      {flexRender(totalComponent, table)}
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
                <TableRow
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                  }}
                >
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRowExpand colSpan={row.getVisibleCells().length}>t1</TableRowExpand>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <div className="h-2" />
      <DataTablePagination table={table} />
      <pre>{JSON.stringify({ columnFilters: table.getState().columnFilters }, null, 2)}</pre>
    </div>
  );
}
