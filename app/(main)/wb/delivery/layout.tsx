'use client';
import React, { PropsWithChildren } from 'react';
import { AppTabs, AppTabsWrap } from '@/components/app-tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';

export default function WBDeliveryLayout({ children }: PropsWithChildren) {
  /*   console.log(segment);
    const isActiveRouteFFCreate =()=>{
        const segments = useSelectedLayoutSegments()
        return segments.join('/').includes('ff/create')
    }*/

  return <>{children}</>;
}
