'use client';
import { ServicesTable } from './services-table';
import { columns } from './columns';
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

export default function ServicesPage() {
  const queryClient = useQueryClient();
  const { data } = useServicesGetServicesSuspense();

  const { mutateAsync: mutateCreate } = useServicesCreateService();
  const { mutateAsync: mutateUpdate } = useServicesUpdateService();
  const { mutateAsync: mutateDelete } = useServicesDeleteService();

  return (
    <ServicesTable
      onSubmit={({ newRows, removeIds, updateRows }) => {
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
        Promise.allSettled(promises).then((results) => {
            results.forEach(({status})=>{
                console.log(status);
            })
            console.log('invalidateQueries');
            queryClient.invalidateQueries({
            queryKey: [...servicesGetServicesSuspenseQueryKey()],
          });
        });
      }}
      initialData={data}
      columns={columns}
    />
  );
}
