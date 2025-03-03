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
  PaginationState,
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
} from '@/components/ui/table';
import React, { useState, useTransition } from 'react';
import {
  AdminGetListQueryParamsModeEnumType,
  type ListItemDtoType,
  useAdminGetList,
  useAdminGetListSuspense,
} from '@/kubb-gen';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  mode: AdminGetListQueryParamsModeEnumType;
}

export function AdminListTable<TData extends ListItemDtoType, TValue extends unknown>({
  columns,
  mode,
}: TableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, // Todo на бэке сделать такой же контракт?
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {
    data: { pages, items },
  } = useAdminGetListSuspense({ mode, limit: pagination.pageSize, page: pagination.pageIndex + 1 });

  const [isPending, startTransition] = useTransition();

  const table = useReactTable({
    data: items,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      pagination,
    },
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    //getSortedRowModel: getSortedRowModel(),
    pageCount: pages,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      startTransition(() => {
        setPagination(updater);
      });
    },
    manualPagination: true,
  });
  return (
    <>
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
              <TableRow className={isPending ? 'opacity-50' : ''} key={row.id}>
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
      <DataTablePagination table={table} />
    </>
  );
}
