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
import { DatePicker } from '@/components/date-picker';
import AppSelect from '@/components/app-select';

const FormSchema = z.object({
  employee: z.string().min(1, 'Обязательно для заполнения'),
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: "That's not a date!",
  }),
});

export function TableCellControlsGroup<TData>({
  table,
  row,
}: {
  table: TTable<TData>;
  row: Row<TData>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      employee: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('ЕЙ');
  }

  return (
    <Form {...form}>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <DatePicker form={form} name={'date'} />
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <AppSelect
          isMultiple
          options={[
            { label: 'Пушкин А.С', value: '1' },
            { label: 'Катушкин А.С', value: '2' },
            { label: 'Птушкин А.С', value: '3' },
          ]}
          form={form}
          name={'employee'}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Button
          type={'button'}
          onClick={form.handleSubmit(onSubmit)}
          variant={'outline'}
          size={'xs'}
        >
          В работу
        </Button>
      </TableCell>
    </Form>
  );
}
