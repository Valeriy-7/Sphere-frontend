"use client";
import { StorageFfTable } from "./storage-ff-table";
import { columns } from "./columns";
import React from "react";
import { makeData, DataRow } from "@/lib/makeData";
const initData = makeData();
export default function StorageFfPage() {
  const [data, setData] = React.useState(initData);
  return (
    <>
      <div>
        <h1>Склад ФФ</h1>
        <StorageFfTable<DataRow, unknown> data={data} columns={columns} />
      </div>
    </>
  );
}
