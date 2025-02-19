import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { cn } from '@/lib/utils';

export function LoginButtonChevron({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button
      size={'icon'}
      type="button"
      variant="ghost"
      className={cn(
        'h-[70px] w-[54px] px-3 py-2 hover:bg-transparent hover:text-primary-foreground hover:outline-none hover:ring-1 hover:ring-white hover:ring-offset-1',
        className,
      )}
      iconSizeNotDefault
      {...props}
    >
      <ChevronRight strokeWidth={1} size={40} />
      <span className="sr-only">Отправить</span>
    </Button>
  );
}
