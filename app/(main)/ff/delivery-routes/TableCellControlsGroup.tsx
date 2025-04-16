import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import React from 'react';
import { TableSelectEmployee } from './TableSelectEmployee';
import { TableSelectLogistics } from './TableSelectLogistics';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  employee: z.string().min(1, 'Обязательно для заполнения'),
  logistics: z.string().min(1, 'Обязательно для заполнения'),
});

export function TableCellControlsGroup<TData>({
  table,
  row,
  isGroupHeader,
  isAcceptance,
}: {
  isAcceptance?: boolean;
  isGroupHeader: boolean;
  table: TTable<TData>;
  row: Row<TData>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employee: '',
      logistics: '',
    },
  });

  const selectedList = row.subRows.filter((i) => i.getIsSelected()).map((i) => i.original.uuid);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('ЕЙ', data, row.subRows);

    if (!isGroupHeader) {
      return;
    }
  }

  const disabled = isGroupHeader && !selectedList.length;

  if (isAcceptance) {
    return (
      <>
        <TableCell>{row.original.city}</TableCell>
        <TableCell>{row.original.city}</TableCell>

        <TableCell>
          <Button
            disabled={disabled}
            type={'button'}
            onClick={() => {
              console.log(table.options?.meta?.productPlace);
              console.log(row.subRows.map((row) => row.original?.subRows?.map((row) => row.uuid)));
            }}
            variant={'outline'}
            size={'xs'}
          >
            Принято
          </Button>
        </TableCell>
      </>
    );
  }

  return (
    <Form {...form}>
      <TableCell>
        <FormField
          control={form.control}
          name="employee"
          render={({ field }) => (
            <FormItem>
              <TableSelectEmployee onValueChange={field.onChange} defaultValue={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name="logistics"
          render={({ field }) => (
            <FormItem>
              <TableSelectLogistics onValueChange={field.onChange} defaultValue={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>

      <TableCell>
        <Button
          disabled={disabled}
          type={'button'}
          onClick={form.handleSubmit(onSubmit)}
          variant={'outline'}
          size={'xs'}
        >
          Приемка
        </Button>
      </TableCell>
    </Form>
  );
}
