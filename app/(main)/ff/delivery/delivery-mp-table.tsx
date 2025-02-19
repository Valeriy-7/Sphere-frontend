'use client';
import React, { Fragment, useState } from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import {
  ColumnFiltersState,
  getExpandedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getGroupedRowModel,
  GroupingState,
  RowSelectionState,
  RowData,
  getFacetedUniqueValues,
} from '@tanstack/react-table';

import { TableRowGroupHeader } from './TableRowGroupHeader';
import { TableRowNoGroup } from './TableRowNoGroup';
import { TableRowExpandLevel } from './TableRowExpandLevel';
import { DataTableHeader } from '@/components/date-table/data-table-header';

import { defaultColumn, fuzzyFilter, getColSizeList, type TableProps } from '@/lib/TableHelpers';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { TableRowTotal } from './TableRowTotal';
import { AggregationFn } from '@tanstack/table-core';

const { colSizeList } = getColSizeList(['w-[60px]', '', 'w-[15%]', 'w-[15%]', '', '', '', '', '']);

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateProductPlace?: (id: string, value: string) => void;
    productPlace: Record<string, string>;
  }
}

export function DeliveryMpTable<TData, TValue>({
  columns,
  data,
  isAcceptance,
}: TableProps<TData, TValue> & {
  isAcceptance?: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'number', // Must be equal to the accessorKey of the coulmn you want sorted by default
      desc: true,
    },
  ]);

  const [grouping, setGrouping] = React.useState<GroupingState>(isAcceptance ? ['groupDate1'] : []);

  const hasGrouping = grouping.length;
  const initRowSelection = {};
  data.forEach((row) => {
    initRowSelection[row.uuid] = true;
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(initRowSelection); //manage your own row selection state

  const [productPlace, setProductPlace] = useState<Record<string, string>>({});

  function updateProductPlace(id: String, value: string) {
    setProductPlace((old) => {
      old[id as string] = value;
      return old;
    });
  }

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableSubRowSelection: false,
    state: {
      rowSelection,
      grouping,
      sorting,
    },
    getRowId: (row) => row.uuid,
    onRowSelectionChange: setRowSelection,
    onGroupingChange: setGrouping,
    getRowCanExpand: () => true,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    groupedColumnMode: false,
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    meta: {
      updateProductPlace,
      productPlace,
    },
  });

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
              <TableRowTotal<TData> table={table} isAcceptance={isAcceptance} />
            </Fragment>
          ))}
        </TableHeader>
        <TableBody>
          {hasGrouping
            ? table.getRowModel().rows.map((row) => {
                return (
                  <Fragment key={row.id}>
                    <TableRowGroupHeader
                      key={row.id + 'RowGroupHeader'}
                      table={table}
                      row={row}
                      isAcceptance={isAcceptance}
                    />
                    {row.subRows.map((subRow) => (
                      <>
                        <TableRowNoGroup
                          key={row.id + 'RowNoGroup'}
                          isAcceptance={isAcceptance}
                          {...{
                            table: table,
                            row: subRow,
                            onClick: subRow.getToggleExpandedHandler(),
                            className: 'cursor-pointer',
                          }}
                        />
                        {subRow.getIsExpanded() && (
                          <TableRowExpandLevel<TData> row={row} table={table} />
                        )}
                      </>
                    ))}
                  </Fragment>
                );
              })
            : table.getRowModel().rows.map((row) => {
                return (
                  <Fragment key={row.id}>
                    <TableRowNoGroup
                      {...{
                        table: table,
                        row: row,
                        onClick: row.getToggleExpandedHandler(),
                        className: 'cursor-pointer',
                      }}
                    />
                    {row.getIsExpanded() && <TableRowExpandLevel<TData> row={row} table={table} />}
                  </Fragment>
                );
              })}
        </TableBody>
      </Table>
    </>
  );
}
