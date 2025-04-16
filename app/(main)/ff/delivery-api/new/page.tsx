'use client';
import React from 'react';
import { makeData, DataRow } from '../makeData';
import { DeliveryMpTable } from '@/app/(main)/ff/delivery/delivery-mp-table';
import { columns } from '../columns';
import { useFFAccountDeliveriesGetDeliveriesSuspense } from '@/kubb-gen';
const initData = makeData();
export default function DeliveryNewPage() {
  const [data, setData] = React.useState(initData);
  /*  const {
    data: { deliveries },
  } = useFFAccountDeliveriesGetDeliveriesSuspense();*/

    const RoutesData = [
        {
            id:'1',
            name:'Тяк Москва',
            address:'Ул. Тихорецкий б-р 1 стр 6',

            deliveryId:1,
            deliveryDate:'2025-04-15',
            deliveryNumber:'e09t6',
            cabinetInfo:{
                id:1,
                name:'Детский мир',
                legalCompanyName: 'ООО Детский мир',
                levName:'Лев',
                levPhone:'+7(777) 88 99 00'
            },


            suppliers: [
                {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "name": "ООО \"Ромашка\"",
                    "address": "Москва, МКАД, 14-й километр, 2, стр. 63",
                    "contactPerson": "Иван Иванов",
                    "contactPhone": "+7 (999) 123-45-67",
                    "location": "Линия 1, павильон 45",
                    "isTG": true,
                    "number": 1,
                    "planQuantity": 1000,
                    "factQuantity": 980,
                    "defects": 20,
                    "productsPrice": 50000,
                    "ffServicesPrice": 5000,
                    "logisticsToFFPrice": 3000,
                    "totalPrice": 58000
                }
            ],

        }
    ]

  return (
    <>
      <div>
        <h1>Поставки на фф новые</h1>
        <DeliveryMpTable<DataRow, unknown> data={RoutesData} columns={columns} />
      </div>
    </>
  );
}
