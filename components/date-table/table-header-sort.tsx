import { Header, flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import React from 'react';

type TableHeaderSortProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
  header: Header<TData, TValue>;
};

export function TableHeaderSort<TData, TValue>({
  header,

  className,
}: TableHeaderSortProps<TData, TValue>) {
  if (!header.column.getCanSort()) {
    return (
      <div className={cn(className)}>
        {' '}
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
    );
  }
  return (
    <div
      {...{
        className: header.column.getCanSort()
          ? 'cursor-pointer select-none inline-flex flex-1 [&_svg]:w-4 items-center'
          : '',
        onClick: header.column.getToggleSortingHandler(),
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      <div>
        {{
          asc: <ArrowUp />,
          desc: <ArrowDown />,
        }[header.column.getIsSorted() as string] ?? <ChevronsUpDown />}
      </div>
    </div>
  );
}
