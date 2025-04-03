'use client';

import { cn } from '@/lib/utils';
import { RUB } from '@/lib/constants/rub';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DPBody, DPItem, DPProps, DPTitle } from './delivery-create-row';

type DPSelectItem = {
  name: string;
  price?: number;
  id: string;
  isSupplier?: boolean;
};
type DPSelectProps = DPProps & {
  title: string;
  items: DPSelectItem[];
  value: DPSelectItem[];
  isSelect?: boolean;
  selectIds?: string[];
  isSupplier?: boolean;
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/components/hooks/use-toast';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { SupplierCreateDialog } from '@/app/(main)/wb/delivery/ff/create/supplier-create-dialog';
import { CheckboxItem, FormValues } from '@/app/(main)/wb/delivery/ff/create/schema';
import * as React from 'react';
import { addLogisticsPrice } from '@/app/(main)/wb/delivery/ff/create/store';

const FormSchema = z.object({
  items: z.array(z.string().optional()),
});

type DPSelectForm = {
  tForm?: {
    form: UseFormReturn<FormValues>;
    name: string;
    index: number;
  };
};

export function DPSelect({
  children,
  className,
  title,
  items,
  isSelect,
  isSupplier,
  tForm,
}: DPProps & DPSelectProps & DPSelectForm) {
  const sum = items.map((i) => i.price).reduce((p, c) => p + c, 0);

  const error = tForm?.form.formState.errors.products?.[tForm?.index]?.[tForm?.name]?.message;
  const product = tForm?.form.watch('products')[tForm?.index];
  const selectSum =
    !isSupplier &&
    product?.[tForm?.name]?.map((i) => i.price).reduce((p, c) => p + c, 0) * product.quantity;

  return (
    <DPItem className={cn('max-w-[216px]', className)}>
      <DPTitle>{title}</DPTitle>
      {!isSupplier && (
        <DPBody>
          {isSelect ? selectSum : sum} {RUB}
        </DPBody>
      )}
      {isSupplier && <SupplierCreateDialog />}
      <ScrollArea className={cn('max-h-[92px]', { 'rounded-lg border border-red-500': !!error })}>
        {isSelect ? (
          <DPSelectForm2
            isSupplier={isSupplier}
            tForm={tForm}
            isSingle={isSupplier}
            items={items}
          />
        ) : (
          <div className={'space-y-1'}>
            {items.map((item) => {
              return <DPSelectItem {...item}></DPSelectItem>;
            })}
          </div>
        )}
      </ScrollArea>
    </DPItem>
  );
}

export function DPCheckBoxList<TName>({
  children,
  className,
  title,
  items,
  form,
  index,
  name,
}: DPProps &
  DPSelectProps & {
    form: UseFormReturn<FormValues>;
    name: string;
    index: number;
  }) {
  /*    const selectSum = items
        .filter(i=>ids.includes(i.id))
        .map(i=>i.price)
        .reduce((p, c) => p + c, 0)*/
  return (
    <DPItem className={cn('w-[216px]', className)}>
      <DPTitle>{title}</DPTitle>
      <ScrollArea className={'max-h-[92px]'}>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <div className={'space-y-1'}>
                  {items.map((option) => (
                    <div key={option.id} className="relative flex items-center gap-2 space-y-0">
                      <label htmlFor={`checkbox-${index}-${option.id}`} className="block w-full">
                        <DPSelectItem {...option}></DPSelectItem>
                      </label>
                      <Checkbox
                        className={'mr-3'}
                        id={`checkbox-${index}-${option.id}`}
                        checked={field.value.some((i) => i.id === option.id)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, option]
                            : field.value.filter((item: CheckboxItem) => item.id !== option.id);
                          console.log(updatedValue);
                          field.onChange(updatedValue);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </ScrollArea>
    </DPItem>
  );
}

export function DPSelectItem({ price, name, isSupplier }: DPSelectItem) {
  return (
    <DPBody className={'flex w-full justify-between gap-1'}>
      <span>{name}</span>
      {!isSupplier && (
        <span>
          {price} {RUB} / ед
        </span>
      )}
    </DPBody>
  );
}

export function DPSelectForm({
  data,
  items,
  onChange,
  isSingle,
}: {
  data: string[];
  items: DPSelectItem[];
  onChange: (data: z.infer<typeof FormSchema>) => void;
  isSingle?: boolean;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: data,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className={'space-y-1'}>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className={'relative flex items-center gap-2 space-y-0'}
                      >
                        <FormLabel
                          className={'absolute bottom-0 left-0 right-0 top-0 cursor-pointer'}
                        />
                        <DPSelectItem {...item}></DPSelectItem>
                        <FormControl>
                          <Checkbox
                            className={'mr-3'}
                            disabled={
                              isSingle &&
                              Boolean(field.value.length && !field.value?.includes(item.id))
                            }
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));

                              onChange(form.getValues());
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function DPSelectForm2({
  items,
  isSingle,
  isSupplier,
  tForm: { form, name, index },
}: {
  items: DPSelectItem[];
  isSingle?: boolean;
  isSupplier?: boolean;
} & DPSelectForm) {
  return (
    <FormField
      control={form.control}
      name={`products.${index}.${name}`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className={'space-y-1'}>
              {items.map((option) => (
                <div key={option.id} className="relative flex items-center gap-2 space-y-0">
                  <label
                    htmlFor={`${name}-checkbox-${index}-${option.id}`}
                    className="block w-full cursor-pointer"
                  >
                    <DPSelectItem isSupplier={isSupplier} {...option}></DPSelectItem>
                  </label>
                  {isSupplier ? (
                    <Checkbox
                      /* _disabled={
                               isSingle && Boolean(field.value.length && !field.value?.includes(option.id))
                             }*/
                      className={'mr-3'}
                      id={`${name}-checkbox-${index}-${option.id}`}
                      checked={field.value === option.id}
                      onCheckedChange={() => {
                        const id = field.value === option.id ? '' : option.id;
                        field.onChange(id);
                      }}
                    />
                  ) : (
                    <Checkbox
                      /* _disabled={
                      isSingle && Boolean(field.value.length && !field.value?.includes(option.id))
                    }*/
                      className={'mr-3'}
                      id={`${name}-checkbox-${index}-${option.id}`}
                      checked={field.value.some((i) => i.id === option.id)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...field.value, option]
                          : field.value.filter((item: CheckboxItem) => item.id !== option.id);
                        console.log(updatedValue);
                        field.onChange(updatedValue);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
