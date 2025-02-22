'use client';
import { ServicesTable } from '../services-table';
import { columnsLogistics } from '../columns';
import { FormSchema, FormValues } from './schema';

import {
  useServicesGetLogisticsSuspense,
  useServicesCreateLogistics,
  useServicesUpdateLogistics,
  useServicesDeleteLogistics,
  servicesCreateLogisticsMutationKey,
  LogisticsType,
} from '@/kubb-gen';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

export default function ServiceLogisticsPage() {
  const queryClient = useQueryClient();
  const { data } = useServicesGetLogisticsSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rows: data },
  });

  const { mutateAsync: mutateCreate } = useServicesCreateLogistics();
  const { mutateAsync: mutateUpdate } = useServicesUpdateLogistics();
  const { mutateAsync: mutateDelete } = useServicesDeleteLogistics();

  console.log(form.formState.errors.rows);

  return (
    <Form {...form}>
      <ServicesTable<LogisticsType, unknown>
        form={form}
        onSubmit={({ newRows, removeIds, updateRows, rows }) => {
          const promises = [
            ...removeIds.map((id) => mutateDelete({ id })),
            ...newRows.map((data, index) => {
              return mutateCreate({ data });
            }),
            ...updateRows.map(({ id, ...data }) => mutateUpdate({ id, data })),
          ];
          queryClient.setQueryData(servicesCreateLogisticsMutationKey(), () => rows); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
          Promise.allSettled(promises).then(() => {
            queryClient.invalidateQueries({
              queryKey: servicesCreateLogisticsMutationKey(),
            });
          });
        }}
        initialData={data}
        columns={columnsLogistics}
      />
    </Form>
  );
}
