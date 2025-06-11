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
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table';

import { TableRowGroupHeader } from './TableRowGroupHeader';
import { TableRowNoGroup } from './TableRowNoGroup';
import { TableRowExpandLevel } from './TableRowExpandLevel';
import { DataTableHeader } from '@/components/date-table/data-table-header';

import { defaultColumn, fuzzyFilter, getColSizeList, type TableProps } from '@/lib/TableHelpers';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { TableRowTotal } from './TableRowTotal';
import { AggregationFn } from '@tanstack/table-core';
import { cn } from '@/lib/utils';
import { DataRow } from '@/lib/makeData';
import { DataTablePagination } from '@/components/date-table/data-table-pagination';

// Update column sizes for the new structure: №, Дата поставки, Магазин, Кол-во товаров, Гр. мест, Объём, Ответственный, Тип логистики, Статус
const { colSizeList } = getColSizeList(['w-[60px]', 'w-[150px]', 'w-[20%]', 'w-[10%]', 'w-[10%]', 'w-[10%]', 'w-[15%]', 'w-[15%]', 'w-[10%]']);

// Define our custom table meta properties
interface CustomTableMeta {
  updateProductPlace?: (id: string, value: string) => void;
  productPlace: Record<string, string>;
}

interface WbCabinetInfo {
  id: string;
  companyName?: string;
  legalCompanyName?: string;
  avatarUrl?: string;
  contactPhone?: string;
}

// We won't extend the TableMeta interface to avoid type conflicts

export function DeliveryMpTable<TData extends { uuid: string } = DataRow, TValue = unknown>({
  columns,
  data,
  isAcceptance,
  isAccepted,
  defaultGrouped,
  searchQuery,
  setSearchQuery,
  wbCabinetInfo,
}: TableProps<TData, TValue> & {
  isAcceptance?: boolean;
  isAccepted?: boolean;
  defaultGrouped?: boolean;
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  wbCabinetInfo?: WbCabinetInfo | null;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'number', // Must be equal to the accessorKey of the coulmn you want sorted by default
      desc: true,
    },
  ]);

  const [grouping, setGrouping] = React.useState<GroupingState>(defaultGrouped ? ['groupDate1'] : []);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const hasGrouping = grouping.length;
  const initRowSelection: Record<string, boolean> = {};
  data.forEach((row) => {
    initRowSelection[row.uuid] = true;
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(initRowSelection);

  const [productPlace, setProductPlace] = useState<Record<string, string>>({});

  function updateProductPlace(id: string, value: string) {
    setProductPlace((old) => {
      const updated = { ...old };
      updated[id] = value;
      return updated;
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
      pagination,
    },
    getRowId: (row) => row.uuid,
    onRowSelectionChange: setRowSelection,
    onGroupingChange: setGrouping,
    onPaginationChange: setPagination,
    getRowCanExpand: () => true,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    groupedColumnMode: false,
    getGroupedRowModel: getGroupedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    // Use type assertion with unknown to avoid type conflicts
    meta: {
      updateProductPlace,
      productPlace,
    } as unknown as any,
  });

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg">
        <Table colSizeList={colSizeList} className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id + 'Fragment'}>
                <TableRow rowSpace={false} key={headerGroup.id} className="bg-purple-500">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          "text-white font-medium",
                          header.column.columnDef.meta?.className
                        )}
                      >
                        {header.isPlaceholder ? null : <TableHeaderSort header={header} />}
                      </TableHead>
                    );
                  })}
                </TableRow>
                <TableRowTotal<TData> 
                  table={table} 
                  isAcceptance={isAcceptance} 
                  isAccepted={isAccepted}
                  defaultGrouped={defaultGrouped}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
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
                        isAccepted={isAccepted}
                      />
                      {row.subRows.map((subRow) => (
                        <>
                          <TableRowNoGroup
                            key={row.id + 'RowNoGroup'}
                            isAcceptance={isAcceptance}
                            isAccepted={isAccepted}
                            wbCabinetInfo={wbCabinetInfo}
                            {...{
                              table: table,
                              row: subRow,
                              onClick: subRow.getToggleExpandedHandler(),
                              className: 'cursor-pointer',
                            }}
                          />
                          {subRow.getIsExpanded() && (
                            <TableRowExpandLevel 
                              row={row} 
                              table={table} 
                              colSizeList={colSizeList}
                              wbCabinetInfo={wbCabinetInfo}
                            />
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
                        wbCabinetInfo={wbCabinetInfo}
                        isAccepted={isAccepted}
                        {...{
                          table: table,
                          row: row,
                          onClick: row.getToggleExpandedHandler(),
                          className: 'cursor-pointer',
                        }}
                      />
                      {row.getIsExpanded() && (
                        <TableRowExpandLevel 
                          row={row} 
                          table={table} 
                          colSizeList={colSizeList}
                          wbCabinetInfo={wbCabinetInfo}
                        />
                      )}
                    </Fragment>
                  );
                })}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
