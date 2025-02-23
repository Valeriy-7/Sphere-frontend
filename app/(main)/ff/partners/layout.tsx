'use client';
import React, { PropsWithChildren } from 'react';
import { AppTabs, AppTabsWrap } from '@/components/app-tabs';

export default function WBPartnersLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppTabsWrap>
        <AppTabs
          list={[
            { label: 'Магазины', href: '/ff/partners' },
            { label: 'ТК', href: '#', disabled: true },
          ]}
        />
      </AppTabsWrap>
      {children}
    </>
  );
}
