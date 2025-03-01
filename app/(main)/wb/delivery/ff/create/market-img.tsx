import { PropsWithChildren } from 'react';
import * as React from 'react';
import { ImageOff } from 'lucide-react';

export function MarketImg({ src, alt }: PropsWithChildren<{ src: string; alt: string }>) {
  if (src === 'no-image.jpg')
    return (
      <div
        className={
          'flex h-[140px] w-[100px] flex-col items-center justify-center gap-2 rounded-lg bg-accent object-cover p-2 text-xs'
        }
      >
        <ImageOff strokeWidth={1} />
        {alt}
      </div>
    );
  return (
    <img src={src} alt={alt} className={'h-[140px] w-[100px] rounded-lg bg-accent object-cover'} />
  );
}
