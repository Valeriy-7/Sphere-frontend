'use client';
import React, { Fragment, useState } from 'react';
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
  Row,
} from '@tanstack/react-table';

import { TableHeaderSort } from '@/components/date-table/table-header-sort';

import {
  type ColSizeList,
  defaultColumn,
  fuzzyFilter,
  getColSizeList,
  getTotalColumn,
  type TableProps,
} from '@/lib/TableHelpers';
import { TableCardImgText, TableImgText } from '@/components/date-table/table-img-text';
import {
  FFDeliveryWithRoutesResponseDtoType,
  FFDeliveryProductDtoType,
  FFDeliveryResponseDtoType,
  type SupplierInfoDtoType,
  useFFDeliveriesGetFFDeliveryProducts,
  type FFDeliveryStatsResponseDtoType,
  type FFSupplierInfoResponseDtoType,
  type FFRouteInfoResponseDtoType,
  useFFDeliveriesGetFFRouteSupplierProducts,
} from '@/kubb-gen';
import { formatCurrency } from '@/lib/formatCurrency';

export function DeliveryFfTable<TData extends FFDeliveryWithRoutesResponseDtoType, TValue>({
  columns,
  data,
  stats,
}: TableProps<TData, TValue> & Pick<FFDeliveryResponseDtoType, 'stats'>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [globalFilter, setGlobalFilter] = useState('');

  const [sorting, setSorting] = useState<SortingState>([
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
  });

  const { colSizeList } = getColSizeList(['w-[60px]', '', '', '', '', '', '', '', '', '']);

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
              {row.getIsExpanded() &&
                row.original.routes.map((val, index) => (
                  <>
                    <TableRowRoute colSizeList={colSizeList} row={row} data={val} />
                    {/*     <TableRowSupplier
                          supplierInfo={supplierInfo}
                          colSizeList={colSizeList}
                          row={row}
                      />*/}
                  </>
                ))}
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
}: {
  table: TTable<TData>;
  stats: FFDeliveryStatsResponseDtoType;
}) {
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
        <TableHead isTotal></TableHead>
        <TableHead isTotal>{formatCurrency(stats.planQuantity)}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.factQuantity)}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.defects)}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.productsPrice)}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.ffServicesPrice)}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.logisticsToFFPrice)}</TableHead>
        <TableHead isTotal>{formatCurrency(stats.totalPrice)}</TableHead>
      </TableRow>
    </>
  );
}

export function TableRowRoute<TData extends FFDeliveryWithRoutesResponseDtoType>({
  row,
  colSizeList,
  table,
  data,
}: {
  row: Row<TData>;
  table: TTable<TData>;
  data: FFRouteInfoResponseDtoType;
} & ColSizeList) {
  return (
    <>
      {/*   <TableRow>
        <TableCell> </TableCell>
        <TableCell>Поставщик</TableCell>
        <TableCell>
          <TableCardImgText image={{ src: undefined }} title={supplierInfo.name} />
        </TableCell>
        <TableCell colSpan={2}>{supplierInfo.contactPerson}</TableCell>
        <TableCell colSpan={2}>{supplierInfo.contactPhone}</TableCell>
        <TableCell colSpan={2}>{supplierInfo.address}</TableCell>
        <TableCell colSpan={2}>{supplierInfo.location}</TableCell>
      </TableRow>*/}
      <TableRowExpand colSpan={row.getVisibleCells().length}>
        <Table colSizeList={colSizeList}>
          <TableBody>
            <TableRow rowSpace={false}>
              <TableCell colSpan={2} level={1}>
                {data.name} <br />
                {data.address}
              </TableCell>

              <TableCell level={1}></TableCell>
              <TableCell level={1}>{formatCurrency(data.planQuantity)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.factQuantity)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.defects)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.productsPrice)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.ffServicesPrice)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.logisticsToFFPrice)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.totalPrice)}</TableCell>
            </TableRow>

            {data.suppliers.map((i) => (
              <TableRowSupplier
                routerId={data.id}
                supplierInfo={i}
                colSizeList={colSizeList}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableRowExpand>
    </>
  );
}

export function TableRowSupplier<TData extends FFDeliveryWithRoutesResponseDtoType>({
  row,
  colSizeList,
  table,
  supplierInfo,
  routerId,
}: {
  routerId: string;
  row: Row<TData>;
  table: TTable<TData>;
  supplierInfo: FFSupplierInfoResponseDtoType;
} & ColSizeList) {
  const { data: subRows = [] } = useFFDeliveriesGetFFRouteSupplierProducts(
    routerId,
    supplierInfo.id,
  );
  return (
    <>
      <TableRow rowSpace={false}>
        <TableCell level={1} colSpan={2}>
          <TableCardImgText image={{ src: undefined }} title={supplierInfo.name} />
        </TableCell>
        <TableCell level={1}>{subRows.length}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.planQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.factQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.defects)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.productsPrice)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.ffServicesPrice)}</TableCell>
        <TableCell level={1}></TableCell>
        <TableCell level={1}></TableCell>
      </TableRow>
      <TableRow rowSpace={false}>
        <TableCell className={'border-none align-top'} colSpan={2} rowSpan={subRows.length + 2}>
          <ul>
            <li>{supplierInfo.contactPerson}</li>
            <li>{supplierInfo.contactPhone}</li>
            <li>{supplierInfo.address}</li>
            <li>{supplierInfo.location}</li>
          </ul>
        </TableCell>
      </TableRow>
      {subRows.map((subRow, index) => (
        <TableRowSize
          supplierInfo={supplierInfo}
          index={index}
          length={subRows.length}
          key={subRow.id}
          row={subRow}
        />
      ))}
    </>
  );
}

function TableRowSize({
  supplierInfo,
  row,
  length,
  index,
}: {
  supplierInfo: SupplierInfoDtoType;
  row: FFDeliveryProductDtoType;
  length: number;
  index: number;
}) {
  return (
    <>
      <TableRow rowSpace={false}>
        {/*   {index===0 &&  (
              <TableCell rowSpan={length} level={1}>
                  1 2 3
              </TableCell>
          )}*/}

        <TableCell level={1}>
          <TableImgText
            image={{ src: row.imageUrl }}
            title={row.name}
            text={`Aрт: ${row.article}`}
          />
        </TableCell>
        <TableCell level={1}>{formatCurrency(row.planQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.factQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.defects)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.price)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.logisticsPrice)}</TableCell>
        <TableCell level={1}></TableCell>
        <TableCell level={1}></TableCell>
      </TableRow>
    </>
  );
}
