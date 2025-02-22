'use client';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { AppTabs, AppTabsWrap } from '@/components/app-tabs';
import { PortalContext } from './portal-context';

export default function ServicesLayout({ children }: PropsWithChildren) {
  const portalTargetRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalContainer(portalTargetRef.current);
  }, []);

  return (
    <>
      <AppTabsWrap>
        <AppTabs
          list={[
            { label: 'Услуги', href: '/ff/services/service' },
            { label: 'Логистика', href: '/ff/services/logistics' },
            { label: 'Расходники', href: '/ff/services/consumable' },
          ]}
        />
        <div ref={portalTargetRef}></div>
      </AppTabsWrap>
      <PortalContext value={portalContainer}>{children}</PortalContext>
    </>
  );
}
