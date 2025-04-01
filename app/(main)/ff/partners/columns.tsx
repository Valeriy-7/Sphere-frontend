'use client';
import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';

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
  },
  {
    accessorKey: 'ffDeliveries',
    header: 'Поставки на ФФ',
  },
  {
    accessorKey: 'productsCount',
    header: 'Товар',
  },
  {
    accessorKey: 'defectsCount',
    header: 'Брак',
  },
  {
    accessorKey: 'consumablesAmount',
    header: 'Расходники',
  },
  {
    accessorKey: 'pvzReturnsCount',
    header: 'Возвраты с ПВЗ',
  },
  {
    accessorKey: 'wbDeliveries',
    header: 'Поставки на ВБ',
  },
  {
    accessorKey: 'productAmount',
    header: 'Продукт ',
  },
];
