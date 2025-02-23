'use client';
import { DeliveryFfTable } from './delivery-ff-table';
import { columns } from './columns';
import React from 'react';
import { makeData, DataRow } from '@/lib/makeData';

const initData = makeData();
export default function StorageFfPage() {
  const [data, setData] = React.useState(initData);
  return (
    <>
      <div>
        <h1>Магазины</h1>
        <DeliveryFfTable<DataRow, unknown> data={data} columns={columns} />
      </div>
    </>
  );
}
