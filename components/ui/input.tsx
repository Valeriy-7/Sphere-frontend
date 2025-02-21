import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from '@/components/ui/label';

export const inputVariants = cva(
  [
    'text-center inline-flex w-full rounded-md border  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-75 text-sm',
    'aria-invalid:border-red-500',
    'light:bg-white',
  ],
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: 'h-9 px-3 py-1 text-base text-left',
        xs: 'h-5 px-1.5 text-xs rounded-sm max-w-[110px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type InputProps = React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & { label?: string };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, label, id, ...props }, ref) => {
    if (label) {
      return (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor={id}>{label}</Label>
          <input
            type={type}
            className={cn(inputVariants({ variant, size, className }))}
            ref={ref}
            id={id}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        id={id}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
