'use client';
import { DeliveryRoutes } from './delivery-routes';
import { columns } from './columns';
import { columns as columnsOld } from './columnsOld';
import React from 'react';
import { makeData, DataRow } from '@/lib/makeData';
import { AppTabs, AppTabsWrap } from '@/components/app-tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFFDeliveriesGetFFDeliveriesSuspense } from '@/kubb-gen';
const initData = makeData();
export default function StorageFfPage() {
  //const { data } = useDeliveriesGetDeliveriesSuspense();
  /* const {
    data: { items, stats },
  } = useFFDeliveriesGetFFDeliveriesSuspense();*/
  //const [data, setData] = React.useState(initData);

  const { items, stats } = {
    items: [
      {
        cabinetInfo: {
          id: 1,
          name: 'Детский мир',
          legalCompanyName: 'ООО Детский мир',
          levName: 'Лев',
          levPhone: '+7(777) 88 99 00',
        },
        id: '123e4567-e89b-12d3-a456-4266141740001',
        deliveryId: '1',
        number: 1,
        status: 'CREATED',
        deliveryDate: '2024-04-10T00:00:00.000Z',

        deliveryNumber: '74000',
        name: 'Тяк москва',
        address: 'Ул. Тихорецкий б-р 1 стр 6',
        suppliers: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Солнышко',
            address: 'Москва, МКАД, 14-й километр, 2, стр. 63',
            contactPerson: 'Лев',
            contactPhone: '+7 (999) 123-45-67',
            location: 'Секция А 2д-08',
            isTG: true,
            number: 1,
            planQuantity: 1000,
            factQuantity: 980,
            defects: 20,
            productsPrice: 50000,
            ffServicesPrice: 5000,
            logisticsToFFPrice: 3000,
            totalPrice: 58000,
          },
        ],
        planQuantity: 1000,
        factQuantity: 980,
        defects: 20,
        productsPrice: 50000,
        ffServicesPrice: 5000,
        logisticsToFFPrice: 3000,
        totalPrice: 58000,
      },
      {
        cabinetInfo: {
          id: 2,
          name: 'Мир джинс',
          legalCompanyName: 'Ип Иванов',
          levName: 'Лев',
          levPhone: '+7(777) 88 99 00',
        },
        id: '123e4567-e89b-12d3-a456-4266141740001',
        deliveryId: '1',
        number: 1,
        status: 'CREATED',
        deliveryDate: '2024-04-10T00:00:00.000Z',

        deliveryNumber: '74000',
        name: 'Садовод',
        address: 'МКАД, 14-й километр, 2, стр. 63',
        suppliers: [
          {
            id: '123e4567-e89b-12d3-a456-4266141740001',
            name: 'Adidas',
            address: 'Москва, МКАД, 14-й километр, 2, стр. 63',
            contactPerson: 'Виталий',
            contactPhone: '+7 (999) 123-45-67',
            location: 'Секция А 2д-08',
            isTG: true,
            number: 1,
            planQuantity: 1000,
            factQuantity: 980,
            defects: 20,
            productsPrice: 50000,
            ffServicesPrice: 5000,
            logisticsToFFPrice: 3000,
            totalPrice: 58000,
          },
        ],
        planQuantity: 1000,
        factQuantity: 980,
        defects: 20,
        productsPrice: 50000,
        ffServicesPrice: 5000,
        logisticsToFFPrice: 3000,
        totalPrice: 58000,
      },
      {
        cabinetInfo: {
          id: 1,
          name: 'Мир джинс',
          legalCompanyName: 'Ип Иванов',
          levName: 'Лев',
          levPhone: '+7(777) 88 99 00',
        },
        id: '123e4567-e89b-12d3-a456-4266141740001',
        deliveryId: '2',
        number: 1,
        status: 'CREATED',
        deliveryDate: '2024-04-10T00:00:00.000Z',

        deliveryNumber: '74000',
        name: 'Садовод',
        address: 'МКАД, 14-й километр, 2, стр. 63',
        suppliers: [
          {
            id: '123e4567-e89b-12d3-a456-4266141740001',
            name: 'Adidas',
            address: 'Москва, МКАД, 14-й километр, 2, стр. 63',
            contactPerson: 'Виталий',
            contactPhone: '+7 (999) 123-45-67',
            location: 'Секция А 2д-08',
            isTG: true,
            number: 1,
            planQuantity: 1000,
            factQuantity: 980,
            defects: 20,
            productsPrice: 50000,
            ffServicesPrice: 5000,
            logisticsToFFPrice: 3000,
            totalPrice: 58000,
          },
        ],
        planQuantity: 1000,
        factQuantity: 980,
        defects: 20,
        productsPrice: 50000,
        ffServicesPrice: 5000,
        logisticsToFFPrice: 3000,
        totalPrice: 58000,
      },
    ],
    stats: {
      planQuantity: 5000,
      factQuantity: 4900,
      defects: 100,
      productsPrice: 250000,
      ffServicesPrice: 25000,
      logisticsToFFPrice: 15000,
      totalPrice: 290000,
    },
    total: 100,
    page: 1,
    pages: 10,
    limit: 10,
  };

  const RoutesData = [
    {
      id: '1',
      name: 'Тяк Москва',
      address: 'Ул. Тихорецкий б-р 1 стр 6',

      deliveryId: 1,
      deliveryDate: '2025-04-15',
      deliveryNumber: 'e09t6',
      cabinetInfo: {
        id: 1,
        name: 'Детский мир',
        legalCompanyName: 'ООО Детский мир',
        levName: 'Лев',
        levPhone: '+7(777) 88 99 00',
      },

      suppliers: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'ООО "Ромашка"',
          address: 'Москва, МКАД, 14-й километр, 2, стр. 63',
          contactPerson: 'Иван Иванов',
          contactPhone: '+7 (999) 123-45-67',
          location: 'Линия 1, павильон 45',
          isTG: true,
          number: 1,
          planQuantity: 1000,
          factQuantity: 980,
          defects: 20,
          productsPrice: 50000,
          ffServicesPrice: 5000,
          logisticsToFFPrice: 3000,
          totalPrice: 58000,
        },
      ],
    },
  ];
  return (
    <>
      <DeliveryRoutes<DataRow, unknown> data={items} columns={columns} stats={stats} />
    </>
  );
}
