import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span>{title}</span>

      {column.getIsSorted() === 'desc' ? (
        <button onClick={() => column.toggleSorting(false)} className={'[&_svg]:w-4'}>
          <ArrowDown />
        </button>
      ) : column.getIsSorted() === 'asc' ? (
        <button className={'[&_svg]:w-4'} onClick={() => column.toggleSorting(true)}>
          <ArrowUp />
        </button>
      ) : (
        <button className={'[&_svg]:w-4'} onClick={() => column.toggleSorting(true)}>
          <ChevronsUpDown />
        </button>
      )}
    </div>
  );
}
