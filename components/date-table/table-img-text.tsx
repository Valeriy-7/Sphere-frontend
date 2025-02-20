import React, { PropsWithChildren, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
type TableImage = {
  src: string;
};
export function TableImgText({
  title,
  text,
  image,
}: PropsWithChildren & { image?: TableImage; title?: string; text?: string }) {
  return (
    <div className={'flex items-center gap-2 text-left'}>
      <img
        className={'h-[26px] w-[18px] rounded-sm border object-cover'}
        src={image?.src}
        alt={title}
      />
      <div className={'overflow-hidden'}>
        <div className={'w-full truncate'}>{title}</div>
        <div className={'w-full truncate'}>{text}</div>
      </div>
    </div>
  );
}

export function TableCardImgText({
  title,
  text,
  className,
  image,
  slotImage,
  children,
}: PropsWithChildren & {
  image?: TableImage;
  title?: string;
  text?: string;
  className?: string;
  slotImage?: ReactNode;
}) {
  return (
    <div className={'text-left'}>
      <Card
        className={cn(
          'inline-flex max-w-full flex-1 items-center justify-center gap-2 p-1 text-left',
          className,
        )}
      >
        <div className={'relative h-[30px] w-[60px]'}>
          {!slotImage && (
            <img className={'h-full w-full rounded-sm object-cover'} src={image?.src} alt={title} />
          )}
          {slotImage}
        </div>

        <div className={'min-w-[50px] overflow-hidden'}>
          <div className={'w-full truncate'}>{title}</div>
          <div className={'w-full truncate'}>{text}</div>
          {children}
        </div>
      </Card>
    </div>
  );
}
