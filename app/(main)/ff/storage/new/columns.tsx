'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import {TableCardImgText, TableImgText} from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';

export const columns: ColumnDef<DataRow>[] = [
  getColumnNumber<DataRow>(),
  {
    accessorFn: ({ title, art }) => `${title} ${art}`,
    id: 'title',
    header: 'Магазины',
    meta: {
      filterVariant: 'text',
    },
    cell: ({ row: { original } }) => {
      return (
          <TableCardImgText image={{ src: original.image }} title={original.title} text={`Aрт: ${original.art}`} />
      );
    },
  },
  {
    id: 'empty1',
  },
  {
    accessorKey: 'number4',
    header: 'Продукт (ед)',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    id: 'empty2',
  },
  {
    accessorKey: 'number5',
    header: 'Товар (ед)',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    id: 'empty3',
  },
  {
    accessorKey: 'number6',
    header: 'Брак (ед)',
    meta: {
      filterVariant: 'range',
    },
  },

  {
    id: 'empty4',
  },
  {
    accessorKey: 'number7',
    header: 'Расходники (ед)',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    id: 'empty5',
  },
  {
    accessorKey: 'number8',
    header: 'Возвраты с ПВЗ (ед)',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    id: 'empty6',
    header: '',
  },
];
