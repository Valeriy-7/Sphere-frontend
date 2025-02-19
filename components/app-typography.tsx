import { PropsWithChildren } from 'react';

type TypographyProps = PropsWithChildren & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
} & React.HTMLAttributes<HTMLHeadingElement>;
export function TypographyH1({ as: Component, ...props }: TypographyProps) {
  return (
    <h1 {...props} className="scroll-m-20 text-4xl font-extrabold lg:text-5xl">
      Taxing Laughter: The Joke Tax Chronicles
    </h1>
  );
}
export function TypographyH2({ as: Component = 'h2', children, ...props }: TypographyProps) {
  return (
    <Component {...props} className="scroll-m-20 pb-2 text-xl font-normal first:mt-0">
      {children}
    </Component>
  );
}

export function TypographyH3({ as: Component = 'h3', children, ...props }: TypographyProps) {
  return (
    <Component {...props} className="scroll-m-20 text-sm font-medium">
      {children}
    </Component>
  );
}

export function TypographyH4({ as: Component, ...props }: TypographyProps) {
  return (
    <h4 {...props} className="scroll-m-20 text-xl font-semibold">
      People stopped telling jokes
    </h4>
  );
}
