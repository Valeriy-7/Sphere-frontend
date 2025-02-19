'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { TableImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';

export const columns: ColumnDef<DataRow>[] = [
  getColumnNumber<DataRow>(),
  {
    accessorFn: ({ title, art }) => `${title} ${art}`,
    id: 'title',
    header: 'Карточки',
    meta: {
      filterVariant: 'text',
    },
    cell: ({ row: { original } }) => {
      return (
        <TableImgText
          image={{ src: original.image }}
          title={original.title}
          text={`Aрт: ${original.art}`}
        />
      );
    },
  },
  {
    id: 'empty1',
  },
  {
    accessorKey: 'number4',
    header: 'Продукт (ед)',
  },
  {
    id: 'empty2',
  },
  {
    accessorKey: 'number5',
    header: 'Товар (ед)',
  },
  {
    id: 'empty3',
  },
  {
    accessorKey: 'number6',
    header: 'Брак (ед)',
  },
  {
    id: 'empty4',
  },
  {
    accessorKey: 'number7',
    header: 'Расходники (ед)',
  },
  {
    id: 'empty5',
  },
  {
    accessorKey: 'number8',
    header: 'Возвраты с ПВЗ (ед)',
  },
  {
    id: 'empty6',
    header: '',
  },
];
