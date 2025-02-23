'use client';
import { ServicesTable } from '../services-table';
import { columnsConsumable } from '../columns';
import { FormSchema, FormValues } from './schema';

import {
  useServicesGetConsumablesSuspense,
  useServicesCreateConsumable,
  useServicesUpdateConsumable,
  useServicesDeleteConsumable,
  servicesCreateConsumableMutationKey,
  ConsumableType,
} from '@/kubb-gen';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

export default function ServiceConsumablePage() {
  const queryClient = useQueryClient();
  const { data } = useServicesGetConsumablesSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rows: data },
  });

  const { mutateAsync: mutateCreate } = useServicesCreateConsumable();
  const { mutateAsync: mutateUpdate } = useServicesUpdateConsumable();
  const { mutateAsync: mutateDelete } = useServicesDeleteConsumable();

  console.log(form.formState.errors.rows);

  return (
    <Form {...form}>
      <ServicesTable<ConsumableType, unknown>
        form={form}
        onSubmit={({ newRows, removeIds, updateRows, rows }) => {
          const promises = [
            ...removeIds.map((id) => mutateDelete({ id })),
            ...newRows.map(({ price, quantity, ...data }, index) => {
              return mutateCreate({
                data: {
                  ...data,
                  quantity: String(quantity) as unknown as number,
                  price: String(price) as unknown as number,
                },
              });
            }),
            ...updateRows.map(({ id, price, quantity, ...data }) =>
              mutateUpdate({
                id,
                data: {
                  ...data,
                  quantity: String(quantity) as unknown as number,
                  price: String(price) as unknown as number,
                },
              }),
            ),
          ];
          queryClient.setQueryData(servicesCreateConsumableMutationKey(), () => rows); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
          Promise.allSettled(promises).then(() => {
            queryClient.invalidateQueries({
              queryKey: servicesCreateConsumableMutationKey(),
            });
          });
        }}
        initialData={data}
        columns={columnsConsumable}
      />
    </Form>
  );
}
