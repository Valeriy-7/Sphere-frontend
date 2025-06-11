'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
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
    accessorKey: 'deliveryDate',
    header: 'Дедлайн',
    enableSorting: false,
    cell: ({ row }) => {
      const deliveryDate = row.original.deliveryDate;
      if (!deliveryDate) {
        return <span>Нет даты</span>;
      }

      // Parse the delivery date
      const deadline = new Date(deliveryDate);
      const today = new Date();
      
      // Set time to start of day for accurate comparison
      deadline.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      // Check if deadline is overdue by 1 day or more
      const isOverdue = today > deadline;
      
      // Format the date for display
      const formattedDate = deadline.toLocaleDateString('ru-RU');
      
      return (
        <span 
          className={isOverdue ? 'bg-red-100 text-red-700 px-2 py-1 rounded font-medium' : ''}
        >
          {formattedDate}
        </span>
      );
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
