'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Check, Pencil, X } from 'lucide-react';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { RUB } from '@/lib/constants/rub';

import { ServiceType } from '@/kubb-gen';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CurrencyInput } from '@/components/currency-input';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/formatCurrency';

export type ColumnData = {
  id: string;
  number: number;
  key2: string;
  key3: string;
  key4: string;
  key5: string;
  sizeList?: ColumnData[];
};

export const columns: ColumnDef<ColumnData>[] = [
  {
    id: 'number',
    header: '№',
    enableSorting: false,
  },
  {
    accessorKey: 'key2',
    header: 'Наименование',
    enableSorting: false,
  },

  {
    accessorKey: 'key3',
    header: 'Артиукл',
    enableSorting: false,
  },
  {
    accessorKey: 'key4',
    header: 'Место',
    enableSorting: false,
  },
  {
    accessorKey: 'key5',
    header: 'Кол-во',
    enableSorting: false,
  },
  {
    accessorKey: 'edit',
    enableSorting: false,
    meta: {
      className: 'w-[70px] text-right',
    },
    cell: ({ row: { index }, table }) => {
      const { meta } = table.options;
      if (!meta?.isEdit) return;
      return (
        <div className={'text-right'}>
          <button
            onClick={() => meta?.deleteRow(index)}
            className={'rounded-lg p-1 transition-colors'}
          >
            <X strokeWidth={1} />
          </button>
        </div>
      );
    },
    header: ({ table }) => {
      const { meta } = table.options;
      if (!meta?.isEdit) {
        return (
          <button
            onClick={() => meta?.setIsEdit(true)}
            className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
          >
            <Pencil />
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
            <Check />
          </button>
          <button
            onClick={() => {
              meta?.resetData();
            }}
            className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
          >
            <X />
          </button>
        </>
      );
    },
  },
];
