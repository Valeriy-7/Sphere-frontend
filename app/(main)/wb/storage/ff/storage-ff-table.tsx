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
  getPaginationRowModel,
  PaginationState,
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
import { DataTablePagination } from '@/components/date-table/data-table-pagination';

export function StorageFfTable<TData, TValue>({ columns, data }: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'number', // Must be equal to the accessorKey of the coulmn you want sorted by default
      desc: true,
    },
  ]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
      pagination,
    },
    onPaginationChange: setPagination,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const { colSizeList } = getColSizeList(['w-[60px]', 'w-[20%]']);

  return (
    <>
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
              <TableRowAllTotal />
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
                        {row.original.subRows.map((subRow: DataRow) => (
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
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
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
          {getTotalColumn({ table, key: 'number4' })}
        </TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number5' })}
        </TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number6' })}
        </TableHead>
        <TableHead className={'border-y-primary'} isTotal>
          {getTotalColumn({ table, key: 'number7' })}
        </TableHead>
        <TableHead className={'border-y-primary last:rounded-br-none'} isTotal>
          {getTotalColumn({ table, key: 'number8' })}
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
        <TableCell level={1}>{row.number4}</TableCell>
        <TableCell level={1}>{row.number5}</TableCell>
        <TableCell level={1}>{row.number6}</TableCell>
        <TableCell level={1}>{row.number7}</TableCell>
        <TableCell level={1}>{row.number8}</TableCell>
      </TableRow>
    </>
  );
}

function TableRowAllTotal() {
  return (
    <>
      <TableRow>
        <TableHead isTotal></TableHead>
        <TableHead isTotal colSpan={1}>
          За все время
        </TableHead>
        <TableHead isTotal>-</TableHead>
        <TableHead isTotal>-</TableHead>
        <TableHead isTotal>-</TableHead>
        <TableHead isTotal>-</TableHead>
        <TableHead isTotal>-</TableHead>
      </TableRow>
    </>
  );
}
