'use client';
import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatCurrency } from '@/lib/formatCurrency';

import type { PartnerCabinetDtoType } from '@/kubb-gen';

export const columns: ColumnDef<PartnerCabinetDtoType>[] = [
  {
    accessorKey: 'number1',
    header: '№',
  },
  {
    accessorFn: ({ companyName, legalCompanyName }) => `${companyName} ${legalCompanyName}`,
    id: 'companyName',
    header: 'Магазин',
    cell: ({ row: { original } }) => {
      return (
        <TableCardImgText
          image={{ src: original.avatarUrl }}
          title={original.companyName}
          text={original.legalCompanyName}
        />
      );
    },
  },
  {
    accessorKey: 'income',
    header: 'Доход',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'ffDeliveries',
    header: 'Поставки на ФФ',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'productsCount',
    header: 'Товар',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'defectsCount',
    header: 'Брак',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'consumablesAmount',
    header: 'Расходники',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'pvzReturnsCount',
    header: 'Возвраты с ПВЗ',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'wbDeliveries',
    header: 'Поставки на ВБ',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
  {
    accessorKey: 'productAmount',
    header: 'Продукт ',
    cell: ({ getValue }) => formatCurrency(getValue() as number, 'number'),
  },
];
