'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StorageItem = {
  id: string;
  key1: number;
  key2: number;
  key3: number;
  key4: number;
};

export const storageData: StorageItem[] = [
  { id: '0', key1: 1000, key2: 2000, key3: 200, key4: 300 },
];
const cell = ({ getValue }) => {
  const amount = parseFloat(getValue());
  return new Intl.NumberFormat('ru', { maximumFractionDigits: 2 }).format(amount);
};

export const columns: ColumnDef<StorageItem>[] = [
  {
    accessorKey: 'key1',
    header: 'Продукты',
    cell,
  },
  {
    accessorKey: 'key2',
    header: 'Товары',
    cell,
  },
  {
    accessorKey: 'key3',
    header: 'Брак',
    cell,
  },
  {
    accessorKey: 'key4',
    header: 'Расходники',
    cell,
  },
];
