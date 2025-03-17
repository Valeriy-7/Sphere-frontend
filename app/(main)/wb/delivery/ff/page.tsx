'use client';
import { DeliveryFfTable } from './delivery-ff-table';
import { columns } from './columns';
import React from 'react';
import { makeData, DataRow } from '@/lib/makeData';
import { AppTabs, AppTabsWrap } from '@/components/app-tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFFDeliveriesGetFFDeliveriesSuspense } from '@/kubb-gen';
const initData = makeData();
export default function StorageFfPage() {
  //const { data } = useDeliveriesGetDeliveriesSuspense();
  const {
    data: { items, stats },
  } = useFFDeliveriesGetFFDeliveriesSuspense();
  //const [data, setData] = React.useState(initData);
  return (
    <>
      <AppTabsWrap>
        <AppTabs
          list={[
            { label: 'Поставки на ФФ', href: '/wb/delivery/ff' },
            {
              label: 'Поставки на WB',
              href: '/wb/delivery/wb',
              disabled: true,
            },
          ]}
        />
        <div>
          <Button asChild>
            <Link href={'ff/create'}>Создать поставку</Link>
          </Button>
        </div>
      </AppTabsWrap>
      <div>
        <h1>Магазин / Поставки на ФФ</h1>
        <DeliveryFfTable<DataRow, unknown> data={items} columns={columns} stats={stats} />
      </div>
    </>
  );
}
