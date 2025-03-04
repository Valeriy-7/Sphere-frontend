'use client';
import { StorageTableNew } from './storage-table-new';
import { columns } from './columns';
import React from 'react';
import { makeData, DataRow } from '@/lib/makeData';
const initData = makeData();
export default function StorageFfPage() {
  const [data, setData] = React.useState(initData);
  return (
    <>
      <div>
        <h1>Склад ФФ new</h1>
        <StorageTableNew<DataRow, unknown> data={data} columns={columns} />
      </div>
    </>
  );
}
