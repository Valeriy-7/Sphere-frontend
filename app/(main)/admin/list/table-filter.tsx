import { Column } from "@tanstack/react-table";
import React from "react";
import { CurrencyInput } from "@/components/currency-input";
import { Input } from "@/components/ui/input";

export function TableFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="inline-flex gap-1 max-w-[150px]">
        {/* See faceted column filters example for min max values functionality */}
        <CurrencyInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="px-1 md:text-xs h-auto w-full"
        />
        <CurrencyInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="px-1 md:text-xs h-auto w-full"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : filterVariant === "text" ? (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Поиск по карточки и артикулу...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  ) : // See faceted column filters example for datalist search suggestions
  null;
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 0,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      className={"px-1 md:text-xs h-auto"}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
