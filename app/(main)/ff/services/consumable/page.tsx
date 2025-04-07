'use client';
import { ServicesTable } from '../services-table';
import { columnsConsumable } from '../columns';
import { FormSchema, FormValues } from './schema';

import {
  useLogisticsGetConsumablesSuspense,
  useLogisticsCreateConsumable,
  useLogisticsUpdateConsumable,
  useLogisticsDeleteConsumable,
  ConsumableType,
  logisticsCreateConsumableMutationKey,
} from '@/kubb-gen';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';

export default function ServiceConsumablePage() {
  const queryClient = useQueryClient();
  const { data } = useLogisticsGetConsumablesSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    values: { rows: data },
  });

  const { mutateAsync: mutateCreate } = useLogisticsCreateConsumable({
    mutation: {
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    },
  });
  const { mutateAsync: mutateUpdate } = useLogisticsUpdateConsumable({
    mutation: {
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    },
  });
  const { mutateAsync: mutateDelete } = useLogisticsDeleteConsumable({
    mutation: {
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
    },
  });

  console.log(form.formState.errors.rows);

  return (
    <Form {...form}>
      <ServicesTable<ConsumableType, unknown>
        form={form}
        onSubmit={({ newRows, removeIds, updateRows, rows }) => {
          const promises = [
            ...removeIds.map((id) => mutateDelete({ id })),
            ...newRows.map(({ price, quantity, number, ...data }, index) => {
              return mutateCreate({
                data: {
                  ...data,
                  quantity: String(quantity) as unknown as number,
                  price: String(price) as unknown as number,
                  number: String(number) as unknown as number,
                },
              });
            }),
            ...updateRows.map(({ id, price, quantity, number, ...data }) =>
              mutateUpdate({
                id,
                data: {
                  ...data,
                  quantity: String(quantity) as unknown as number,
                  price: String(price) as unknown as number,
                  number: String(number) as unknown as number,
                },
              }),
            ),
          ];
          //queryClient.setQueryData(logisticsCreateConsumableMutationKey(), () => rows); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
          Promise.allSettled(promises).then(() => {
            queryClient.invalidateQueries({
              queryKey: logisticsCreateConsumableMutationKey(),
            });
          });
        }}
        initialData={data}
        columns={columnsConsumable}
      />
    </Form>
  );
}
