'use client';
import { DeliveryMpTable } from '../delivery-mp-table';
import { columns } from '../columns';
import React from 'react';
import { makeData, DataRow } from '@/lib/makeData';
import DeliveryNewPage from '@/app/(main)/ff/delivery/new/page';
const initData = makeData();
export default function DeliveryAcceptancePage() {
  const [data, setData] = React.useState(initData);
  return (
    <>
      <div>
        <h1>Поставки на фф приемка</h1>
        <DeliveryMpTable<DataRow, unknown> data={data} columns={columns} isAcceptance />
      </div>
    </>
  );
}
