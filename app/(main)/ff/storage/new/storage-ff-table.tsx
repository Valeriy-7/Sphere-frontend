'use client';
import React, { Fragment } from 'react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowExpand,
} from '@/components/ui/table';

import {
  Table as TTable,
  ColumnFiltersState,
  flexRender,
  getExpandedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';

import { TableHeaderSort } from '@/components/date-table/table-header-sort';

import type { DataRow } from '@/lib/makeData';

import {
  defaultColumn,
  fuzzyFilter,
  getColSizeList,
  getTotalColumn,
  type TableProps,
} from '@/lib/TableHelpers';

export function StorageFfTable<TData, TValue>({ columns, data }: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'number', // Must be equal to the accessorKey of the coulmn you want sorted by default
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const { colSizeList } = getColSizeList(['w-[60px]', 'w-[20%]']);

  return (
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
            <TableRowTotal<TData> table={table} />
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
                  className: 'cursor-pointer',
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
              {row.getIsExpanded() && (
                <TableRowExpand colSpan={row.getVisibleCells().length}>
                  <Table colSizeList={colSizeList}>
                    <TableBody>
                      {row.original.subRows.map((subRow) => (
                        <TableRowSize key={subRow.uuid} row={subRow} />
                      ))}
                    </TableBody>
                  </Table>
                </TableRowExpand>
              )}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

function TableRowTotal<TData>({ table }: { table: TTable<TData> }) {
  return (
    <>
      <TableRow rowSpace={false}>
        <TableHead className={'border-y-primary first:rounded-bl-none'} isTotal></TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          <Input
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="h-auto px-1 md:text-xs"
            placeholder="Поиск"
          />
        </TableHead>

        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number2' })}
        </TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number1' })}
        </TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number3' })}
        </TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number4' })}
        </TableHead>
        <TableHead className={'border-y-primary last:rounded-br-none'} isTotal>
          {getTotalColumn({ table, key: 'number5' })}
        </TableHead>
      </TableRow>
    </>
  );
}

function TableRowSize({ row }: { row: DataRow }) {
  return (
    <>
      <TableRow rowSpace={false}>
        <TableCell level={1}></TableCell>
        <TableCell className={''} level={1}>
          <div className={'flexflex'}>{row.size}</div>
        </TableCell>
        <TableCell level={1}>{row.number1}</TableCell>
        <TableCell level={1}>{row.number2}</TableCell>
        <TableCell level={1}>{row.number3}</TableCell>
        <TableCell level={1}>{row.number4}</TableCell>
        <TableCell level={1}>{row.number6}</TableCell>
      </TableRow>
    </>
  );
}
