'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import { type DeliveryStatusType, FFDeliveryWithRoutesResponseDtoType } from '@/kubb-gen';
import { getTextCurrency } from '@/lib/constants/rub';
import { Badge } from '@/components/ui/badge';
import { DELIVERY_COLOR_MAP, DELIVERY_STATUS_MAP } from '@/lib/utils/delivery';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<FFDeliveryWithRoutesResponseDtoType>[] = [
  // getColumnNumber<FFDeliveryWithRoutesResponseDtoType>(),
  {
    accessorKey: 'number',
    header: '№',
    enableSorting: false,
  },
  {
    accessorKey: 'deliveryDate',
    header: 'Дата поставки',
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return formatDate(value);
    },
    sortingFn: 'datetime',
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'Номер поставки',
    cell: ({ getValue }) => {
      const str = getValue().substring(getValue().length - 5);
      return <span className={'text-red-500'}>{str}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'planQuantity',
    header: 'План',
    enableSorting: false,
  },
  {
    accessorKey: 'factQuantity',
    header: 'Факт',
    enableSorting: false,
  },
  {
    accessorKey: 'defects',
    header: 'Брак',
    enableSorting: false,
  },
  {
    accessorKey: 'productsPrice',
    header: getTextCurrency('Цена товаров'),
    enableSorting: false,
  },
  {
    accessorKey: 'ffServicesPrice',
    header: getTextCurrency('Цена услуг ФФ'),
    enableSorting: false,
  },
  {
    accessorKey: 'logisticsToFFPrice',
    enableSorting: false,
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
    enableSorting: false,
    header: getTextCurrency('Сумма'),
  },
];
