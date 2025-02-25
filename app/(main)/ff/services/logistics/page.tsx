'use client';
import { ServicesTable } from '../services-table';
import { columnsLogistics } from '../columns';
import { FormSchema, FormValues } from './schema';

import {
  useLogisticsGetLogisticsSuspense,
  useLogisticsCreateLogistics,
  useLogisticsUpdateLogistics,
  useLogisticsDeleteLogistics,
  LogisticsType,
  logisticsCreateServiceMutationKey,
} from '@/kubb-gen';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

export default function ServiceLogisticsPage() {
  const queryClient = useQueryClient();
  const { data } = useLogisticsGetLogisticsSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rows: data },
  });

  const { mutateAsync: mutateCreate } = useLogisticsCreateLogistics();
  const { mutateAsync: mutateUpdate } = useLogisticsUpdateLogistics();
  const { mutateAsync: mutateDelete } = useLogisticsDeleteLogistics();

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
          queryClient.setQueryData(logisticsCreateServiceMutationKey(), () => rows); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
          Promise.allSettled(promises).then(() => {
            queryClient.invalidateQueries({
              queryKey: logisticsCreateServiceMutationKey(),
            });
          });
        }}
        initialData={data}
        columns={columnsLogistics}
      />
    </Form>
  );
}
