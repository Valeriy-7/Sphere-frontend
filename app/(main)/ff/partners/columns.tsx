'use client';
import { RussianRuble } from 'lucide-react';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';

export const columns: ColumnDef<DataRow>[] = [
  getColumnNumber<DataRow>(),
  {
    accessorKey: 'date1',
    header: 'Дата поставки',
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return formatDate(value);
    },
    sortingFn: 'datetime',
  },
  {
    accessorFn: ({ streetAddress, city }) => `${city} ${streetAddress}`,
    id: 'city',
    header: 'Оптовик',
    cell: ({ row: { original } }) => {
      return (
        <div className={'text-left'}>
          <TableCardImgText
            image={{ src: original.image }}
            title={original.city}
            text={original.streetAddress}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'number4',
    header: 'Грузовые места (ед) ',
  },
  {
    accessorKey: 'number5',
    header: 'План',
  },
  {
    accessorKey: 'number6',
    header: 'Факт',
  },
  {
    accessorKey: 'number7',
    header: 'Брак',
  },
  {
    accessorKey: 'number8',
    header: 'Цена товаров (₽)',
  },
  {
    accessorKey: 'number9',
    header: 'Цена услуг ФФ (₽)',
  },
  {
    accessorKey: 'number2',
    header: () => (
      <>
        Цена логистики
        <br />
        до ФФ (₽)
      </>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    sortingFn: 'text',
  },
];
