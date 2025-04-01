'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { X } from 'lucide-react';

import { DataTableTotal } from '@/components/date-table/data-table-total';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MarketImg } from '@/app/(main)/wb/delivery/ff/create/market-img';
import * as React from 'react';
import { DPBody, DPItem, DPTitle } from '@/app/(main)/wb/delivery/ff/create/delivery-create-row';
import { FormSchema, FormValues } from './schema';
import { DPSelect } from '@/app/(main)/wb/delivery/ff/create/DPList';
import { DatePicker } from '@/components/date-picker';
import { CurrencyInput } from '@/components/currency-input';
import { formatCurrency } from '@/lib/formatCurrency';

import { useJWTAuthUser } from '@/modules/auth';
import {
  FFDeliveriesGetFFDeliveriesSuspenseQueryKey,
  logisticsPriceGetLogisticsPrice,
  useDeliveriesCreateDelivery,
  useDeliveriesGetFulfillmentConsumables,
  useDeliveriesGetFulfillmentServices,
  useDeliveriesGetSuppliers,
  useWbGetProductsSuspense,
} from '@/kubb-gen';
import { useFormDraftV } from '@/app/(main)/wb/delivery/ff/create/use-form-draft';

import { useEffect, useState } from 'react';

import { getTextCurrency } from '@/lib/constants/rub';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { STORAGE_KEY_FORM_DRAFT_DELIVERY_CREATE } from '@/lib/constants';

const getAmountReduce = (list: number[]) => list.reduce((p, c) => p + c, 0);

export default function NestedDynamicForm() {
  const { cabinetId } = useJWTAuthUser();

  const {
    data: { items },
  } = useWbGetProductsSuspense({ cabinetId });
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

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'products',
  });
  const { clearDraft } = useFormDraftV(form, STORAGE_KEY_FORM_DRAFT_DELIVERY_CREATE);
  const queryClient = useQueryClient();

  const watchSuppliers = fields.map((field, index) => ({
    supplierId: form.watch(`products.${index}.supplierId`),
    quantity: form.watch(`products.${index}.quantity`),
    wbProductId: form.watch(`products.${index}.wbProductId`),
    volume: (items[index].width * items[index].height * items[index].length) / 1000000,
  }));
  const watchTotals = fields.map((field, index) => ({
    quantity: form.watch(`products.${index}.quantity`),
    price: form.watch(`products.${index}.price`),
    selectedServices: form.watch(`products.${index}.selectedServices`),
    selectedConsumables: form.watch(`products.${index}.selectedConsumables`),
  }));

  /*  const { lastSaved, hasDraft, saveDraft, clearDraft } = useFormDraft<FormValues>(form, 'form-draft')*/

  console.log(form.formState.errors);

  function onSubmit(data: FormValues) {
    mutate(
      { data },
      {
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
        onSuccess: () => {
          clearDraft();
          form.reset({
            cabinetId,
          });
          replace([]);
          queryClient.invalidateQueries({
            queryKey: FFDeliveriesGetFFDeliveriesSuspenseQueryKey(),
          });
          // toast.success('Успешно');
        },
      },
    );
  }

  type LogisticsPrice = {
    supplierId: string;
    priceUpTo1m3: number;
    pricePer1m3: number;
    quantity: number;
    wbProductId: string;
    volume: number;
  };
  const [logisticsPrice, setLogisticsPrice] = useState<LogisticsPrice[]>([]);

  useEffect(() => {
    watchSuppliers.forEach(async ({ supplierId, quantity, wbProductId, volume }, index) => {
      const isFind = logisticsPrice.find((i) => i.supplierId === supplierId);

      if (!isFind && supplierId) {
        const priceObj = await logisticsPriceGetLogisticsPrice({
          supplierId,
          toPointType: 'FULFILLMENT',
        })
          .then(({ priceUpTo1m3, pricePer1m3 }) => ({ priceUpTo1m3, pricePer1m3 }))
          .catch(() => ({ priceUpTo1m3: 0, pricePer1m3: 0 }));

        setLogisticsPrice((old) => {
          return [...old, { ...priceObj, supplierId, quantity, wbProductId, volume }];
        });
      }
    });
  }, [watchSuppliers]);

  const totalColumnValue = [
    getAmountReduce(watchTotals.map((i) => i.quantity ?? 0)),
    getAmountReduce(watchTotals.map((i) => i.price ?? 0)),
    getAmountReduce(
      watchSuppliers.map((i, index) => {
        const { priceUpTo1m3, pricePer1m3 } = logisticsPrice.find(
          (item) => item.supplierId === i.supplierId,
        ) ?? { priceUpTo1m3: 0, pricePer1m3: 0 };
        return i.quantity * i.volume > 1 ? pricePer1m3 : priceUpTo1m3;
      }),
    ),
    getAmountReduce(
      watchTotals.map((row) => {
        const servicesAmount = getAmountReduce(row.selectedServices.map((i) => i.price));
        const consumablesAmount = getAmountReduce(row.selectedConsumables.map((i) => i.price));
        return (servicesAmount + consumablesAmount) * row.quantity;
      }),
    ),
  ];

  const tableTotal = [
    {
      title: 'Количество (ед)',
      value: formatCurrency(totalColumnValue[0]),
    },
    {
      title: getTextCurrency('Цена товаров'),
      value: formatCurrency(totalColumnValue[1]),
    },
    {
      title: getTextCurrency('Логистика до ФФ'),
      value: formatCurrency(totalColumnValue[2]),
    },
    {
      title: getTextCurrency('Цена за услуги ФФ'),
      value: formatCurrency(totalColumnValue[3]),
    },
    {
      title: getTextCurrency('Сумма'),
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
            <ScrollArea
              className={cn('rounded-lg border bg-white p-2 dark:bg-transparent', {
                'border-red-500': !!form.formState.errors.products?.message,
              })}
            >
              <div className={'flex items-center gap-4'}>
                {items.map(({ id }, index) => {
                  const disabled = !!fields.find((i) => i.wbProductId === id);
                  return (
                    <>
                      <button
                        key={id}
                        disabled={disabled}
                        className={cn('flex-none', {
                          'cursor-pointer': !disabled,
                          'opacity-50': disabled,
                        })}
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
                    </>
                  );
                })}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
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

                <DPSelect
                  title={'Расходники магазина'}
                  items={[]}
                  tForm={{ form, index, name: `` }}
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
