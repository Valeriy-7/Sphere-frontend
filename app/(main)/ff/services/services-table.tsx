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
import { formatCurrency } from '@/lib/formatCurrency';
import { CurrencyInput } from '@/components/currency-input';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { PortalContext } from './portal-context';
import { fa } from '@faker-js/faker';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './schema';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

// Give our default column cell renderer editing superpowers!

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  onSubmit: (props: OnSubmitProps) => void;
  //portalContainer:HTMLElement | null
  form: UseFormReturn<FormValues>;
}

type OnSubmitProps = {
  removeIds: number[];
  newRows: [];
  updateRows: [];
  rows: [];
};

export function ServicesTable<TData, TValue>({
  form,
  columns,
  initialData,
  onSubmit,
  //portalContainer,
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

  const portalContainer = useContext(PortalContext);

  const defaultColumn: Partial<ColumnDef<TData>> = {
    cell: ({ getValue, row: { index }, column: { id }, table, column }) => {
      const form = table.options.meta?.form;

      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        if (typeof value === 'number') {
          return formatCurrency(value);
        }
        return value;
      }

      if (typeof value === 'number') {
        return (
          <>
            {
              <FormField
                control={form.control}
                name={`rows.${index}.${id}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyInput
                        size={'xs'}
                        style={{ fieldSizing: 'content' }}
                        className={
                          'ml-auto mr-auto block w-full rounded-md bg-transparent text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                        }
                        value={value}
                        onChange={(val) => {
                          setValue(val);
                          field.onChange(val);
                        }}
                        onBlur={() => {
                          onBlur();
                          field.onBlur();
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            }
            {/*   <FormField
                control={form.control}
                name={`rows.${index}.${id}`}
                render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                            type={"number"}
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
            />*/}
          </>
        );
      }
      console.log(form?.formState.errors);
      return (
        <>
          <FormField
            control={form.control}
            name={`rows.${index}.${id}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    {...field}
                    style={{ fieldSizing: 'content' }}
                    className={
                      'block w-full rounded-md bg-transparent text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                    }
                    value={value as string}
                    onChange={(e) => {
                      setValue(e.target.value);
                      form?.setValue(`rows.${index}.${id}`, e.target.value);
                    }}
                    onBlur={onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    },
  };

  const [isEdit, setIsEdit] = useState(false);

  const resetData = () => {
    setData(initialData);
  };
  const [idsRemoveRow, setIdsRemoveRow] = useState<number[]>([]);

  const addRow = () => {
    setIsEdit(true);
    setData((old) => [
      ...old,
      {
        name: '',
        number: old.length + 1,
        id: old.length,
        price: 0,
        description: '',
        createdAt: new Date(),
        _isNew: true,
      },
    ]);
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    // Provide our updateData function to our table meta
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
            removeIds: idsRemoveRow,
            rows: data,
          });
        })();
      },
      deleteRow: (rowIndex) => {
        setData((old) =>
          old.filter((row, index) => {
            if (index == rowIndex && !row._isNew) {
              setIdsRemoveRow([row.id, ...idsRemoveRow]);
            }

            return index !== rowIndex;
          }),
        );
      },
      updateData: (rowIndex, columnId, value) => {
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
      },
    },
    debugTable: true,
    state: {
      columnVisibility: {
        image: false,
        imageUrl: false,
      },
      sorting,
      /*   sorting:[{
        id: 'number', // Must be equal to the accessorKey of the coulmn you want sorted by default
        desc: true,
      },]*/
    },
  });
  return (
    <>
      <Button
        onClick={(e) => {
          console.log(e);
          form.handleSubmit(e);
        }}
      >
        onSubmit
      </Button>
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
