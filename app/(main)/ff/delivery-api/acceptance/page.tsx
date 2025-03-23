'use client';
import { DeliveryMpTable } from '../delivery-mp-table';

import { columns } from '../columns';
import React from 'react';
import { makeData, DataRow } from '../makeData';
import DeliveryNewPage from '@/app/(main)/ff/delivery/new/page';
import { useFFAccountDeliveriesGetDeliveriesSuspense } from '@/kubb-gen';
const data = makeData();
export default function DeliveryAcceptancePage() {
  const {
    data: { items },
  } = useFFAccountDeliveriesGetDeliveriesSuspense();

  return (
    <>
      <div>
        <h1>Поставки на фф приемка</h1>
        <DeliveryMpTable data={data} columns={columns} isAcceptance />
      </div>
    </>
  );
}
