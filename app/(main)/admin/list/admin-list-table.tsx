'use client';

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
import { TableFilter } from '@/app/(main)/ui/tanstack/filter/table-filter';

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
import { useState } from 'react';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AdminListTable<TData, TValue>({ columns, data }: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
    //getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
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
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
