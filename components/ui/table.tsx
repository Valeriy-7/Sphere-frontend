import * as React from "react";

import { cn } from "@/lib/utils";
import { ColSizeList, getColSizeComponent } from "@/lib/TableHelpers";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & ColSizeList
>(({ className, colSizeList, children, ...props }, ref) => {
  const { ColSizeComponent } = getColSizeComponent(colSizeList);
  return (
    <div className="_relative w-full _overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full text-xs border-separate border-spacing-0 text-center table-fixed",
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
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    isTotal?: boolean;
    rowSpace?: "md" | "xs" | false;
    level?: number;
  }
>(({ className, isTotal, level = 0, rowSpace = "md", ...props }, ref) => (
  <>
    <tr
      data-level={level}
      data-total={isTotal}
      ref={ref}
      className={cn("data-[state=selected]:bg-muted group", className)}
      {...props}
    />
    {rowSpace ? (
      <tr
        className={cn({
          "h-1.5": rowSpace === "md",
          "h-0.5": rowSpace === "xs",
        })}
      ></tr>
    ) : (
      ""
    )}
  </>
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { isTotal?: boolean }
>(({ className, isTotal, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-8 p-[2px] align-middle font-semibold [&:has([role=checkbox])]:pr-0",
      isTotal
        ? "bg-white dark:bg-transparent first:rounded-bl-lg last:rounded-br-lg border-y first:border-l last:border-r"
        : "bg-primary text-primary-foreground first:rounded-tl-lg last:rounded-tr-lg",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    level?: number;
    noBgHover?: boolean;
  }
>(({ className, level = 0, noBgHover, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "[&:has([role=checkbox])]:pr-0 p-[2px] align-middle bg-white dark:bg-transparent dark:border-b break-all",
      "last:rounded-r-lg first:rounded-l-lg",
      {
        "group-hover:bg-muted/80": !noBgHover,
        "last:rounded-r-lg first:rounded-l-lg border-y first:border-l last:border-r":
          level === 0,
        "last:rounded-r-none first:rounded-l-none border-b": level === 1,
      },
      //"px-1 py-1 align-middle  bg-white dark:bg-transparent",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mb-2 text-sm text-left font-medium", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

const TableHeadFilter = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { isTotal?: boolean }
>(({ className, isTotal, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("font-normal bg-white p-1 dark:bg-transparent", className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

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
            "bg-white dark:bg-transparent rounded-lg border py-2":
              !isTransparent,
          },
          className,
        )}
      >
        {children}
      </td>
    </tr>
    <tr className={"h-2.5"}></tr>
  </>
));

TableRowExpand.displayName = "TableRowExpand";

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
