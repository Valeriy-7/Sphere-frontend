import { Row, Table as TTable } from '@tanstack/react-table';
import { TableRowExpand } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { type ColSizeList } from '@/lib/TableHelpers';
import React from 'react';

import { MarketImg } from '@/app/(main)/wb/delivery/ff/create/market-img';
import { DPBody, DPItem, DPTitle } from '@/app/(main)/wb/delivery/ff/create/delivery-create-row';
import { DPSelect } from '@/app/(main)/wb/delivery/ff/create/DPList';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { FormValues } from './schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';

export function TableRowExpandLevel<TData>({
  row,
  table,
  form,
}: { row: Row<TData>; table: TTable<TData> } & {
  form: UseFormReturn<FormValues>;
}) {
  // @ts-ignore
  return (
    <TableRowExpand isTransparent colSpan={row.getVisibleCells().length}>
      {row.original.subRows?.map((subRow, index) => (
        <div
          key={subRow.uuid}
          className={
            'flex flex-wrap gap-4 rounded-lg border bg-white p-2 text-center text-min dark:bg-transparent [&+&]:mt-5'
          }
        >
          <MarketImg />
          <DPItem>
            <DPTitle>Данные</DPTitle>
            <DPBody className={'h-auto'}>
              <ul className={'space-y-0.5 text-left'}>
                <li className={'text-primary'}>Платье чёрное</li>
                <li>Арт: 187677</li>
                <li>Цвет: Розовый</li>
                <li>Категория: Платья</li>
              </ul>
            </DPBody>
            <DPTitle>Место</DPTitle>
            <Input className={'text-center'} size={'xs'} />
          </DPItem>
          <DPItem>
            <DPTitle>План (ед)</DPTitle>
            <DPBody className={'text-xs font-medium text-primary'}>1 200</DPBody>
            <DPTitle>План (ед)</DPTitle>
            <DPBody className={'text-xs font-medium text-primary'}>1 200</DPBody>
            <DPTitle>Брак (ед)</DPTitle>
            <DPBody className={'text-xs font-medium text-primary'}>1 200</DPBody>
          </DPItem>
          <DPItem>
            <DPTitle>Размер / Объём</DPTitle>
            <DPBody>М / 44</DPBody>
            <DPBody>М / 44</DPBody>
            <DPBody>XL / 42</DPBody>
            <DPBody>XL / 42</DPBody>
            <DPBody>XL / 42</DPBody>
          </DPItem>
          <DPItem>
            <DPTitle className={'bg-green-500'}>Факт</DPTitle>
            {index}
            <FormField
              control={form.control}
              name={`rows.${index}.factList`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      {field.value.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Quantity"
                            value={item}
                            onChange={(e) => {
                              const newValue = [...field.value];
                              newValue[itemIndex] = Number.parseInt(e.target.value);
                              field.onChange(newValue);
                            }}
                            className="w-24"
                          />
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DPItem>
          <DPItem>
            <DPTitle className={'bg-red-500'}>Брак</DPTitle>
            <Input className={'text-center'} size={'xs'} />
            <Input className={'text-center'} size={'xs'} />
            <Input className={'text-center'} size={'xs'} />
            <Input className={'text-center'} size={'xs'} />
            <Input className={'text-center'} size={'xs'} />
          </DPItem>
          <DPSelect
            title={'Услуги'}
            items={[
              { label: 'Стирка', price: 10, id: '1' },
              { label: 'Глаженье', price: 10, id: '2' },
              { label: 'Глаженье', price: 10, id: '3' },
              { label: 'Глаженье', price: 10, id: '4' },
              { label: 'Глаженье', price: 10, id: '5' },
              { label: 'Глаженье', price: 10, id: '6' },
            ]}
          ></DPSelect>
          <DPSelect
            title={'Расходники ФФ'}
            items={[
              { label: 'Стирка', price: 10, id: '1' },
              { label: 'Глаженье', price: 10, id: '2' },
              { label: 'Глаженье', price: 10, id: '3' },
              { label: 'Глаженье', price: 10, id: '4' },
              { label: 'Глаженье', price: 10, id: '5' },
              { label: 'Глаженье', price: 10, id: '6' },
            ]}
          ></DPSelect>
          <DPSelect
            title={'Расходники магазина'}
            items={[
              { label: 'Стирка', price: 10, id: '1' },
              { label: 'Глаженье', price: 10, id: '2' },
              { label: 'Глаженье', price: 10, id: '3' },
              { label: 'Глаженье', price: 10, id: '4' },
              { label: 'Глаженье', price: 10, id: '5' },
              { label: 'Глаженье', price: 10, id: '6' },
            ]}
          ></DPSelect>
        </div>
      ))}
    </TableRowExpand>
  );
}
