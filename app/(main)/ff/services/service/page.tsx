'use client';
import { ServicesTable } from '../services-table';
import { columnsService } from '../columns';
import { FormSchema, FormValues } from './schema';
import {
  useLogisticsGetServicesSuspense,
  useLogisticsCreateService,
  useLogisticsUpdateService,
  useLogisticsDeleteService,
  type ServiceType,
  logisticsGetServicesSuspenseQueryKey,
} from '@/kubb-gen';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

export default function ServicePage() {
  const queryClient = useQueryClient();
  const { data } = useLogisticsGetServicesSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rows: data },
  });

  const { mutateAsync: mutateCreate } = useLogisticsCreateService();
  const { mutateAsync: mutateUpdate } = useLogisticsUpdateService();
  const { mutateAsync: mutateDelete } = useLogisticsDeleteService();

  console.log(form.formState.errors.rows);

  return (
    <Form {...form}>
      <ServicesTable<ServiceType, unknown>
        form={form}
        onSubmit={({ newRows, removeIds, updateRows, rows }) => {
          const promises = [
            ...removeIds.map((id) => mutateDelete({ id })),
            ...newRows.map(({ price, ...data }, index) => {
              return mutateCreate({ data: { ...data, price: String(price) as unknown as number } });
            }),
            ...updateRows.map(({ id, price, ...data }) =>
              mutateUpdate({ id, data: { ...data, price: String(price) as unknown as number } }),
            ),
          ];
          queryClient.setQueryData(logisticsGetServicesSuspenseQueryKey(), () => rows); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
          Promise.allSettled(promises).then(() => {
            queryClient.invalidateQueries({
              queryKey: logisticsGetServicesSuspenseQueryKey(),
            });
          });
        }}
        initialData={data}
        columns={columnsService}
      />
    </Form>
  );
}
