import { Table, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import * as React from 'react';
import { ReactNode } from 'react';

type DataTableTotalProps = {
  caption?: string;
  data: {
    title: string;
    value: string | number | ReactNode;
  }[];
} & React.HTMLAttributes<HTMLTableElement>;
export function DataTableTotal({ caption, data = [], ...props }: DataTableTotalProps) {
  return (
    <Table {...props}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow rowSpace={false}>
          {data.map(({ title }, index) => (
            <TableHead key={'head' + index}>{title}</TableHead>
          ))}
        </TableRow>
        <TableRow rowSpace={false}>
          {data.map(({ value }, index) => (
            <TableHead key={'cell' + index} isTotal>
              {value}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    </Table>
  );
}
