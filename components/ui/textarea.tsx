import * as React from 'react';

import { cn } from '@/lib/utils';
import { inputVariants } from '@/components/ui/input';
import type { VariantProps } from 'class-variance-authority';
import {CurrencyInputProps} from "react-currency-input-field";
type TeaxtareaProps = {
    onChange: (val: string) => void;
} & Omit<React.ComponentProps<'textarea'>, 'onChange'> & VariantProps<typeof inputVariants>;
const Textarea = React.forwardRef<HTMLTextAreaElement, TeaxtareaProps>(
  ({ className, variant, size, onChange, ...props }, ref) => {
    return (
      <textarea onChange={event => {
          onChange(event.target.value)
      }} className={cn(inputVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
