import { PropsWithChildren } from 'react';
import * as React from 'react';

export function MarketImg(props: PropsWithChildren) {
  return (
    <img
      {...props}
      className={'h-[140px] w-[100px] rounded-lg object-cover'}
      src={
        'https://vladivostok.mir-kvestov.ru/uploads/quests/2743/large/kvestkafe_kosmos_photo1.jpg?1692627455'
      }
      alt="Платье летнее"
    />
  );
}
