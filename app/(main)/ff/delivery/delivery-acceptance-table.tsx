'use client';
import React, { Fragment, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
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
import { TableRowAcceptance } from './TableRowAcceptance';
import { TableRowGroupHeader } from './TableRowGroupHeader';
import { TableRowNoGroup } from './TableRowNoGroup';
import { TableRowExpandLevel } from './TableRowExpandLevel';
import { defaultColumn, fuzzyFilter, getColSizeList, type TableProps } from '@/lib/TableHelpers';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { TableRowTotal } from './TableRowTotal';
import { cn } from '@/lib/utils';
import { DataRow } from '@/lib/makeData';
import { Input } from '@/components/ui/input';
import { flexRender } from '@tanstack/react-table';
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

export function DeliveryAcceptanceTable<TData extends { uuid: string } = DataRow, TValue = unknown>({
  columns,
  data,
  isAcceptance,
  searchQuery,
  setSearchQuery,
  wbCabinetInfo,
}: TableProps<TData, TValue> & {
  isAcceptance?: boolean;
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

  // Force grouping to always be enabled for acceptance view
  const [grouping, setGrouping] = React.useState<GroupingState>(['groupDate1']);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
                {/* Hide the search/total row for acceptance view */}
              </Fragment>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Fragment key={row.id}>
                  <TableRowGroupHeader
                    key={row.id + 'RowGroupHeader'}
                    table={table}
                    row={row}
                    isAcceptance={isAcceptance}
                  />
                  {row.subRows.map((subRow) => (
                    <Fragment key={subRow.id}>
                      <TableRowAcceptance
                        key={subRow.id + 'RowAcceptance'}
                        table={table}
                        row={subRow}
                        onClick={subRow.getToggleExpandedHandler()}
                        className="cursor-pointer"
                        wbCabinetInfo={wbCabinetInfo}
                      />
                      {subRow.getIsExpanded() && (
                        <TableRowExpandLevel 
                          row={subRow} 
                          table={table} 
                          colSizeList={colSizeList}
                          wbCabinetInfo={wbCabinetInfo}
                        />
                      )}
                    </Fragment>
                  ))}
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