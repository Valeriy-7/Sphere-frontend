'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate, formatDateOrm } from '@/lib/utils/formatDate';
import { type DeliveryStatusType, FFDeliveryWithRoutesResponseDtoType } from '@/kubb-gen';
import { getTextCurrency } from '@/lib/constants/rub';
import { Badge } from '@/components/ui/badge';
import { DELIVERY_COLOR_MAP, DELIVERY_STATUS_MAP } from '@/lib/utils/delivery';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatCurrency';
import { DATE_FORMAT_SERVER_ORM } from '@/lib/constants/date';

export const columns: ColumnDef<FFDeliveryWithRoutesResponseDtoType>[] = [
  // getColumnNumber<FFDeliveryWithRoutesResponseDtoType>(),
  {accessorKey:'deliveryId',
  },
  {
    accessorKey: 'number',
    header: '№',
    enableSorting: false,
    enableColumnFilter: false,
  },

  {
    accessorKey: 'deliveryDate',
    header: 'Дата поставки',
    getGroupingValue: (row) => `${formatDate(row.deliveryDate)} ${row.name}`,
    cell: ({ getValue }) => {
      const value = getValue<Date>();

      return formatDate(value as string);
    },
    sortingFn: 'datetime',
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: 'cabinetInfo',
    header: 'Магазин',
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'number1to5_number1to10',
    header: 'Гр. мест (ед) Объём (м3)',
    accessorFn: ({ number1to5, number1to10 }) => [number1to5, ' / ', number1to10],
  },
  {
    accessorKey: 'number1to3',
    header: 'Кол-во товаров (ед)',
    aggregationFn: null,
  },
  {
    enableSorting: false,
    accessorKey: '3',
    header: '',
  },
  {
    accessorKey: 'responsiblePerson',
    header: 'Ответственный',
    enableSorting: false,
  },
  {
    accessorKey: 'logisticsProvider',
    header: 'Тип логистики',
    enableSorting: false,
  },
  {
    enableSorting: false,
    accessorKey: 'status',
    header: 'Статус',
  },
];
