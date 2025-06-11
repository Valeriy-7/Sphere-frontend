import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ResponsiblePerson {
  id: string;
  name: string;
}

interface TableSelectEmployeeProps {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}

interface TableSelectEmployeeMultipleProps {
  onValueChange?: (values: ResponsiblePerson[]) => void;
  value?: ResponsiblePerson[];
  disabled?: boolean;
  placeholder?: string;
}

export function TableSelectEmployee(props: TableSelectEmployeeProps) {
  const { data: responsiblePersons, isLoading } = useQuery<ResponsiblePerson[]>({
    queryKey: ['ff-account-workers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/workers');
      if (!response.ok) {
        throw new Error('Failed to fetch responsible persons');
      }
      return response.json();
    },
  });

  return (
    <Select {...props} disabled={isLoading || props.disabled}>
      <SelectTrigger size={'xs'}>
        <SelectValue placeholder="Выбрать" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Загрузка...
            </SelectItem>
          ) : responsiblePersons && responsiblePersons.length > 0 ? (
            responsiblePersons.map((person) => (
              <SelectItem key={person.id} value={person.id}>
                {person.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              Нет доступных сотрудников
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function TableSelectEmployeeMultiple({
  onValueChange,
  value = [],
  disabled = false,
  placeholder = "Выбрать сотрудников"
}: TableSelectEmployeeMultipleProps) {
  const [open, setOpen] = useState(false);
  
  const { data: responsiblePersons, isLoading } = useQuery<ResponsiblePerson[]>({
    queryKey: ['ff-account-workers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/workers');
      if (!response.ok) {
        throw new Error('Failed to fetch responsible persons');
      }
      return response.json();
    },
  });

  const getText = (selectedPersons: ResponsiblePerson[]) => {
    if (selectedPersons.length === 0) return placeholder;
    if (selectedPersons.length === 1) return selectedPersons[0].name;
    return `${selectedPersons.length} сотрудников выбрано`;
  };

  const handleSelect = (person: ResponsiblePerson) => {
    if (!onValueChange) return;
    
    const isSelected = value.some(p => p.id === person.id);
    let updatedSelection: ResponsiblePerson[];
    
    if (isSelected) {
      updatedSelection = value.filter(p => p.id !== person.id);
    } else {
      updatedSelection = [...value, person];
    }
    
    onValueChange(updatedSelection);
  };

  if (isLoading) {
    return (
      <Button size="xs" variant="outline" disabled>
        Загрузка...
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="xs"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('justify-between', !value.length && 'text-muted-foreground')}
        >
          <span className="truncate">{getText(value)}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {responsiblePersons && responsiblePersons.length > 0 ? (
                responsiblePersons.map((person) => (
                  <CommandItem
                    key={person.id}
                    value={person.name}
                    onSelect={() => handleSelect(person)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value.some(p => p.id === person.id) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {person.name}
                  </CommandItem>
                ))
              ) : (
                <CommandItem disabled>
                  Нет доступных сотрудников
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
