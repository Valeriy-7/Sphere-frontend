'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { X } from 'lucide-react';

import { DataTableTotal } from '@/components/date-table/data-table-total';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MarketImg } from '@/app/(main)/wb/delivery/ff/create/market-img';
import * as React from 'react';
import { DPBody, DPItem, DPTitle } from '@/app/(main)/wb/delivery/ff/create/delivery-create-row';
import { CheckboxItem, FormSchema, FormValues } from './schema';
import { DPSelect } from '@/app/(main)/wb/delivery/ff/create/DPList';
import { DatePicker } from '@/components/date-picker';
import { CurrencyInput } from '@/components/currency-input';
import { formatCurrency } from '@/lib/formatCurrency';

import { useJWTAuthContext, useJWTAuthUser } from '@/modules/auth';
import {
  useDeliveriesCreateDelivery,
  useDeliveriesGetDeliveries,
  useDeliveriesGetDeliveriesSuspense,
  useDeliveriesGetFulfillmentConsumables,
  useDeliveriesGetFulfillmentConsumablesSuspense,
  useDeliveriesGetFulfillmentServices,
  useDeliveriesGetSuppliers,
  useWbGetProducts,
  useWbGetProductsSuspense,
} from '@/kubb-gen';
import { useFormDraftV } from '@/app/(main)/wb/delivery/ff/create/use-form-draft';

import { toast } from 'sonner';

const getAmountReduce = (list: number[]) => list.reduce((p, c) => p + c, 0);

export default function NestedDynamicForm() {
  const { cabinetId } = useJWTAuthUser();

  const { data: { items } = { items: [] } } = useWbGetProductsSuspense({ cabinetId });
  const { data: servicesData = [] } = useDeliveriesGetFulfillmentServices();
  const { data: consumablesData = [] } = useDeliveriesGetFulfillmentConsumables();
  const { data: suppliersData = [] } = useDeliveriesGetSuppliers();

  const { mutate } = useDeliveriesCreateDelivery();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cabinetId,
      products: [],
    },
  });
  const { clearDraft } = useFormDraftV(form, 'form-draft');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });
  /*  const { lastSaved, hasDraft, saveDraft, clearDraft } = useFormDraft<FormValues>(form, 'form-draft')*/

  function onSubmit(data: FormValues) {
    console.log(data);
    mutate(
      { data },
      {
        onSuccess: () => {
          clearDraft();
          // toast.success('Успешно');
        },
      },
    );
  }

  console.log(form.formState.errors);
  console.log(form.getValues());

  const totalColumnValue = [
    getAmountReduce(form.getValues().products.map((i) => i.quantity ?? 0)),
    getAmountReduce(form.getValues().products.map((i) => i.price ?? 0)),
    0,
    getAmountReduce(
      form
        .getValues()
        .products.map((row) => getAmountReduce(row.selectedServices.map((i) => i.price))),
    ),
  ];

  const tableTotal = [
    {
      title: 'Количество (ед)',
      value: formatCurrency(totalColumnValue[0]),
    },
    {
      title: 'Цена товаров (₽)',
      value: formatCurrency(totalColumnValue[1]),
    },
    {
      title: 'Логистика до ФФ (₽)',
      value: formatCurrency(totalColumnValue[2]),
    },
    {
      title: 'Цена за услуги ФФ (₽)',
      value: formatCurrency(totalColumnValue[3]),
    },
    {
      title: 'Сумма (₽)',
      value: formatCurrency(totalColumnValue[1] + totalColumnValue[2] + totalColumnValue[3]),
    },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-3'}>
          <div className={'grid-cols-0 grid gap-4 sm:grid-cols-6 xl:grid-cols-12'}>
            <div className={'col-span-2'}>
              <DataTableTotal
                data={[
                  {
                    title: 'Дата поставки',
                    value: <DatePicker<FormValues> form={form} name={'deliveryDate'} />,
                  },
                ]}
              />
            </div>
            <div className={'col-span-2'}>
              <DataTableTotal
                data={[
                  {
                    title: 'Грузовые места',
                    value: (
                      <FormField
                        control={form.control}
                        name="cargoPlaces"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <CurrencyInput size={'xs'} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ),
                  },
                ]}
              />
            </div>
            <div className={'col-span-8'}>
              <DataTableTotal data={tableTotal} />
            </div>
          </div>
          <div>
            <ScrollArea className={'rounded-lg border bg-white p-2 dark:bg-transparent'}>
              <div className={'flex items-center gap-4'}>
                {items.map(({ id }, index) => (
                  <button
                    key={id}
                    className={'flex-none cursor-pointer'}
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        wbProductId: id,
                        quantity: 0,
                        price: 0,
                        selectedServices: [],
                        selectedConsumables: [],
                      });
                    }}
                  >
                    <MarketImg src={items[index].imageUrl} alt={items[index].name} />
                  </button>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {form.formState.errors.products?.message}
          </div>

          {fields.map((field, index) => {
            const product = items?.[index] || {};

            return (
              <div
                className={
                  'relative flex flex-wrap gap-4 rounded-lg border bg-white p-2 pr-[40px] text-center text-min dark:bg-transparent'
                }
                key={field.id}
              >
                <MarketImg src={product.imageUrl} alt={product.name} />
                <DPItem>
                  <DPTitle>Данные</DPTitle>
                  <DPBody className={'h-full'}>
                    <ul className={'space-y-0.5 text-left'}>
                      <li className={'text-primary'}>{product.name}</li>
                      <li>Арт: {product.article}</li>
                      <li>Цвет: {product.color}</li>
                      <li>Категория: {product.category}</li>
                      <li>Размеры:</li>
                      <li>{product.sizes?.map((i) => i + ' /')}</li>
                    </ul>
                  </DPBody>
                </DPItem>
                <DPItem>
                  <DPTitle>Заказать (ед)</DPTitle>
                  <FormField
                    control={form.control}
                    name={`products.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CurrencyInput {...field} size={'xs'} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DPTitle>Цена (₽)</DPTitle>
                  <FormField
                    control={form.control}
                    name={`products.${index}.price`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <CurrencyInput {...field} size={'xs'} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </DPItem>

                <DPSelect
                  isSelect
                  title={'Услуги'}
                  items={servicesData}
                  tForm={{ form, index, name: `selectedServices` }}
                />

                <DPSelect
                  isSelect
                  title={'Расходники ФФ'}
                  items={consumablesData}
                  tForm={{ form, index, name: `selectedConsumables` }}
                />

                {/*   <DPSelect
                isSelect
                title={'Расходники Магазина'}
                items={[]}
                tForm={{ form, index, name: `selectedServices` }}
              />*/}

                <DPSelect
                  isSupplier
                  isSelect
                  title={'Поставщик'}
                  items={suppliersData}
                  tForm={{ form, index, name: `supplierId` }}
                />
                <Button
                  className={'absolute right-0 top-0'}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X />
                </Button>
              </div>
            );
          })}

          <div className={'text-right'}>
            <Button type="submit">Создать поставку</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
