'use client';

import { columns } from './columns';
import React, { Fragment } from 'react';
import { makeData, DataRow } from '@/lib/makeData';
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';

import { colSizeList } from '../common';
import { getCoreRowModel, getExpandedRowModel, Row, useReactTable } from '@tanstack/react-table';
import { TableRowNoGroup } from '../TableRowNoGroup';
import { TableRowExpandLevel } from './TableRowExpandLevel';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormSchema, FormValues } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Table as TTable } from '@tanstack/table-core/build/lib/types';
import { formatDate } from '@/lib/utils/formatDate';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import { TableCellControlsGroup } from '@/app/(main)/ff/prepare/TableCellControlsGroup';
import { DatePicker } from '@/components/date-picker';
import { TableSelectLogistics } from '@/app/(main)/ff/prepare/TableSelectLogistics';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const initData = makeData();
export default function PrepareInprogressPage() {
  const [data, setData] = React.useState(initData);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getRowId: (row) => row.uuid,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1>Подготовка в работе</h1>
      <Table colSizeList={colSizeList}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id + 'Fragment'}>
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
            </Fragment>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRowContent row={row} table={table} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function TableRowContent<TData>({ row, table }: { row: Row<TData>; table: TTable<TData> }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: row.original.uuid,
      rows: row.original?.subRows.map((row) => {
        return {
          id: row.uuid,
          factList: [1, 2, 3],
          defectiveList: [1, 2, 3],
        };
      }),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('ЕЙ');
  }

  console.log(form.formState.errors);

  return (
    <Fragment key={row.id}>
      <Form {...form}>
        <TableRow className={'cursor-pointer'} onClick={row.getToggleExpandedHandler()}>
          <TableCell>1</TableCell>
          <TableCell>{formatDate(row.original.groupDate1)}</TableCell>
          <TableCell>
            <TableCardImgText
              image={{ src: row.original.image }}
              title={row.original.groupStoreName}
              text={row.original.groupPlace}
            />
          </TableCell>
          <TableCell>{row.original.number1to3}</TableCell>
          <TableCell>{formatDate(row.original.date1)}</TableCell>
          <TableCell>
            <TableSelectLogistics />
          </TableCell>
          <TableCell></TableCell>
          <TableCell onClick={(e) => e.stopPropagation()}>
            <Button
              type={'button'}
              onClick={form.handleSubmit(onSubmit)}
              variant={'outline'}
              size={'xs'}
            >
              В работу
            </Button>
          </TableCell>
        </TableRow>
        {row.getIsExpanded() && (
          <TableRowExpandLevel
            key={row.id + 'TableRowExpandLevel'}
            form={form}
            row={row}
            table={table}
          />
        )}
      </Form>
    </Fragment>
  );
}
