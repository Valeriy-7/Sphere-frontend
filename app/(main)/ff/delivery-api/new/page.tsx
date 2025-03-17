'use client';
import React from 'react';
import { makeData, DataRow } from '@/lib/makeData';
import { DeliveryMpTable } from '@/app/(main)/ff/delivery/delivery-mp-table';
import { columns } from '@/app/(main)/ff/delivery/columns';
import { useFFAccountDeliveriesGetDeliveriesSuspense } from '@/kubb-gen';
const initData = makeData();
export default function DeliveryNewPage() {
  const [data, setData] = React.useState(initData);
  const {
    data: { deliveries },
  } = useFFAccountDeliveriesGetDeliveriesSuspense();
  return (
    <>
      <div>
        <h1>Поставки на фф новые</h1>
        <DeliveryMpTable<DataRow, unknown> data={deliveries} columns={columns} />
      </div>
    </>
  );
}
