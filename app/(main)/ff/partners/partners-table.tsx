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

import {
  defaultColumn,
  fuzzyFilter,
  getColSizeList,
  getTotalColumn,
  type TableProps,
} from '@/lib/TableHelpers';

import { PartnerCabinetDtoType, PartnersResponseDtoType, PartnerStatsDtoType } from '@/kubb-gen';
import { formatCurrency } from '@/lib/formatCurrency';

export function PartnersTable<TData extends PartnerCabinetDtoType, TValue>({
  columns,
  data,
  stats,
}: TableProps<TData, TValue> & { stats: PartnerStatsDtoType }) {
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
      // sorting,
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

  const { colSizeList } = getColSizeList(['w-[60px]']);

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
            <TableRowTotal<TData> table={table} stats={stats} />
          </Fragment>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Fragment key={row.id}>
              <TableRow>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

function TableRowTotal<TData>({
  table,
  stats,
}: { table: TTable<TData> } & { stats: PartnerStatsDtoType }) {
  return (
    <>
      <TableRow>
        <TableHead isTotal colSpan={2}>
          <Input
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="h-auto px-1 md:text-xs"
            placeholder="Поиск"
          />
        </TableHead>

        <TableHead isTotal>{formatCurrency(stats.totalIncome, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalFfDeliveries, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalProductsCount, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalDefectsCount, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalConsumablesAmount, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalPvzReturnsCount, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalWbDeliveries, 'number')}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalProductAmount, 'number')}</TableHead>
      </TableRow>
    </>
  );
}
