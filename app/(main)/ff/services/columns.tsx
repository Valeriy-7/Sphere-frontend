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
import {FormControl, FormField, FormItem} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";

export const columns: ColumnDef<ServiceType>[] = [
  {
    id: 'image',
  },
  {
    accessorKey: 'imageUrl',
    cell: ({ getValue, row }) => {
      return getValue();
    },
  },
  /*    {
        accessorKey: 'createdAt',
        cell: ({ getValue }) => {
            const date = getValue()
            return new Date(date).getTime()
        },
    },*/
  {
    accessorKey: 'number',
    header: '№',
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
    cell: ({ getValue, row, column: { id }, table, column }) => {
      const imageUrl = row.getValue('imageUrl');
      const form = table.options.meta?.form;
      const { index } = row;

      const initialValue = getValue();

      const [value, setValue] = React.useState(initialValue);

      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        return <TableCardImgText image={{ src: imageUrl }} title={value} />;
      }
      console.log(form.formState.errors?.rows?.[index]?.image);
      return (<>

        <TableCardImgText
          slotImage={
            <ImageUpload
                isFormError={Boolean(form?.formState.errors?.rows?.[index]?.image)}
              onFile={(file, imageUrl) => {
                console.log('onFile');
                table.options.meta?.updateData(index, 'image', file);
                table.options.meta?.updateData(index, 'imageUrl', imageUrl);
                form?.setValue(`rows.${index}.imageUrl`,imageUrl)
              }}
              src={imageUrl}
            />
          }
        >

          <FormField
              control={form.control}
              name={`rows.${index}.${id}`}
              render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                          {...field}
                          style={{ fieldSizing: 'content', minInlineSize: '5ch', }}
                          size={'xs'}
                          //className={'min-h-0 pt-0 pb-0 block w-full rounded-md bg-transparent text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'}
                          className={'min-w-3 w-full max-w-none block h-auto'}
                          value={value}
                          onChange={(event) => {
                            console.log(event.target.value);
                            setValue(event.target.value);

                            field.onChange(event.target.value);
                          }}
                          onBlur={() => {
                            onBlur();
                            field.onBlur();
                          }}
                      />
                    </FormControl>
                  </FormItem>
              )}
          />
        </TableCardImgText>
      </>);
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
