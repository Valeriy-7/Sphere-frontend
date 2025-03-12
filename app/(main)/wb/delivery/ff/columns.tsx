'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import { type DeliveryStatusType, FFDeliveryListItemDtoType } from '@/kubb-gen';
import { getTextCurrency } from '@/lib/constants/rub';
import { Badge } from '@/components/ui/badge';
import { DELIVERY_COLOR_MAP, DELIVERY_STATUS_MAP } from '@/lib/utils/delivery';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<FFDeliveryListItemDtoType>[] = [
  // getColumnNumber<FFDeliveryListItemDtoType>(),
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
    accessorKey: 'marketplaceName',
    header: 'Поставщик',
    cell: ({
      getValue,
      row: {
        original: { suppliersInfo, supplierName },
      },
    }) => {
      const title = suppliersInfo.length !== 1 ? '' : supplierName;
      return <TableCardImgText image={{ src: undefined }} title={title} text={getValue()} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'cargoPlaces',
    header: 'Грузовые места (ед) ',
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
    header: 'Статус',
    sortingFn: 'text',
    cell: ({ getValue }) => {
      const value = getValue() as DeliveryStatusType;
      const color = value !== 'COMPLETED' ? 'bg-yellow-500' : 'bg-green-500';
      return (
        <Badge variant={'outline'} className={cn('dark:text-black', color)}>
          {DELIVERY_STATUS_MAP[value]}
        </Badge>
      );
    },
  },
];
