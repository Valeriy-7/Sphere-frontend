'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface SimpleDatePickerProps {
  value?: string | Date | null;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disablePastDates?: boolean;
}

export function SimpleDatePicker({ 
  value, 
  onChange, 
  placeholder = "Выбрать дату",
  disablePastDates = false
}: SimpleDatePickerProps) {
  // Convert the input value to a Date object
  const getDateValue = (): Date | undefined => {
    if (!value) return undefined;
    
    if (value instanceof Date) {
      return value;
    }
    
    if (typeof value === 'string') {
      const parsed = new Date(value);
      return isNaN(parsed.getTime()) ? undefined : parsed;
    }
    
    return undefined;
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(getDateValue());
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const displayDate = selectedDate || getDateValue();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          className={cn(
            "justify-start text-left font-normal",
            !displayDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayDate ? format(displayDate, 'dd.MM.yyyy') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={displayDate}
          onSelect={handleSelect}
          disabled={disablePastDates ? (date) => date < new Date(new Date().setHours(0, 0, 0, 0)) : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
} 