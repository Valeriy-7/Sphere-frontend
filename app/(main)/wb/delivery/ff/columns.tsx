'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import type { FFDeliveryListItemDtoType } from '@/kubb-gen';
import { getTextCurrency } from '@/lib/constants/rub';

export const columns: ColumnDef<FFDeliveryListItemDtoType>[] = [
  getColumnNumber<FFDeliveryListItemDtoType>(),
  {
    accessorKey: 'deliveryDate',
    header: 'Дата поставки',
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return formatDate(value);
    },
    sortingFn: 'datetime',
  },
  {
    accessorFn: ({ supplierInfo }) => `${supplierInfo.name} ${supplierInfo.address}`,
    id: 'supplierInfo',
    header: 'Оптовик',
    cell: ({
      row: {
        original: { supplierInfo },
      },
    }) => {
      return (
        <div className={'text-left'}>
          <TableCardImgText
            image={{ src: '' }}
            title={supplierInfo.name}
            text={supplierInfo.address}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'cargoPlaces',
    header: 'Грузовые места (ед) ',
  },
  {
    accessorKey: 'planQuantity',
    header: 'План',
  },
  {
    accessorKey: 'factQuantity',
    header: 'Факт',
  },
  {
    accessorKey: 'defects',
    header: 'Брак',
  },
  {
    accessorKey: 'productsPrice',
    header: getTextCurrency('Цена товаров'),
  },
  {
    accessorKey: 'ffServicesPrice',
    header: getTextCurrency('Цена услуг ФФ'),
  },
  {
    accessorKey: 'logisticsToFFPrice',
    header: () => (
      <>
        Цена логистики
        <br />
        {getTextCurrency('до ФФ')}
      </>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    sortingFn: 'text',
  },
];
