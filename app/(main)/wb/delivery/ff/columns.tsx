'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import { FFDeliveryListItemDtoType} from '@/kubb-gen';
import { getTextCurrency } from '@/lib/constants/rub';
import {Badge} from "@/components/ui/badge";
import {DELIVERY_COLOR_MAP, DELIVERY_STATUS_MAP} from "@/lib/utils/delivery";

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
    accessorKey: 'marketplaceName',
    header: 'Оптовик',
    cell: ({getValue}) => {
      return (
          <TableCardImgText
              image={{ src: undefined }}
              title={getValue()}
          />
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
    cell:({ getValue })=>{
      const value = getValue()

      return <Badge variant={'outline'} className={`${DELIVERY_COLOR_MAP[value]} dark:text-black`}>{DELIVERY_STATUS_MAP[value]}</Badge>
    }
  },
];
