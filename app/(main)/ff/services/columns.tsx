'use client';

import { ColumnDef, Cell } from '@tanstack/react-table';
import { Check, Pencil, X } from 'lucide-react';
import React from 'react';
import { Card } from '@/components/ui/card';
import { TableCardImg } from '@/components/date-table/table-card-img';
import { formatCurrency } from '@/lib/formatCurrency';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import { RUB } from '@/lib/constants/rub';
import ImageUpload from '@/components/image-upload-validator';
import type { ServiceType } from '@/kubb-gen';

export const columns: ColumnDef<ServiceType>[] = [
  {
    id: 'image',
  },
  {
    accessorKey: 'imageUrl',
  },
  {
    accessorKey: 'createdAt',
    header: '№',
    cell: ({ row }) => {
      return row.index+1;
    },
    sortingFn: 'datetime',
    meta: {
      className: 'w-[50px]',
      editDisabled: true,
    },
  },
  {
    accessorKey: 'name',
    header: 'Услуги',
    enableSorting: false,
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ getValue, row: { index, original }, column: { id }, table, column }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        return <TableCardImgText image={{ src: original.imageUrl }} title={value} />;
      }
      console.log('original',original);
      return (
        <TableCardImgText
          slotImage={
            <ImageUpload key={index}
              onFile={(file,imageUrl) => {
                console.log('onFile');
                table.options.meta?.updateData(index, 'image', file);
                table.options.meta?.updateData(index, 'imageUrl', imageUrl);
              }}
              src={original.imageUrl}
            />
          }
        >
          <textarea
            style={{
              fieldSizing: 'content',
              minInlineSize: '5ch',
            }}
            className={
              'block w-full min-w-3 break-all rounded-md bg-transparent text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
            }
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        </TableCardImgText>
      );
    },
  },
  {
    accessorKey: 'price',
    enableSorting: false,
    header: `Цена за единицу ${RUB}`,
    meta: {
      className: 'w-[15%]',
    },
    /*  cell: ({ getValue }) => {
      return formatCurrency(getValue())
    },*/
  },
  {
    enableSorting: false,
    accessorKey: 'description',
    header: 'Описание',
  },
  {
    enableSorting: false,
    accessorKey: 'edit',
    meta: {
      className: 'w-[70px] text-right',
    },
    cell: ({ row: { index }, table }) => {
      const { meta } = table.options;
      if (!meta?.isEdit) return;
      return (
        <div className={'text-right'}>
          <button
            onClick={() => meta?.deleteRow(index)}
            className={'rounded-lg p-1 transition-colors'}
          >
            <X strokeWidth={1} />
          </button>
        </div>
      );
    },
    header: ({ table }) => {
      const { meta } = table.options;
      if (!meta?.isEdit) {
        return (
          <button
            onClick={() => meta?.setIsEdit(true)}
            className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
          >
            <Pencil />
          </button>
        );
      }
      return (
        <>
          <button
            onClick={() => {
              meta?.setIsEdit(false);
              meta?.onSubmit();
            }}
            className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
          >
            <Check />
          </button>
          <button
            onClick={() => {
              meta?.resetData();
              meta?.setIsEdit(false);
            }}
            className={'rounded-lg p-1 transition-colors hover:bg-white/20'}
          >
            <X />
          </button>
        </>
      );
    },
  },
];
