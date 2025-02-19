"use client";
import { ServicesTable } from "../services-table";
import { columns, ServicesItem } from "../columns";
import React, { useEffect, useRef, useState } from "react";
import { makeData } from "../makeData";

export default function ServicesPage() {
  const [data, setData] = React.useState(() => makeData(10));

  return (
    <ServicesTable<ServicesItem, any>
      onSubmit={(val) => {
        console.log(val);

        setData([]);
      }}
      initialData={data}
      columns={columns}
    />
  );
}
