'use client';
import { FilterTable } from './filter-table';
import { columns } from './columns';
import React from 'react';
import { makeData } from './makeData';

export default function filterPage() {
  const [data, setData] = React.useState(() => makeData(100, 5));
  return (
    <>
      <div>
        <FilterTable data={data} columns={columns} />
      </div>
    </>
  );
}
