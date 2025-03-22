import * as React from 'react';

import { cn } from '@/lib/utils';
import { ColSizeList, getColSizeComponent } from '@/lib/TableHelpers';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & ColSizeList
>(({ className, colSizeList, children, ...props }, ref) => {
  const { ColSizeComponent } = getColSizeComponent(colSizeList);
  return (
    <div className="_relative _overflow-auto w-full">
      <table
        ref={ref}
        className={cn(
          'w-full table-fixed border-separate border-spacing-0 text-center text-xs',
          className,
        )}
        {...props}
      >
        {colSizeList?.length ? <ColSizeComponent /> : null}
        {children}
      </table>
    </div>
  );
});
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <thead ref={ref} className={cn('', className)} {...props} />);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody ref={ref} className={cn('', className)} {...props} />);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    isTotal?: boolean;
    rowSpace?: 'md' | 'xs' | false;
    level?: number;
  }
>(({ className, isTotal, level = 0, rowSpace = 'md', ...props }, ref) => (
  <>
    <tr
      data-level={level}
      data-total={isTotal}
      ref={ref}
      className={cn('group data-[state=selected]:bg-muted', className)}
      {...props}
    />
    {rowSpace ? (
      <tr
        className={cn({
          'h-1.5': rowSpace === 'md',
          'h-0.5': rowSpace === 'xs',
        })}
      ></tr>
    ) : (
      ''
    )}
  </>
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { isTotal?: boolean }
>(({ className, isTotal, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-8 p-[2px] align-middle font-semibold [&:has([role=checkbox])]:pr-0',
      isTotal
        ? 'border-y bg-white first:rounded-bl-lg first:border-l last:rounded-br-lg last:border-r dark:bg-transparent'
        : 'bg-primary text-primary-foreground first:rounded-tl-lg last:rounded-tr-lg',
      className,
    )}
    {...props}
  >
    <div className={'flex min-h-8 items-center justify-center'}>{children}</div>
  </th>
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    level?: number;
    noBgHover?: boolean;
  }
>(({ className, level = 0, noBgHover, children, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'break-all bg-white p-[2px] align-middle dark:border-b dark:bg-transparent [&:has([role=checkbox])]:pr-0',
      'first:rounded-l-lg last:rounded-r-lg',
      {
        'group-hover:bg-muted/80': !noBgHover,
        'border-y first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r': level === 0,
        'border-b first:rounded-l-none last:rounded-r-none group-last:border-none': level === 1,
      },
      //"px-1 py-1 align-middle  bg-white dark:bg-transparent",
      className,
    )}
    {...props}
  >
    <div className={'flex min-h-8 flex-col items-center justify-center'}>{children}</div>
  </td>
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mb-2 text-left text-sm font-medium', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const TableHeadFilter = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { isTotal?: boolean }
>(({ className, isTotal, ...props }, ref) => (
  <th
    ref={ref}
    className={cn('bg-white p-1 font-normal dark:bg-transparent', className)}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableRowExpand = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    colSpan: number;
    isTransparent?: boolean;
  }
>(({ className, colSpan, children, isTransparent, ...props }, ref) => (
  <>
    <tr>
      <td
        colSpan={colSpan}
        className={cn(
          {
            'rounded-lg border bg-white py-2 dark:bg-transparent': !isTransparent,
          },
          className,
        )}
      >
        {children}
      </td>
    </tr>
    <tr className={'h-2.5'}></tr>
  </>
));

TableRowExpand.displayName = 'TableRowExpand';

export {
  TableRowExpand,
  TableHeadFilter,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
