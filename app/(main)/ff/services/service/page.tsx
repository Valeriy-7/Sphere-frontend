'use client';
import { ServicesTable } from '../services-table';
import { columns } from '../columns';
import React, { useEffect, useRef, useState } from 'react';
import { makeData } from './makeData';
import {
  useServicesGetServicesSuspense,
  useServicesCreateService,
  useServicesUpdateService,
  useServicesDeleteService,
  adminGetListSuspenseQueryKey,
  servicesGetServicesSuspenseQueryKey,
} from '@/kubb-gen';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FormSchema, FormValues } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

export default function ServicePage() {
  const queryClient = useQueryClient();
  const { data } = useServicesGetServicesSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rows: data,
    },
  });

  console.log(form.formState.errors);
  console.log(form.watch('rows'));

  const { mutateAsync: mutateCreate } = useServicesCreateService();
  const { mutateAsync: mutateUpdate } = useServicesUpdateService();
  const { mutateAsync: mutateDelete } = useServicesDeleteService();

  return (
    <Form {...form}>
      <ServicesTable
        form={form}
        onSubmit={({ newRows, removeIds, updateRows, rows }) => {
          console.log(newRows, removeIds, updateRows);
          const promises = [
            ...removeIds.map((id) => mutateDelete({ id })),
            ...newRows.map((data, index) => {
              return mutateCreate({ data: { ...data, price: String(data.price) } });
            }),
            ...updateRows.map((data) =>
              mutateUpdate({ id: data.id, data: { ...data, price: String(data.price) } }),
            ),
          ];
          queryClient.setQueryData(servicesGetServicesSuspenseQueryKey(), () => rows); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
          Promise.allSettled(promises).then(() => {
            queryClient.invalidateQueries({
              queryKey: [...servicesGetServicesSuspenseQueryKey()],
            });
          });
        }}
        initialData={data}
        columns={columns}
      />
    </Form>
  );
}
