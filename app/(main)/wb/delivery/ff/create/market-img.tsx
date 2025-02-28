import { PropsWithChildren } from 'react';
import * as React from 'react';

export function MarketImg(props: PropsWithChildren<{src:string, alt:string}>) {
  return (
    <img
      {...props}
      className={'h-[140px] w-[100px] rounded-lg object-cover'}
    />
  );
}
