'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';

export const columns: ColumnDef<DataRow>[] = [
  { ...getColumnNumber<DataRow>(), enableSorting: false },
  {
    accessorKey: 'date1',
    header: 'Дата поставки',
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return formatDate(value);
    },
    enableSorting: false,
  },

  {
    enableSorting: false,
    accessorFn: ({ streetAddress, city }) => `${city} ${streetAddress}`,
    id: 'streetAddress',
    header: 'Магазин',
  },
  {
    accessorKey: 'number1to3',
    header: 'Кол-во товаров (ед)',
    enableSorting: false,
  },

  {
    accessorKey: 'status',
    header: 'Дедлайн',
    enableSorting: false,
  },
  {
    accessorKey: 'city',
    header: 'Исполнители',
    enableSorting: false,
  },
  {
    accessorKey: 'Null',
    header: 'Маркировка',
    enableSorting: false,
  },
  {
    enableSorting: false,
    accessorKey: 'status',
    header: 'Статус',
  },
];
