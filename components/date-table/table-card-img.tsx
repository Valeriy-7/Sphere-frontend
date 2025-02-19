import { Card } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export function TableCardImg({
  children,
  src,
  className,
}: PropsWithChildren | { src: string; className?: string }) {
  return (
    <Card
      className={cn(
        'inline-flex w-full flex-1 items-center justify-center gap-2 p-1 text-center [&_img]:h-[30px] [&_img]:w-[60px]',
        className,
      )}
    >
      <img className={'rounded-sm object-cover'} src={src} alt="" />
      <div className={'text-min break-all font-medium'}>{children}</div>
    </Card>
  );
}
