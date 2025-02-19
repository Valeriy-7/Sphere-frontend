"use client";
import { DeliveryMpTable } from "../delivery-mp-table";
import { columns } from "../columns";
import React from "react";
import { makeData, DataRow } from "@/lib/makeData";
const initData = makeData();
export default function DeliveryNewPage() {
  const [data, setData] = React.useState(initData);
  return (
    <>
      <div>
        <h1>Поставки на фф новые</h1>
        <DeliveryMpTable<DataRow, unknown> data={data} columns={columns} />
      </div>
    </>
  );
}
