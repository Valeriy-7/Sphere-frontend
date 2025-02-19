import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { AppSpinner } from '@/components/app-spinner';

const buttonVariants = cva(
  [
    'relative w-full inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:shrink-0 [&_svg]:pointer-events-none',
    //" [&:not([data-icon-size-not-default])_svg]:size-4",
    'aria-invalid:border-red-500',
    'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
    'data-[disabled]:opacity-50',
    //"shadow-[0px_1px_4px_rgba(0,0,0,0.2)]",
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary/90 text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent text-accent-foreground hover:text-muted-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        flat: 'hover:bg-secondary/50',
      },
      size: {
        default: 'h-8 px-4 py-2 text-sm w-[150px] [&_svg]:size-4',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-5 px-1.5 text-xs rounded-sm w-[110px] [&_svg]:size-3 leading-none',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconSizeNotDefault?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { iconSizeNotDefault, className, variant, size, asChild = false, loading, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        data-icon-size-not-default={iconSizeNotDefault}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className={''}>
          <span
            data-loading={loading}
            className={'w-full text-center data-[loading=true]:opacity-0 [&_a]:block [&_a]:w-full'}
          >
            {children}
          </span>

          {loading && <BtnSpinner />}
        </span>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

export function BtnSpinner() {
  return (
    <div className={'absolute bottom-0 left-0 right-0 top-0 flex justify-center gap-2'}>
      <AppSpinner className={'text-white'} />
    </div>
  );
}
