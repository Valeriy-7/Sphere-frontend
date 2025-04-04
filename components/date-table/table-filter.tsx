import { Column } from '@tanstack/react-table';
import React from 'react';
import { CurrencyInput } from '@/components/currency-input';
import { Input } from '@/components/ui/input';

export function TableFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  return filterVariant === 'range' ? (
    <div>
      <div className="inline-flex max-w-[150px] gap-1">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`от`}
        />
        <DebouncedInput
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`до`}
        />
      </div>
    </div>
  ) : filterVariant === 'select' ? (
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
  ) : filterVariant === 'text' ? (
    <DebouncedInput
      className={'max-w-none'}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Поиск`}
      type="text"
      value={(columnFilterValue ?? '') as string}
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
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
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
      size={'xs'}
      className={'h-auto px-1 md:text-xs'}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
