'use client';
import React, { Fragment, useEffect, useState } from 'react';

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  SortingState,
  getSortedRowModel,
  Row,
  getExpandedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowExpand,
} from '@/components/ui/table';

import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { FormValues, FormSchema } from './schema';

import { columns, ColumnData } from './columns';
import { zodResolver } from '@hookform/resolvers/zod';

import { Check, Pencil, X } from 'lucide-react';
import { Table as TTable } from '@tanstack/table-core';
import { ColSizeList } from '@/lib/TableHelpers';
import { TableImgText } from '@/components/date-table/table-img-text';
import { formatCurrency } from '@/lib/formatCurrency';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { CurrencyInput } from '@/components/currency-input';

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
} & ColumnData;
export function ProductsTable<TData extends ColumnData, TValue>({
  colSizeList,
  initialData,
  onSubmit,
}: TableProps<TData, TValue> & ColSizeList) {
  const [data, setData] = React.useState<TData[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rows: initialData },
  });

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

  const [isEdit, setIsEdit] = useState(false);

  const [listRemoveRow, setIdsRemoveRow] = useState<TData[]>([]);

  const resetData = () => {
    setIsEdit(false);
    setData(initialData);
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
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
    <Form {...form}>
      <Table colSizeList={colSizeList}>
        <TableHeader>
          <TableRowHeader table={table} />
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.map((row) => {
            return (
              <Fragment key={row.id}>
                <TableRowProduct onClick={row.getToggleExpandedHandler()} row={row} table={table} />
                {row.getIsExpanded() &&
                  row.original?.sizeList.map((i, index) => (
                    <TableRowSize dataIndex={index} key={i.id} data={i} row={row} table={table} />
                  ))}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </Form>
  );
}

function HeaderEdit({ table }: { table: TTable<ColumnData> }) {
  const { meta } = table.options;
  if (!meta?.isEdit) {
    return (
      <button
        onClick={() => meta?.setIsEdit(true)}
        className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
      >
        <Pencil strokeWidth={1} className={'inline-flex w-4'}></Pencil>
      </button>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          meta?.onSubmit();
        }}
        className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
      >
        <Check strokeWidth={1} />
      </button>
      <button
        onClick={() => {
          meta?.resetData();
        }}
        className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
      >
        <X strokeWidth={1} />
      </button>
    </>
  );
}

function TableRowHeader({ table }: { table: TTable<ColumnData> }) {
  return (
    <TableRow rowSpace={'xs'} className={'font-medium'}>
      <TableCell className={'sticky top-0'} level={1}>
        №
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Наименование
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Артиукл
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        <HeaderEdit table={table}></HeaderEdit>
      </TableCell>
    </TableRow>
  );
}

function CellEdit({
  table,
  editType,
  initialValue,
  formName,
}: {
  formName: string;
  initialValue: string | number;
  table: TTable<ColumnData>;
  editType: 'number' | 'text';
}) {
  const isNumber = editType === 'number';

  if (!table.options.meta?.isEdit) {
    if (isNumber) {
      return formatCurrency(initialValue as number);
    }
    return initialValue;
  }

  const form = table.options.meta?.form;

  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => {
        const props = {
          size: 'xs',
          style: { fieldSizing: 'content' },
          ...field,
        };
        return (
          <FormItem>
            <FormControl>
              {isNumber ? <CurrencyInput {...props} /> : <Input {...props} type={'text'} />}
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

function TableRowSize({
  row,
  table,
  data,
  dataIndex,
}: {
  row: Row<ColumnData>;
  table: TTable<ColumnData>;
  data: ColumnData;
  dataIndex: number;
}) {
  const getFormName = (columnId: string) => `rows.${row.index}.sizeList.${dataIndex}.${columnId}`;
  return (
    <TableRow rowSpace={'xs'}>
      <TableCell level={1}>{data.number}</TableCell>
      <TableCell level={1}>{data.key2}</TableCell>
      <TableCell level={1}>{data.key3}</TableCell>
      <TableCell level={1}>{data.key4}</TableCell>
      <TableCell level={1}>
        {' '}
        <CellEdit
          initialValue={data.key5}
          formName={getFormName('key5')}
          table={table}
          editType={'number'}
        />
      </TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}></TableCell>
    </TableRow>
  );
}

function TableRowProduct({
  row,
  table,
  onClick,
}: {
  row: Row<ColumnData>;
  table: TTable<ColumnData>;
  onClick: () => void;
}) {
  console.log(row.getCanExpand(), row.getIsExpanded());
  const getFormName = (columnId: string) => `rows.${row.index}.${columnId}`;
  return (
    <TableRow rowSpace={'xs'} className={'cursor-pointer'} onClick={onClick}>
      <TableCell level={1}>{row.getValue('number')}</TableCell>
      <TableCell level={1}>
        <TableImgText image={{ src: null }} text={row.getValue('key2')}></TableImgText>
      </TableCell>
      <TableCell level={1}>{row.getValue('key3')}</TableCell>
      <TableCell level={1}>
        <CellEdit
          initialValue={row.getValue('key4')}
          formName={getFormName('key4')}
          table={table}
          editType={'text'}
        />
      </TableCell>
      <TableCell level={1}>{row.getValue('key5')}</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}>[П - 13]</TableCell>
      <TableCell level={1}>[200]</TableCell>
      <TableCell level={1}></TableCell>
    </TableRow>
  );
}
