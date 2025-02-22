'use client';
import React, { useContext, useEffect, useState } from 'react';

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { PortalContext } from './portal-context';

import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { FormValues } from './schema';

import { defaultColumn, ServicesItemType } from './columns';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    isEdit?: boolean;
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteRow?: (rowIndex: number) => void;
    onSubmit: (props: OnSubmitProps) => void;
    resetData?: () => void;
    form: UseFormReturn<FormValues>;
  }
}

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  onSubmit: (props: OnSubmitProps<TData>) => void;
  form: UseFormReturn<FormValues>;
}

type OnSubmitProps<TData> = {
  removeIds: string[];
  newRows: TData[];
  updateRows: TData[];
  rows: TData[];
};
type LocalOperation = {
  _isNew?: boolean;
  _isUpdate?: true;
};
type ServicesItem = {
  _isNew?: boolean;
  _isUpdate?: boolean;
} & ServicesItemType;
export function ServicesTable<TData extends ServicesItem, TValue>({
  form,
  columns,
  initialData,
  onSubmit,
}: TableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>([]);

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: 'number', // Must be equal to the accessorKey of the coulmn you want sorted by default
      desc: true,
    },
  ]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const { append: formAppend, remove: formRemove } = useFieldArray({
    control: form.control,
    name: 'rows',
  });

  const portalContainer = useContext(PortalContext);

  const [isEdit, setIsEdit] = useState(false);

  const [listRemoveRow, setIdsRemoveRow] = useState<TData[]>([]);

  const resetData = () => {
    setIsEdit(false);
    setData(initialData);
  };

  const addRow = () => {
    const row = {
      name: '',
      number: data.length + 1,
      price: 0,
      description: '',
    };
    formAppend(row);
    setData((old) => [
      ...old,
      {
        ...row,
        _isNew: true,
      },
    ]);
    setIsEdit(true);
  };

  const deleteRow = (rowIndex) => {
    console.log(rowIndex);
    setData((old) =>
      old.filter((row, index) => {
        if (index == rowIndex) {
          setIdsRemoveRow([row, ...listRemoveRow]);
        }
        return index !== rowIndex;
      }),
    );
    formRemove(rowIndex);
  };

  const updateData = (rowIndex, columnId, value) => {
    setData((old) => {
      const newData = old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex]!,
            [columnId]: value,
            _isUpdate: true,
          };
        }
        return row;
      });
      //onSubmit(newData)

      return newData;
    });
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    meta: {
      form,
      resetData,
      isEdit,
      setIsEdit,
      onSubmit: () => {
        form.handleSubmit(() => {
          setIsEdit(false);
          console.log('handleSubmit');
          onSubmit({
            newRows: data.filter((i) => i._isNew).map(({ number, ...i }) => ({ ...i })),
            updateRows: data
              .filter((i) => i._isUpdate && !i._isNew)
              .map(({ number, ...i }) => ({ ...i })),
            removeIds: listRemoveRow.filter((i) => !i._isNew).map((i) => i.id),
            rows: data,
          });
        })();
      },
      deleteRow,
      updateData,
    },
    state: {
      columnVisibility: {
        image: false,
        imageUrl: false,
      },
      sorting,
    },
  });
  return (
    <>
      {portalContainer && createPortal(<Button onClick={addRow}>Добавить</Button>, portalContainer)}
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
    </>
  );
}
