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
import { toast } from 'sonner';

export default function ServicePage() {
  const queryClient = useQueryClient();
  const { data } = useLogisticsGetServicesSuspense();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    //defaultValues: { rows: data },
    values: { rows: data },
  });

  const { mutateAsync: mutateCreate } = useLogisticsCreateService();
  const { mutateAsync: mutateUpdate } = useLogisticsUpdateService();
  const { mutateAsync: mutateDelete } = useLogisticsDeleteService();

  console.log(form.formState.errors.rows);
  console.log(form.getValues());

  return (
    <Form {...form}>
      <ServicesTable<ServiceType, unknown>
        form={form}
        onSubmit={({ newRows, removeIds, updateRows, rows }) => {
          const promises = [
            ...removeIds.map((id) => mutateDelete({ id })),
            ...newRows.map(({ price, number, ...data }) => {
              return mutateCreate(
                {
                  data: {
                    ...data,
                    price: String(price) as unknown as number,
                    number: String(number) as unknown as number,
                  },
                },
                {
                  onError: (error) => {
                    toast.error(error?.response?.data?.message);
                  },
                },
              );
            }),
            ...updateRows.map(({ id, price, number, ...data }) =>
              mutateUpdate(
                {
                  id,
                  data: {
                    ...data,
                    price: String(price) as unknown as number,
                    number: String(number) as unknown as number,
                  },
                },
                {
                  onError: (error) => {
                    toast.error(error?.response?.data?.message);
                  },
                },
              ),
            ),
          ];

          Promise.allSettled(promises).finally(() => {
            // queryClient.setQueryData(logisticsGetServicesSuspenseQueryKey(), () => []); // иначе initialData не вызывала useEffect, потому что данные не менялись при ошибке нового элемента
            queryClient.invalidateQueries({
              queryKey: logisticsGetServicesSuspenseQueryKey(),
            });
            // form.reset({ rows:data });
          });
        }}
        initialData={data}
        columns={columnsService}
      />
    </Form>
  );
}
