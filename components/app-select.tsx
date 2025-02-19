'use client';

import { Check, ChevronDown, ChevronsDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type AppSelectProps = {
  options: { label: string; value: string }[];
  isMultiple?: boolean;
};
export default function AppSelect<FormValues extends FieldValues>({
  isMultiple,
  options,
  form,
  name,
}: AppSelectProps & {
  form: UseFormReturn<FormValues>;
  name: string;
}) {
  function getText(value: { label: string; value: string }[]) {
    return value.length > 0 ? `${value.map((i) => i.label).join(', ')}` : 'Выбрать';
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  size={'xs'}
                  variant="outline"
                  role="combobox"
                  className={cn('', !field.value.length && 'text-muted-foreground')}
                >
                  <span className={'truncate'}>{getText(field.value)}</span>

                  <ChevronDown className={'ml-auto'} />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          if (!isMultiple) {
                            form.setValue(name, [option]);
                            return;
                          }
                          const updatedLanguages = field.value.some((i) => i.value === option.value)
                            ? field.value.filter((i) => i.value !== option.value)
                            : [...field.value, option];
                          form.setValue(name, updatedLanguages);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value.map((i) => i.value).includes(option.value)
                              ? 'opacity-100'
                              : 'opacity-15',
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
