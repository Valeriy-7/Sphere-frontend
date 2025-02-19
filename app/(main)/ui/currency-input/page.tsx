"use client";
import React, { useState } from "react";

import { formatCurrency } from "@/lib/formatCurrency";
import { CurrencyInput } from "@/components/currency-input";

export default function CurrencyInputPage() {
  const [value, setValue] = useState<number | undefined>(1000);

  return (
    <div className="row">
      {formatCurrency("1000")}
      {formatCurrency("10000")}
      {formatCurrency("10000.123")}
      <CurrencyInput value={value} onChange={setValue} />
      value {typeof value} {value}
    </div>
  );
}
