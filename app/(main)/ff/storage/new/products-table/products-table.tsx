'use client';
import React, { useEffect, useState } from 'react';

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  SortingState,
  getSortedRowModel,
  Row,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { FormValues, FormSchema } from './schema';

import {  columns, ColumnData } from './columns';
import { zodResolver } from '@hookform/resolvers/zod';

import { Check, Pencil, X } from 'lucide-react';
import { Table as TTable } from '@tanstack/table-core/build/lib/types';
import { ColSizeList } from '@/lib/TableHelpers';
import { TableImgText } from '@/components/date-table/table-img-text';
import { formatCurrency } from '@/lib/formatCurrency';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { CurrencyInput } from '@/components/currency-input';
import { Textarea } from '@/components/ui/textarea';

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
    defaultValues: { rows: data },
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

  console.log(form.formState);

  const [isEdit, setIsEdit] = useState(false);

  const [listRemoveRow, setIdsRemoveRow] = useState<TData[]>([]);

  const resetData = () => {
    setIsEdit(false);
    setData(initialData);
  };

  const addRow = () => {
    const row = {
      //name: '',
      number: data.length + 1,
      //price: 0,
      //description: '',
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
      <Table colSizeList={colSizeList}>
        <TableHeader>
          <TableRowHeader table={table} />
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.map((row) => {
            return (
              <>
                <TableRowProduct key={row.id} row={row} table={table} />
                {row.original?.sizeList.map((i) => (
                  <TableRowSize key={i.id} data={i} row={row} table={table} />
                ))}
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
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
  columnId,
  row,
}: {
  row: Row<ColumnData>;
  table: TTable<ColumnData>;
  editType: 'number' | 'text';
  columnId: keyof ColumnData;
}) {
  const initialValue = row.getValue(columnId);
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isNumber = editType === 'number';

  if (!table.options.meta?.isEdit) {
    if (isNumber) {
      return formatCurrency(initialValue as number);
    }
    return initialValue;
  }

  const onBlur = () => {
    table.options.meta?.updateData(row.index, columnId, value);
  };

  const form = table.options.meta?.form;

  return (
    <FormField
      control={form.control}
      name={`rows.${row.index}.${columnId}`}
      render={({ field }) => {
        const props = {
          size: 'xs',
          style: { fieldSizing: 'content' },
          value,
          onChange: (val?: number) => {
            console.log(val);
            setValue(val);
            field.onChange(val);
          },
          onBlur: () => {
            onBlur();
            field.onBlur();
          },
        };
        return (
          <FormItem>
            <FormControl>
              {isNumber ? (
                <CurrencyInput {...props} />
              ) : (
                <Textarea className={'block h-auto w-full max-w-none'} {...props} />
              )}
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
}: {
  row: Row<ColumnData>;
  table: TTable<ColumnData>;
  data: ColumnData;
}) {
  return (
    <TableRow rowSpace={'xs'}>
      <TableCell level={1}>{data.number}</TableCell>
      <TableCell level={1}>{data.key2}</TableCell>
      <TableCell level={1}>{data.key3}</TableCell>
      <TableCell level={1}>{data.key4}</TableCell>
      <TableCell level={1}>{data.key5}</TableCell>
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

function TableRowProduct({ row, table }: { row: Row<ColumnData>; table: TTable<ColumnData> }) {
  return (
    <TableRow rowSpace={'xs'}>
      <TableCell level={1}>{row.getValue('number')}</TableCell>
      <TableCell level={1}>
        <TableImgText image={{ src: null }} text={row.getValue('key2')}></TableImgText>
      </TableCell>
      <TableCell level={1}>{row.getValue('key3')}</TableCell>
      <TableCell level={1}>
        <CellEdit table={table} row={row} editType={'text'} columnId={'key4'} />
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
