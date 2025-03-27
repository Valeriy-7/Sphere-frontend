'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { DATE_FORMAT } from '@/lib/constants/date';

export function DatePicker<FormValues extends FieldValues>({
  form,
  name,
}: {
  form: UseFormReturn<FormValues>;
  name: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  size={'xs'}
                  variant={'outline'}
                  className={cn('', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? format(field.value, DATE_FORMAT) : <span>Выбрать</span>}
                  <CalendarIcon className={'ml-auto'} />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                /*  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}*/
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
