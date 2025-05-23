'use client';

import { ColumnDef, Cell } from '@tanstack/react-table';
import { Check, Pencil, X } from 'lucide-react';

import { TableCardImgText } from '@/components/date-table/table-img-text';
import { RUB } from '@/lib/constants/rub';
import ImageUpload from '@/components/image-upload-validator';
import {
  ConsumableType,
  LogisticsType,
  ServiceType,
  useDeliveryPointsGetAllDeliveryPoints,
  useDeliveryPointsGetAllDeliveryPointsSuspense,
  userTypeEnum,
} from '@/kubb-gen';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CurrencyInput } from '@/components/currency-input';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/formatCurrency';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TextareaAutosize from 'react-textarea-autosize';

export type ServicesItemType = ServiceType | ConsumableType | LogisticsType;

export const columnsService: ColumnDef<ServicesItemType | ConsumableType>[] = [
  {
    id: 'image',
  },
  {
    accessorKey: 'imageUrl',
    cell: ({ getValue, row }) => {
      return getValue();
    },
  },
  {
    accessorKey: 'number',
    enableSorting: true,
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
      const [value, setValue] = useState(initialValue);
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      const onBlur = () => {
        table?.options?.meta?.updateData(index, id, value);
      };

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        return <TableCardImgText image={{ src: imageUrl }} title={value} />;
      }
      if (imageUrl) {
        form?.setValue(`rows.${index}.image`, new File([''], 'filename')); // Если услуга уже есть и катринка подгрузилась с сервера, то обманываем валидатор
      }

      return (
        <>
          <TableCardImgText
            slotImage={
              <ImageUpload
                isFormError={Boolean(form?.formState.errors?.rows?.[index]?.image)}
                onFile={(file, imageUrl) => {
                  console.log('onFile');
                  table.options.meta?.updateData(index, 'image', file);
                  table.options.meta?.updateData(index, 'imageUrl', imageUrl);
                  form?.setValue(`rows.${index}.image`, file);
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
                  <FormControl className={'w-full'}>
                    <Textarea
                      {...field}
                      size={'xs'}
                      //className={'min-h-0 pt-0 pb-0 block w-full rounded-md bg-transparent text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'}
                      className={'block h-auto w-full min-w-3 max-w-none'}
                      value={value}
                      onChange={(val) => {
                        console.log(val);
                        setValue(val);
                        field.onChange(val);
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
        </>
      );
    },
  },
  {
    accessorKey: 'price',
    enableSorting: false,
    header: `Цена за единицу ${RUB}`,

    meta: {
      className: 'w-[15%]',
      editType: 'number',
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
            onClick={() => meta?.setIsEditActive()}
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

export const columnsConsumable = [
  columnsService[0],
  columnsService[1],

  columnsService[2],

  { ...columnsService[3], header: 'Расходники' },

  columnsService[4],
  {
    accessorKey: 'quantity',
    enableSorting: false,
    header: `Количество`,
    meta: {
      className: 'w-[15%]',
      editType: 'number',
    },
  },
  columnsService[5],
  columnsService[6],
];

export const columnsLogistics: ColumnDef<LogisticsType>[] = [
  {
    accessorKey: 'number',
    enableSorting: true,
    header: '№',
    meta: {
      className: 'w-[50px]',
      editDisabled: true,
    },
  },
  {
    accessorKey: 'fromPointId',
    header: 'Откуда',
    enableSorting: false,
    cell: ({ getValue, row: { index, original }, column: { id }, table, column }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      const { data, isPending } = useDeliveryPointsGetAllDeliveryPoints();
      if (isPending) return <>...</>;

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        return data?.find((i) => i.id === original.fromPointId)?.name;
      }

      const form = table.options.meta?.form;
      const { toPointId } = original;
      return (
        <FormField
          control={form?.control}
          name={`rows.${index}.${id}`}
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={isPending}
                onValueChange={(val) => {
                  setValue(val);
                  field.onChange(val);
                  const { type } = data?.find((i) => i.id === val) || {};
                  form?.setValue(`rows.${index}.fromPointType`, type);
                  table.options?.meta?.updateData(index, id, val);
                  table.options?.meta?.updateData(index, 'fromPointType', type);
                }}
                defaultValue={value as string}
              >
                <FormControl>
                  <SelectTrigger size={'xs'}>
                    <SelectValue placeholder="Откуда" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data
                    ?.filter((i) => i.id !== toPointId)
                    .map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      );
    },
  },
  {
    accessorKey: 'toPointId',
    enableSorting: false,
    header: `Куда`,
    cell: ({ getValue, row: { index, original }, column: { id }, table, column }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      const { data, isPending } = useDeliveryPointsGetAllDeliveryPoints();
      if (isPending) return <>...</>;

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        return data?.find((i) => i.id === original.toPointId)?.name;
      }

      const form = table.options.meta?.form;
      const { fromPointId } = form?.getValues('rows')?.[index];

      return (
        <FormField
          control={form?.control}
          name={`rows.${index}.${id}`}
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={isPending}
                onValueChange={(val) => {
                  setValue(val);
                  field.onChange(val);
                  const { type } = data?.find((i) => i.id === val) || {};
                  form?.setValue(`rows.${index}.toPointType`, type);

                  table.options?.meta?.updateData(index, id, val);
                  table.options?.meta?.updateData(index, 'toPointType', type);
                }}
                defaultValue={value as string}
              >
                <FormControl>
                  <SelectTrigger size={'xs'}>
                    <SelectValue placeholder="Куда" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data
                    ?.filter((i) => i.id !== fromPointId)
                    .map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      );
    },
  },
  {
    accessorKey: 'priceUpTo1m3',
    enableSorting: false,
    header: `Цена за V до 1 м3 ${RUB}`,
    meta: {
      editType: 'number',
    },
  },
  {
    accessorKey: 'pricePer1m3',
    enableSorting: false,
    header: `Цена за 1 м3 ${RUB}`,
    meta: {
      editType: 'number',
    },
  },
  {
    enableSorting: false,
    accessorKey: 'description',
    header: 'Описание',
    meta: {
      className: 'w-[35%]',
    },
  },
  columnsService[6],
];

export const defaultColumn: Partial<ColumnDef<ServicesItemType>> = {
  cell: ({ getValue, row: { index }, column: { id }, table, column }) => {
    const { editType } = column.columnDef.meta || { editType: 'text' };

    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const isNumber = editType === 'number';

    if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
      if (isNumber) {
        return formatCurrency(initialValue as number);
      }
      return initialValue;
    }

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    const form = table.options.meta?.form;

    return (
      <FormField
        control={form.control}
        name={`rows.${index}.${id}`}
        render={({ field }) => {
          const props = {
            size: 'xs',
            value,
            onChange: (val) => {
              console.log(val);
              setValue(val);
              field.onChange(val);
            },
            onBlur: () => {
              onBlur();
              field.onBlur();
            },
          };
          return (
            <FormItem className={'w-full'}>
              <FormControl>
                {isNumber ? (
                  <CurrencyInput {...props} />
                ) : (
                  <Textarea className={'block h-auto w-full max-w-none'} {...props} />
                )}
              </FormControl>
            </FormItem>
          );
        }}
      />
    );
  },
};
