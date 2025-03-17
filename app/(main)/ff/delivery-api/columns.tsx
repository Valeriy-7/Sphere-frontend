'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import type { FFDeliveryListItemDtoType } from '@/kubb-gen';

export const columns: ColumnDef<FFDeliveryListItemDtoType>[] = [
  getColumnNumber<FFDeliveryListItemDtoType>(),
  {
    accessorKey: 'deliveryDate',
    header: 'Дата поставки',
    getGroupingValue: (row) => `${formatDate(row.deliveryDate)} ${row.marketplaceName}`,
    sortingFn: 'datetime',
  },

  {
    accessorKey: 'groupPlace',
    enableSorting: false,
    header: 'Поставщик',
  },
  {
    enableSorting: false,
    accessorKey: 'cabinetInfo',
    header: 'Магазин',
  },
  {
    accessorKey: 'planQuantity',
    header: 'Кол-во товаров (ед)',
    aggregationFn: null,
  },
  {
    accessorKey: 'cargoPlaces_volume',
    header: 'Гр. мест (ед) Объём (м3)',
    accessorFn: ({ cargoPlaces, volume }) => [cargoPlaces, ' / ', volume],
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
