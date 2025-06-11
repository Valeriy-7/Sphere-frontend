'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import { SimpleDatePicker } from '@/components/simple-date-picker';
import { Input } from '@/components/ui/input';

export const columns: ColumnDef<DataRow>[] = [
  { ...getColumnNumber<DataRow>(), enableSorting: false },
  {
    accessorKey: 'date1',
    header: 'Дата поставки',
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return formatDate(value);
    },
    enableSorting: false,
  },

  {
    enableSorting: false,
    accessorFn: ({ streetAddress, city }) => `${city} ${streetAddress}`,
    id: 'streetAddress',
    header: 'Магазин',
  },
  {
    accessorKey: 'number1to3',
    header: 'Кол-во товаров (ед)',
    enableSorting: false,
  },
  {
    id: 'warehouseLocation',
    header: 'Место на складе',
    enableSorting: false,
    cell: ({ row, table }) => {
      return (
        <Input
          defaultValue={row.original.warehouseLocation || ''}
          onBlur={(e) => {
            const value = e.target.value;
            if (value !== row.original.warehouseLocation) {
              // Update the warehouse location
              table.options.meta?.updateProductPlace?.(row.original.uuid, value);
            }
          }}
          placeholder="Место"
          className="w-full"
        />
      );
    },
  },
  {
    id: 'deadline',
    header: 'Дедлайн',
    enableSorting: false,
    cell: ({ row }) => {
      console.log(`Row ${row.original.uuid} deliveryDate:`, row.original.deliveryDate);
      
      // Just display the date statically for now
      const deliveryDate = row.original.deliveryDate;
      if (deliveryDate) {
        const parsed = new Date(deliveryDate);
        const formatted = parsed.toLocaleDateString('ru-RU');
        return <span>{formatted}</span>;
      }
      
      return <span>Нет даты</span>;
      
      // Commented out calendar for debugging
      // return (
      //   <SimpleDatePicker
      //     value={row.original.deliveryDate}
      //     onChange={(date) => {
      //       console.log(`Deadline changed for row ${row.original.uuid}:`, date);
      //       // Handle date change here if needed
      //     }}
      //   />
      // );
    },
  },
  {
    accessorKey: 'city',
    header: 'Исполнители',
    enableSorting: false,
  },
  {
    accessorKey: 'Null',
    header: 'Маркировка',
    enableSorting: false,
  },
  {
    enableSorting: false,
    accessorKey: 'status',
    header: 'Статус',
  },
];
