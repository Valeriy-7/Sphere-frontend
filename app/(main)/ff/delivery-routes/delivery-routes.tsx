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
  Row, getGroupedRowModel, GroupingState,
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
  type FFDeliveryStatsResponseDtoType,
  type FFSupplierInfoResponseDtoType,
  type FFRouteInfoResponseDtoType,
  useFFDeliveriesGetFFRouteSupplierProducts,
} from '@/kubb-gen';
import { formatCurrency } from '@/lib/formatCurrency';
import {TableRowGroupHeader} from "./TableRowGroupHeader";
import {TableHeaderGroupDateRoute} from "./table-header-group-date-route";
import {TableRowTotal} from "./TableRowTotal";

export function DeliveryRoutes<TData extends FFDeliveryWithRoutesResponseDtoType, TValue>({
  columns,
  data,
  stats,
}: TableProps<TData, TValue> & { stats: FFDeliveryStatsResponseDtoType }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [globalFilter, setGlobalFilter] = useState('');

  const [grouping, setGrouping] = React.useState<GroupingState>(['deliveryId']);

  const hasGroupingRoute = grouping[0] !== 'deliveryId'

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
      hasGroupingRoute,
      columnVisibility: {
        deliveryId: false,
      },
      // sorting,
      columnFilters,
      globalFilter,
      grouping,
    },
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'auto', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    maxLeafRowFilterDepth: 0,
    groupedColumnMode: false,
    getGroupedRowModel: getGroupedRowModel(),
    onGroupingChange: setGrouping,
  });

  const { colSizeList } = getColSizeList(['w-[60px]', '', '', '', '', '', '', '', '']);

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
              <TableHeaderGroupDateRoute
                  table={table}
                  row={row}
              />
              {row.subRows.map((row) => (<>
                    <TableRowRoute
                        key={row.id}
                        row={row} data={row.original}
                        colSizeList={colSizeList}
                        {...{
                          onClick: row.getToggleExpandedHandler(),
                          className: 'cursor-pointer',
                        }}
                    >
                    </TableRowRoute>
              </>))}

           {/*   {row.getIsExpanded() &&
                row.original.routes.map((val, index) => (
                  <>
                    <TableRowRoute colSizeList={colSizeList} row={row} data={val} />
                  </>
                ))}*/}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

import { HelpCircle } from 'lucide-react';
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
      <TableRowExpand colSpan={row.getVisibleCells().length}>
        <Table colSizeList={colSizeList}>
          <TableBody>
            <TableRow rowSpace={false}>
              <TableCell colSpan={2} level={1}>
                Номер поставки {data.deliveryNumber}  <HelpCircle /> <br/>
                {data.cabinetInfo.levName} <br/>
                {data.cabinetInfo.levPhone}
              </TableCell>

              <TableCell level={1}>
                {data.name} <br />
                {data.address}
              </TableCell>
            {/*  <TableCell level={1}>{formatCurrency(data.planQuantity)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.factQuantity)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.defects)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.productsPrice)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.ffServicesPrice)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.logisticsToFFPrice)}</TableCell>
              <TableCell level={1}>{formatCurrency(data.totalPrice)}</TableCell>*/}
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
 {/*       <TableCell level={1}>{formatCurrency(supplierInfo.planQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.factQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.defects)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.productsPrice)}</TableCell>
        <TableCell level={1}>{formatCurrency(supplierInfo.ffServicesPrice)}</TableCell>*/}
        <TableCell level={1}></TableCell>
        <TableCell level={1}></TableCell>
      </TableRow>
      <TableRow rowSpace={false}>
        <TableCell className={'border-none align-top'} colSpan={2} rowSpan={subRows.length + 2}>
          <ul>
            <li>{supplierInfo.contactPerson}</li>
            <li>{supplierInfo.contactPhone}</li>
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
  {/*      <TableCell level={1}>{formatCurrency(row.planQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.factQuantity)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.defects)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.price)}</TableCell>
        <TableCell level={1}>{formatCurrency(row.logisticsPrice)}</TableCell>*/}
        <TableCell level={1}></TableCell>
        <TableCell level={1}></TableCell>
      </TableRow>
    </>
  );
}
